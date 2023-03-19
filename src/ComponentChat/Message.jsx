import React from "react";
import ReactMarkdown from "react-markdown";
import _ from "lodash";

// URL置換用
const urlPattern = /https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/;
const urlRegexp = new RegExp(urlPattern, "g");

// Markdownのcomponent設定
const customComponents = {
  // カスタムの Anchor コンポーネントを定義
  // props.children にURLが含まれているので、これをリンクのテキストとして表示する
  // スタイルを変更する場合は、この Anchor コンポーネントのスタイルを指定する
  a: ({ children, ...props }) => (
    <a {...props} href={props.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

const Message = (props) => {
  const messageList = [];
  // 内容を置換するためディープコピー
  const copyMessages = _.cloneDeep(props.messages);

  copyMessages.reverse().forEach((message) => {
    if (message.role !== "system" && message.content) {
      // 重複を排除してURLをリストで抽出
      const urlList = [...new Set(message.content.match(urlRegexp))];

      // URLを<>で囲むよう置換してリンク化
      if (urlList !== null) {
        urlList.forEach((url) => {
          message.content = message.content.replace(url, ` <${url}> `);
        });
      }

      const messageText = (
        <ReactMarkdown className="line-break" components={customComponents}>
          {message.content}
        </ReactMarkdown>
      );
      messageList.push(
        <li key={message.id}>
          {message.role}
          {messageText}
        </li>
      );
    }
  });

  return (
    <div className="Message">
      <ul>{messageList}</ul>
    </div>
  );
};

export default Message;
