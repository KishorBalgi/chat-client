import React, { useEffect } from "react";
import "./chats.styles.css";
import { connect } from "react-redux";
//Components:
import { Spinner } from "../spinner/spinner.component";
// Redux:
import { fetchChatsAsync } from "../../redux/chats/chats.actions";
import { createStructuredSelector } from "reselect";
import {
  selectIsFetchingChats,
  selectUserChats,
  selectErrMsg,
} from "../../redux/chats/chats.selector";

const Chats = ({ chats, isFetching, errMsg, fetchChatsAsync }) => {
  useEffect(() => {
    fetchChatsAsync();
  }, [isFetching]);
  return <div className="chats">{chats === null ? <Spinner /> : chats}</div>;
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetchingChats,
  chats: selectUserChats,
  errMsg: selectErrMsg,
});

const mapDispatchToProps = (dispatch) => ({
  fetchChatsAsync: () => dispatch(fetchChatsAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chats);
