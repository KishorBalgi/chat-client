import React from "react";
import "./searchedUser.styles.css";
import { _arrayBufferToBase64 } from "../../utils/encrypt_storage/imageHandlers";
// Redux:
import { connect } from "react-redux";
import { fetchChatsAsync } from "../../redux/chats/chats.actions";
import { searchUsers } from "../../redux/chat-list/chat-list.actions";
import { socket } from "../../pages/app/apppage.component";

const SearchedUser = ({ _id, name, photo, fetchChats, searchUsers }) => {
  function handleSelectSearchedUser(e) {
    const id = e.target.getAttribute("data-id");
    socket.emit("join-room", { id, currRoom: socket.currentRoom }, (msg) => {
      socket.currentRoom = msg;
    });
    fetchChats(id);
    if (window.screen.width <= 800)
      document.querySelector(".chat-box").style.position = "absolute";
    document.getElementById("user-search-input").value = "";
    searchUsers("");
  }
  return (
    <div
      className="searched-user"
      data-id={_id}
      onClick={handleSelectSearchedUser}
    >
      <img
        src={
          photo
            ? `data:image/jpeg;base64,${_arrayBufferToBase64(photo.data)}`
            : "https://i.ibb.co/d5RgxfH/user-blank.png"
        }
        alt={name}
        data-id={_id}
      />
      <span data-id={_id}>{name}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchChats: (id) => dispatch(fetchChatsAsync(id)),
  searchUsers: (search) => dispatch(searchUsers(search)),
});
export default connect(null, mapDispatchToProps)(SearchedUser);
