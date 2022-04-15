import React, { useState, useEffect, useRef } from "react";
import "./chat-receiver.styles.css";
import Linkify from "react-linkify";

export const Receiver = ({ _id, message, timestamp }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-left" data-id={_id}>
      <p className="chat-txt" data-id={_id}>
        <Linkify>{message}</Linkify>
      </p>
      <p className="chat-time" data-id={_id}>
        {timestamp}
      </p>
    </div>
  );
};
