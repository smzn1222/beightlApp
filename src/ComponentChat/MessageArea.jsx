import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Message from "./Message";
import SendText from "./SendText";

const MessageArea = (props) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: props.systemValue,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [msgValue, setMsgValue] = useState("");
  const [isCommunicating, setIsCommunicating] = useState(false);

  // API通信用設定
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // API通信
  const comToGPT = async (messages) => {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      setMessages([...messages, completion.data.choices[0].message]);
      setInputValue("");
      setMsgValue("");
      setIsCommunicating(false);
    } catch (error) {
      setMsgValue("データの取得に失敗しました。");
      setIsCommunicating(false);
      // 取得に失敗した際の最終送信を削除
      messages.splice(messages.length - 1, 1);
    }
  };

  // API通信（タイムアウト考慮）
  const comToGPTWithTimeout = async (messages) => {
    const TIMEOUT_DURATION = 120000; // タイムアウト時間を設定（ミリ秒）

    // タイムアウトを待つPromise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("タイムアウトしました。"));
      }, TIMEOUT_DURATION);
    });

    try {
      const data = await Promise.race([comToGPT(messages), timeoutPromise]);
      console.log(data);
    } catch (error) {
      // エラーメッセージを設定する
      setMsgValue(
        `通信中……　${Math.floor(
          TIMEOUT_DURATION / 1000
        )}秒以上経過しました。必要に応じて確認してください。`
      );
      console.error(error);
    }
  };

  // メッセージ送信
  const sendMessages = () => {
    // 改行を除いた文字列で未入力判断
    const inputWithoutNL = inputValue.replace(/\n/g, "");

    if (inputWithoutNL !== "") {
      var tmpMessages = messages.slice();
      tmpMessages.push({ role: "user", content: inputValue });
      // 会話履歴がsystemを除き20を超えた場合、もっとも古い往復を削除
      if (tmpMessages.length > 21) {
        tmpMessages.splice(1, 2);
      }

      setMessages(tmpMessages);
      setMsgValue("通信中……");
      setIsCommunicating(true);
      comToGPTWithTimeout(tmpMessages);
    } else {
      setInputValue("");
      setMsgValue("何かメッセージを入れてください。");
    }
  };

  // メッセージクリア
  const clearMessages = () => {
    setInputValue("");
    setMsgValue("");
  };

  // 履歴リセット
  const resetHistory = () => {
    var defaultMessage = [
      {
        role: "system",
        content: props.systemValue,
      },
    ];
    setMessages(defaultMessage);
    setInputValue("");
    setMsgValue("");
  };

  // ダークモード切替
  const switchMode = () => {
    const isDark = props.isDarkMode;
    props.setIsDarkMode(!isDark);
  };

  return (
    <div className="MessageArea">
      <label className="isdark-checkbox">
        <input
          type="checkbox"
          checked={props.isDarkMode}
          onChange={switchMode}
        />
        {"ダークモードON"}
      </label>
      <SendText
        messages={messages}
        setInputValue={setInputValue}
        inputValue={inputValue}
        msgValue={msgValue}
        onClickSend={() => {
          sendMessages();
        }}
        onClickClear={() => clearMessages()}
        onClickReset={() => resetHistory()}
        isCommunicating={isCommunicating}
      />
      <Message messages={messages} isDarkMode={props.isDarkMode} />
    </div>
  );
};

export default MessageArea;
