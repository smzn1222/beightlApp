import MessageArea from "./MessageArea";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [systemValue, setSystemValue] = useState(
    "サポートアシスタントのように振る舞ってください。基本的に日本語で返答してください。"
  );

  const darkModeStyle = {
    backgroundColor: "#1E2022",
    color: "#FFF9EE",
  };

  const lightModeStyle = {
    backgroundColor: "#FFF9EE",
    color: "black",
  };

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
          <Link to="/Home">Homeへ戻る</Link>
        </div>
      </div>

      <MessageArea
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        systemValue={systemValue}
      />
    </div>
  );
};

export default Chat;
