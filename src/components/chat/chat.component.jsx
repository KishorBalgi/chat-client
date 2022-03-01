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
import io from "socket.io-client";
const socket = io("http://localhost:8000", {
  auth: { token: "hkdfgkjbfgbfdjgdgfdhghdhgkjhjdfkhjfhj" },
});

const Chat = ({ appendChat }) => {
  function handleChatSubmit(e) {
    e.preventDefault();
    const msg = e.target[0].value;
    socket.emit("msg", msg);
    appendChat(msg);
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

const mapDispatchToProps = (dispatch) => ({
  appendChat: (chat) => dispatch(appendChat(chat)),
});

export default connect(null, mapDispatchToProps)(Chat);
