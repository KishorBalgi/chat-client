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

const Chats = ({ chats, isFetching, errMsg }) => {
  return <div className="chats">{chats === null ? <Spinner /> : chats}</div>;
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetchingChats,
  chats: selectUserChats,
  errMsg: selectErrMsg,
});

export default connect(mapStateToProps)(Chats);
