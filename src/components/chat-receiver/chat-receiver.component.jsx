import React, { useEffect, useRef } from "react";
import "./chat-receiver.styles.css";

export const Receiver = ({ txt, time }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-left">
      <p className="chat-txt">{txt}</p>
      <p className="chat-time">{time}</p>
    </div>
  );
};
