import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./chat-list.styles.css";
// Components:
import { ChatItem } from "../chat-item/chat-item.component";
import { Spinner } from "../spinner/spinner.component";
// Redux:
import { fetchChatListAsync } from "../../redux/chat-list/chat-list.actions";

import { createStructuredSelector } from "reselect";
import {
  selectChatList,
  selectErrMsg,
} from "../../redux/chat-list/chat-list.selector";

const ChatList = ({ chatlist, errMsg, fetchChatListAsync }) => {
  useEffect(() => {
    fetchChatListAsync();
  }, [errMsg]);
  return (
    <div className="chat-list">
      {chatlist === null ? (
        <Spinner />
      ) : (
        chatlist.map((i) => <ChatItem {...i} key={i.id} />)
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  chatlist: selectChatList,
  errMsg: selectErrMsg,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChatListAsync: () => dispatch(fetchChatListAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
