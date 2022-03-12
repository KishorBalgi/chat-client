import React, { useEffect } from "react";
import "./chats.styles.css";
import { connect } from "react-redux";
import useMsgRightClick from "../../hooks/useMsgRightClick";
//Components:
import { Spinner } from "../spinner/spinner.component";
import MessageOptions from "../msg-options/msg-options.component";
// Redux:
import { createStructuredSelector } from "reselect";
import {
  selectIsFetchingChats,
  selectUserChats,
  selectErrMsg,
} from "../../redux/chats/chats.selector";

const Chats = ({ chats, isFetching, errMsg }) => {
  const { x, y, showMenu, id } = useMsgRightClick();
  return (
    <div className="chats">
      <MessageOptions x={x} y={y} showMenu={showMenu} id={id} />
      {chats === null || isFetching ? <Spinner /> : chats}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetchingChats,
  chats: selectUserChats,
  errMsg: selectErrMsg,
});

export default connect(mapStateToProps)(Chats);
