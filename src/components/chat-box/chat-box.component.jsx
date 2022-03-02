import React from "react";
import "./chat-box.styles.css";
// Components:
import { ChatBar } from "../chat-box-bar/chat-box-bar.component";
import Chat from "../chat/chat.component";
import Chats from "../chats/chats.component";
// Data:
import current from "../../test-data/current-chat.json";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserChats } from "../../redux/chats/chats.selector";

const ChatBox = ({ chats }) => {
  return chats ? (
    <div className="chat-box">
      <ChatBar {...current} />
      <Chats />
      <Chat />
    </div>
  ) : null;
};
const mapStateToProps = createStructuredSelector({
  chats: selectUserChats,
});
export default connect(mapStateToProps)(ChatBox);
