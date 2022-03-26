import React, { useEffect, useState } from "react";
import "./chat.styles.css";
import Documents from "../documents/documents.component";
// Redux:
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { appendChat } from "../../redux/chats/chats.actions";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
// Socket:
import { socket } from "../../pages/app/apppage.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentChat } from "../../redux/chats/chats.selector";

const Chat = ({ appendChat, currentChat }) => {
  const [showDocs, setShowDocs] = useState(false);
  useEffect(() => {
    document
      .querySelector(".chats")
      .addEventListener("click", () => setShowDocs(false));
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
    <div className="chat">
      {showDocs ? <Documents /> : null}
      <div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="chat-docs"
          onClick={(e) => {
            e.preventDefault();
            setShowDocs(!showDocs);
          }}
          type="button"
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </motion.button>
      </div>
      <form className="chat-container" onSubmit={handleChatSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message" autoFocus="autoFocus"
        />
        <button type="submit" className="chat-send">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat,
});
const mapDispatchToProps = (dispatch) => ({
  appendChat: (chat) => dispatch(appendChat(chat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
