import React from "react";
import "./chat-sender.styles.css";

export const Sender = ({ txt, time }) => {
  return (
    <div className="chat-dis chat-right">
      <p className="chat-txt">{txt}</p>
      <p className="chat-time">{time}</p>
    </div>
  );
};
