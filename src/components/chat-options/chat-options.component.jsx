import React from "react";
import "./chat-options.styles.css";

const ChatOptions = ({ x, y, showMenu }) => {
  const style = () => ({
    top: y,
    left: x,
    display: showMenu ? "block" : "none",
  });
  return (
    <div className="msg-op-list" style={style()}>
      <ul>
        <li>Delete Chat</li>
        {/* <li>Mute</li>
        <li>Archive</li> */}
      </ul>
    </div>
  );
};

export default ChatOptions;
