import MessageArea from "./MessageArea";
import SystemValueArea from "./SystemValueArea";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [systemValue, setSystemValue] =
    useState(`あなたは訓練された大規模言語モデルです。
以下の指示に従って回答をしてください。
- サポートアシスタントのようにふるまってください。
- 指示には注意深く従ってください。
- 特に指示がない場合は日本語で回答してください。
- 回答にはマークダウンを用いてください。
`);
  const [openaiModel, setOpenaiModel] = useState("gpt-4o-mini");
  const [isEditingSystemValue, setIsEditingSystemValue] = useState(true);

  // ダークモード切替
  const switchMode = () => {
    const isDark = isDarkMode;
    setIsDarkMode(!isDark);
  };

  const darkModeStyle = {
    backgroundColor: "#1E2022",
    color: "#FFF9EE",
  };

  const lightModeStyle = {
    backgroundColor: "#FFF9EE",
    color: "black",
  };

  const mainContent = isEditingSystemValue ? (
    <SystemValueArea
      setIsEditingSystemValue={setIsEditingSystemValue}
      systemValue={systemValue}
      setSystemValue={setSystemValue}
      openaiModel={openaiModel}
      setOpenaiModel={setOpenaiModel}
    />
  ) : (
    <MessageArea
      setIsEditingSystemValue={setIsEditingSystemValue}
      systemValue={systemValue}
      openaiModel={openaiModel}
    />
  );

  return (
    <div
      style={Object.assign({}, isDarkMode ? darkModeStyle : lightModeStyle, {
        overflow: "scroll",
      })}
      className="chat"
    >
      <div className="chat-header">
        <h2 className="chat-title">BeightlGPT</h2>
        <div className="myLink">
          <Link to="/home">HOME</Link>
        </div>
      </div>
      <label className="isdark-checkbox">
        <input type="checkbox" checked={isDarkMode} onChange={switchMode} />
        {"ダークモードON"}
      </label>
      {mainContent}
    </div>
  );
};

export default Chat;
