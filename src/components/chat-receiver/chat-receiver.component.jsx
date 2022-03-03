import React, { useEffect, useRef } from "react";
import "./chat-receiver.styles.css";

export const Receiver = ({ message, timestamp }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-left">
      <p className="chat-txt">{message}</p>
      <p className="chat-time">{timestamp}</p>
    </div>
  );
};
