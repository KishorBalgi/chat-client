import React, { useState, useEffect, useRef } from "react";
import "./chat-receiver.styles.css";
import Linkify from "react-linkify";
import ChatFile from "../chat-file/chat-file.component";

export const Receiver = ({ _id, message, timestamp, file, filetype }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  if (!file) {
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
  } else {
    return (
      <div ref={divRef} className="chat-dis chat-left" data-id={_id}>
        <ChatFile file={file} filetype={filetype} />
        <p className="chat-time" data-id={_id}>
          {timestamp}
        </p>
      </div>
    );
  }
};
