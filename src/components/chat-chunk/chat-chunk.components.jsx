import React from "react";
import "./chat-chunk.styles.css";

const ChatChunk = ({ chats }) => {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div className="chat-chunk">
      <p className="chat-chunk-timestamp">
        {chats.timestamp === today ? "Today" : chats.timestamp}
      </p>
      {chats.chats}
    </div>
  );
};

export default ChatChunk;
