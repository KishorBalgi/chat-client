import React, { useState, useEffect, useRef } from "react";
import "./chat-receiver.styles.css";

export const Receiver = ({ _id, message, timestamp }) => {
  const divRef = useRef(null);
  useEffect(() => {
    console.log(divRef);
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-left" data-id={_id}>
      <p className="chat-txt" data-id={_id}>
        {message}
      </p>
      <p className="chat-time" data-id={_id}>
        {timestamp}
      </p>
    </div>
  );
};
