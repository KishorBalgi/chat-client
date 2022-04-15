import React, { useEffect, useRef } from "react";
import Linkify from "react-linkify";
import "./chat-sender.styles.css";

export const Sender = ({ _id, message, timestamp }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div ref={divRef} className="chat-dis chat-right" data-id={_id}>
      <p className="chat-txt" data-id={_id}>
        <Linkify>{message}</Linkify>
      </p>
      <p className="chat-time" data-id={_id}>
        {timestamp}
      </p>
    </div>
  );
};
