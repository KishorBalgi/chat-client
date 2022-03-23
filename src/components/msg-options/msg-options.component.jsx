import React from "react";
import { connect } from "react-redux";
import { deleteMessageAsync } from "../../redux/chats/chats.actions";
import "./msg-options.styles.css";

const MessageOptions = ({ x, y, showMenu, id, deleteMsg }) => {
  function handleDeleteMsg() {
    deleteMsg(id);
  }
  const style = () => ({
    top: y,
    left: x,
    display: showMenu ? "block" : "none",
  });
  return (
    <div className="msg-op-list" style={style()}>
      <ul>
        <li onClick={handleDeleteMsg}>Delete message</li>
        {/* <li>Reply</li>
        <li>Copy link</li> */}
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  deleteMsg: (id) => dispatch(deleteMessageAsync(id)),
});
export default connect(null, mapDispatchToProps)(MessageOptions);
