import React from "react";
import "./chat-box.styles.css";
// Components:
import { ChatBar } from "../chat-box-bar/chat-box-bar.component";
import { Chat } from "../chat/chat.component";
import Chats from "../chats/chats.component";
// Data:
import current from "../../test-data/current-chat.json";
export const ChatBox = () => {
  return (
    <div className="chat-box">
      <ChatBar {...current} />
      <Chats />
      <Chat />
    </div>
  );
};
