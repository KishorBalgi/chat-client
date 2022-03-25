import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentChat } from "../../redux/chats/chats.selector";
import "./chat-box-bar.styles.css";
import { socket } from "../../pages/app/apppage.component";
import { _arrayBufferToBase64 } from "../../utils/encrypt_storage/imageHandlers";

const ChatBar = ({ currentChat }) => {
  useEffect(() => {
    const online = document.querySelector(".user-online");
    function setOnline() {
      online.style.backgroundColor = "var(--clr-online)";
    }
    function setOffline() {
      online.style.backgroundColor = "var(--clr-primary-highlight)";
    }
    socket.emit("isOnline", currentChat._id, (isOnline) => {
      if (isOnline) setOnline();
      else setOffline();
    });
    socket.on("offline", (id) => {
      if (currentChat._id === id) setOffline();
    });
    socket.on("online", (id) => {
      if (currentChat._id === id) setOnline();
    });
  }, [currentChat]);

  return currentChat ? (
    <div className="chat-box-bar">
      <div className="chat-box-bar-det">
        <img
          src={
            currentChat.photo
              ? `data:image/jpeg;base64,${_arrayBufferToBase64(
                  currentChat.photo.data
                )}`
              : "https://i.ibb.co/d5RgxfH/user-blank.png"
          }
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
