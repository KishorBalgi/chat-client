import React, { useEffect, useRef } from "react";
import "./chat-sender.styles.css";

export const Sender = ({ txt, time }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-right">
      <p className="chat-txt">{txt}</p>
      <p className="chat-time">{time}</p>
    </div>
  );
};
