import React from "react";
import "./chat-box-bar.styles.css";

export const ChatBar = ({ name, img }) => {
  return (
    <div className="chat-box-bar">
      <div className="chat-box-bar-det">
        <img src={img} alt="img" className="chat-box-bar-img" />
        <p className="chat-box-bar-name">{name}</p>
      </div>
    </div>
  );
};
