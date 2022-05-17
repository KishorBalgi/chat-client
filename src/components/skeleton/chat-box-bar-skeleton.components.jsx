import React from "react";
import "./skeleton.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const ChatBoxBarSkeleton = () => {
  return (
    <div className="chat-box-bar">
      <div className="chat-box-bar-det">
        {window.innerWidth <= 800 ? (
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            className="chat-box-bar-back"
          />
        ) : null}
        <div className="skl-chat-box-bar-img skeleton"></div>
        <div className="skl-chat-box-bar-name skeleton"></div>
      </div>
    </div>
  );
};

export default ChatBoxBarSkeleton;
