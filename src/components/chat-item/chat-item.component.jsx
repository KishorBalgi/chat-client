import React from "react";
import "./chat-item.styles.css";
// Redux:
import { fetchChatsAsync } from "../../redux/chats/chats.actions";
import { connect } from "react-redux";
import { socket } from "../../pages/app/apppage.component";
import { _arrayBufferToBase64 } from "../../utils/encrypt_storage/imageHandlers";

const ChatItem = ({
  _id,
  name,
  img,
  photo,
  fetchChatsAsync,
  setCurrentChat,
}) => {
  function handleChatSelect(e) {
    const id = e.target.getAttribute("data-id");
    socket.emit("join-room", { id, currRoom: socket.currentRoom }, (msg) => {
      socket.currentRoom = msg;
    });
    fetchChatsAsync(id);
    document.querySelector(".app-page").scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="chat-item" onClick={handleChatSelect} data-id={_id}>
      <div className="chat-item-det" data-id={_id}>
        <img
          src={
            photo
              ? `data:image/jpeg;base64,${_arrayBufferToBase64(photo.data)}`
              : "https://i.ibb.co/d5RgxfH/user-blank.png"
          }
          alt={name}
          className="chat-item-img"
          data-id={_id}
        />
        <p className="chat-item-name" data-id={_id}>
          {name}
        </p>
      </div>

      {/* <p className="chat-item-timestamp" data-id={_id}>
        {time}
      </p> */}
      {/* {notifc === null ? null : <p className="chat-notifc">{notifc}</p>} */}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  fetchChatsAsync: (id) => dispatch(fetchChatsAsync(id)),
});

export default connect(null, mapDispatchToProps)(ChatItem);
