import React from "react";
import "./chat-box.styles.css";
// Components:
import ChatBar from "../chat-box-bar/chat-box-bar.component";
import Chat from "../chat/chat.component";
import Chats from "../chats/chats.component";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserChats } from "../../redux/chats/chats.selector";
import { selectCurrentChat } from "../../redux/chats/chats.selector";

const ChatBox = ({ chats, currentChat }) => {
  return chats && currentChat ? (
    <div className="chat-box">
      <ChatBar />
      <Chats />
      <Chat />
    </div>
  ) : (
    <div className="chat-box">
      <p style={{ color: "#fff", fontSize: "20px", margin: "auto 0" }}>
        Select a chat to start a conversation
      </p>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  chats: selectUserChats,
  currentChat: selectCurrentChat,
});
export default connect(mapStateToProps)(ChatBox);
