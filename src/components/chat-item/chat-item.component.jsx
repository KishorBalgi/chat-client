import React from "react";
import "./chat-item.styles.css";
// Redux:
import { fetchChatsAsync } from "../../redux/chats/chats.actions";
import { connect } from "react-redux";
import { socket } from "../../pages/app/apppage.component";

const ChatItem = ({ _id, name, img, fetchChatsAsync, setCurrentChat }) => {
  function handleChatSelect(e) {
    const id = e.target.getAttribute("data-id");
    socket.emit("join-room", id, (msg) => {
      socket.currentRoom = msg;
    });
    fetchChatsAsync(id);
  }
  return (
    <div className="chat-item" onClick={handleChatSelect} data-id={_id}>
      <div className="chat-item-det" data-id={_id}>
        <img src={img} alt="img" className="chat-item-img" data-id={_id} />
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
