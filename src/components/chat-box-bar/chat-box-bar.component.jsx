import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentChat } from "../../redux/chats/chats.selector";
import "./chat-box-bar.styles.css";
import { socket } from "../../pages/app/apppage.component";

const ChatBar = ({ currentChat }) => {
  useEffect(() => {
    const online = document.querySelector(".user-online");
    socket.emit("isOnline", currentChat._id, (isOnline) => {
      console.log(isOnline);
      if (isOnline) {
        online.style.backgroundColor = "var(--clr-online)";
      }
    });
    socket.on("offline", (id) => {
      if (currentChat._id === id) {
        online.style.backgroundColor = "var(--clr-primary-highlight)";
      }
    });
    socket.on("online", (id) => {
      if (currentChat._id === id) {
        online.style.backgroundColor = "var(--clr-online)";
      }
    });
  }, [currentChat]);

  return currentChat ? (
    <div className="chat-box-bar">
      <div className="chat-box-bar-det">
        <img
          src={currentChat.img}
          alt={currentChat.name}
          className="chat-box-bar-img"
        />
        <p className="chat-box-bar-name">{currentChat.name}</p>
        <div className="user-online"></div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat,
});
export default connect(mapStateToProps)(ChatBar);
