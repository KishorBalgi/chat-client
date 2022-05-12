import React, { useEffect, useRef } from "react";
import Linkify from "react-linkify";
import "./chat-sender.styles.css";
import ChatFile from "../chat-file/chat-file.component";

export const Sender = ({ _id, message, timestamp, file, filetype }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  if (!file) {
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
  } else {
    return (
      <div ref={divRef} className="chat-dis chat-right" data-id={_id}>
        <ChatFile file={file} filetype={filetype} />
        <p className="chat-time" data-id={_id}>
          {timestamp}
        </p>
      </div>
    );
  }
};
