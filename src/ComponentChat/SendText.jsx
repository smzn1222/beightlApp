import React, { useRef } from "react";

const SendText = (props) => {
  // textareaの高さの初期値
  const textareaHeight = "44px";

  const textAreaRef = useRef(null);

  // テキストエリア変化
  const handleTextareaChange = (event) => {
    props.setInputValue(event.target.value);
    // textarea の行数を計算しサイズを自動調整
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  // ボタンクリック時
  const handleButtonClick = () => {
    var textarea = document.getElementById("send-textarea");
    textarea.style.height = "44px"; // テキストエリアの高さを44pxに変更
    textAreaRef.current.focus(); // テキストエリアにフォーカスを当てる
  };

  // Ctrl+EnterまたはCommand+Enterでメソッド呼び出し
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      // Ctrl+EnterまたはCommand+Enterで送信ボタンと同様の動作
      props.onClickSend();
      handleButtonClick();
    }
  };

  return (
    <div className="SendText">
      <div className="msgText">※会話の履歴は10往復まで保存</div>
      <textarea
        id="send-textarea"
        ref={textAreaRef}
        type="text"
        value={props.inputValue}
        onChange={(e) => {
          handleTextareaChange(e);
        }}
        style={{
          height: textareaHeight,
          backgroundColor: props.isCommunicating ? "gray" : "white",
        }}
        className="txtarea-send"
        readOnly={props.isCommunicating}
        onKeyDown={handleKeyDown}
      ></textarea>
      <div>
        <button
          className="send-btn"
          onClick={() => {
            props.onClickSend();
            handleButtonClick();
          }}
          disabled={props.isCommunicating}
        >
          送信
        </button>
        <button
          className="clr-btn"
          onClick={() => {
            props.onClickClear();
            handleButtonClick();
          }}
          disabled={props.isCommunicating}
        >
          テキストクリア
        </button>
        <button
          className="reset-btn"
          onClick={() => {
            props.onClickReset();
            handleButtonClick();
          }}
          disabled={props.isCommunicating}
        >
          会話リセット
        </button>
      </div>
      <div
        className="msgText"
        style={{ color: props.isCommunicating ? "#50D060" : "red" }}
      >
        {props.msgValue !== "" ? props.msgValue : "　"}
      </div>
    </div>
  );
};

export default SendText;
