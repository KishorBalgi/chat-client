import React from "react";
import "./searchedUser.styles.css";
// Redux:
import { connect } from "react-redux";
import { fetchChatsAsync } from "../../redux/chats/chats.actions";
import { searchUsers } from "../../redux/chat-list/chat-list.actions";
import { socket } from "../../pages/app/apppage.component";

const SearchedUser = ({ _id, name, img, fetchChats, searchUsers }) => {
  function handleSelectSearchedUser(e) {
    const id = e.target.getAttribute("data-id");
    socket.emit("join-room", { id, currRoom: socket.currentRoom }, (msg) => {
      socket.currentRoom = msg;
    });
    fetchChats(id);
    document.getElementById("user-search-input").value = "";
    searchUsers("");
  }
  return (
    <div
      className="searched-user"
      data-id={_id}
      onClick={handleSelectSearchedUser}
    >
      <img src={img} alt={name} data-id={_id} />
      <span data-id={_id}>{name}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchChats: (id) => dispatch(fetchChatsAsync(id)),
  searchUsers: (search) => dispatch(searchUsers(search)),
});
export default connect(null, mapDispatchToProps)(SearchedUser);
