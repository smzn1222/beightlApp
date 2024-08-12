import React, { useRef, useEffect } from "react";

const SystemValueArea = (props) => {
  // textareaの高さの初期値
  const textareaHeight = "150px";

  const textAreaRef = useRef(null);

  // テキストエリア変化
  const handleTextareaChange = (event) => {
    props.setSystemValue(event.target.value);
    // textarea の行数を計算しサイズを自動調整
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  // セレクトボックス変化
  const handleSelectChange = (event) => {
    props.setOpenaiModel(event.target.value);
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
      // Ctrl+EnterまたはCommand+Enterで送信ボタンと同様の動作
      onClickStart();
    }
  };

  const onClickStart = () => {
    props.setIsEditingSystemValue(false);
  };

  // 初期描画時にテキストエリアにフォーカスを当てる
  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <div className="SystemValue">
      <div className="msgText">システムプロンプト</div>
      <select
        value={props.openaiModel}
        onChange={(e) => {
          handleSelectChange(e);
        }}
        className="select-system-value"
      >
        <option value="gpt-4o-mini">gpt-4o-mini</option>
        <option value="gpt-4o">gpt-4o</option>
      </select>
      <textarea
        id="send-textarea"
        ref={textAreaRef}
        type="text"
        value={props.systemValue}
        onChange={(e) => {
          handleTextareaChange(e);
        }}
        style={{
          height: textareaHeight,
        }}
        className="txtarea-send"
        onKeyDown={handleKeyDown}
      ></textarea>
      <div>
        <button
          className="start-btn"
          onClick={() => {
            onClickStart();
          }}
        >
          チャットスタート
        </button>
      </div>
    </div>
  );
};

export default SystemValueArea;
