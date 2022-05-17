import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentChat,
  selectIsFetchingChats,
} from "../../redux/chats/chats.selector";
import "./chat-box-bar.styles.css";
import { socket } from "../../pages/app/apppage.component";
import { _arrayBufferToBase64 } from "../../utils/encrypt_storage/imageHandlers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import ChatBoxBarSkeleton from "../skeleton/chat-box-bar-skeleton.components";

const ChatBar = ({ currentChat, isFetching }) => {
  useEffect(() => {
    const online = document.querySelector(".user-online");
    function setOnline() {
      online.style.backgroundColor = "var(--clr-online)";
    }
    function setOffline() {
      online.style.backgroundColor = "var(--clr-primary-highlight)";
    }
    if (currentChat) {
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
    }
  }, [currentChat]);
  function handleChatBack() {
    document.querySelector(".chat-box").style.position = "relative";
  }
  if (isFetching) {
    return <ChatBoxBarSkeleton />;
  }
  return currentChat ? (
    <div className="chat-box-bar">
      <div className="chat-box-bar-det">
        {window.innerWidth <= 800 ? (
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            className="chat-box-bar-back"
            onClick={() => handleChatBack()}
          />
        ) : null}

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
  isFetching: selectIsFetchingChats,
});
export default connect(mapStateToProps)(ChatBar);
