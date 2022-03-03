import React, { useEffect, useRef } from "react";
import "./chat-sender.styles.css";

export const Sender = ({ message, timestamp }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-right">
      <p className="chat-txt">{message}</p>
      <p className="chat-time">{timestamp}</p>
    </div>
  );
};
