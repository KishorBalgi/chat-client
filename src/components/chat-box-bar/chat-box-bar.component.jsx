import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentChat } from "../../redux/chats/chats.selector";
import "./chat-box-bar.styles.css";

const ChatBar = ({ currentChat }) => {
  return currentChat ? (
    <div className="chat-box-bar">
      <div className="chat-box-bar-det">
        <img
          src={currentChat.img}
          alt={currentChat.name}
          className="chat-box-bar-img"
        />
        <p className="chat-box-bar-name">{currentChat.name}</p>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat,
});
export default connect(mapStateToProps)(ChatBar);
