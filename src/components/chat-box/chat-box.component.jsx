import React, { useState } from "react";
import "./chat-box.styles.css";
// Components:
import ChatBar from "../chat-box-bar/chat-box-bar.component";
import Chat from "../chat/chat.component";
import Chats from "../chats/chats.component";
import FilePreview from "../file-preview/file-preview.component";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsFetchingChats,
  selectUserChats,
} from "../../redux/chats/chats.selector";
import { selectCurrentChat } from "../../redux/chats/chats.selector";

const ChatBox = ({
  chats,
  currentChat,
  showFilePreview,
  setShowFilePreview,
  isFetching,
}) => {
  return isFetching || (chats && currentChat) ? (
    <div className="chat-box">
      <ChatBar />
      <Chats />
      <Chat showFilePreview={setShowFilePreview} />
      {showFilePreview ? (
        <FilePreview showFilePreview={setShowFilePreview} />
      ) : null}
    </div>
  ) : (
    <div className="chat-box">
      <p
        style={{
          color: "var(--clr-font)",
          fontSize: "20px",
          margin: "auto 0",
        }}
      >
        Select a chat to start a conversation
      </p>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  chats: selectUserChats,
  currentChat: selectCurrentChat,
  isFetching: selectIsFetchingChats,
});
export default connect(mapStateToProps)(ChatBox);
