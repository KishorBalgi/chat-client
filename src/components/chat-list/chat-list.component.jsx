import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./chat-list.styles.css";
import useChatRightClick from "../../hooks/useChatRightClick";
// Components:
import ChatItem from "../chat-item/chat-item.component";
import ChatOptions from "../chat-options/chat-options.component";
import ChatlistSkeleton from "../skeleton/chatlist-skeleton.components";
// Redux:
import { fetchChatListAsync } from "../../redux/chat-list/chat-list.actions";

import { createStructuredSelector } from "reselect";
import {
  selectChatList,
  selectErrMsg,
} from "../../redux/chat-list/chat-list.selector";

const ChatList = ({ chatlist, errMsg, fetchChatListAsync, updateChatlist }) => {
  const { x, y, showMenu } = useChatRightClick();
  useEffect(() => {
    fetchChatListAsync();
  }, []);
  return (
    <div className="chat-list">
      <ChatOptions x={x} y={y} showMenu={showMenu} />
      {chatlist === null ? (
        <ChatlistSkeleton />
      ) : (
        chatlist.map((i) => <ChatItem {...i} key={i._id} />)
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
