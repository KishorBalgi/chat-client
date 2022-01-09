import React from "react";
import "./chat-receiver.styles.css";

export const Receiver = ({ txt, time }) => {
  return (
    <div className="chat-dis chat-left">
      <p className="chat-txt">{txt}</p>
      <p className="chat-time">{time}</p>
    </div>
  );
};
