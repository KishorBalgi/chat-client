import React, { useEffect, useState } from "react";
import "./chat.styles.css";
import { Sender } from "../chat-sender/chat-sender.component";
// Redux:
import { connect } from "react-redux";
import { appendChat } from "../../redux/chats/chats.actions";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// Socket:
import { socket } from "../../pages/app/apppage.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentChat } from "../../redux/chats/chats.selector";

const Chat = ({ appendChat, currentChat }) => {
  useEffect(() => {
    socket.on("receive-message", (msg, uid) => {
      appendChat({ msg, uid });
    });
  });
  function handleChatSubmit(e) {
    e.preventDefault();
    const msg = e.target[0].value;
    if (msg === "") return;
    socket.emit("send-message", msg, socket.currentRoom, currentChat._id);
    appendChat({ msg });
    e.target[0].value = "";
  }
  return (
    <form className="chat" onSubmit={handleChatSubmit}>
      <input type="text" className="chat-input" placeholder="Type a message" />
      <button type="submit" className="chat-send">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
};
const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat,
});
const mapDispatchToProps = (dispatch) => ({
  appendChat: (chat) => dispatch(appendChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
