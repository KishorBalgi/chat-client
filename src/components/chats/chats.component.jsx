import React from "react";
import "./chats.styles.css";
import { connect } from "react-redux";
import useMsgRightClick from "../../hooks/useMsgRightClick";
//Components:
import { Spinner } from "../spinner/spinner.component";
import MessageOptions from "../msg-options/msg-options.component";
import ChatChunk from "../chat-chunk/chat-chunk.components";
// Redux:
import { createStructuredSelector } from "reselect";
import {
  selectIsFetchingChats,
  selectUserChats,
  selectErrMsg,
} from "../../redux/chats/chats.selector";

const Chats = ({ chats, isFetching, errMsg }) => {
  // const { x, y, showMenu, id } = useMsgRightClick();
  if (isFetching) {
    return (
      <div className="chats">
        <Spinner msg={"Fetching conversation"} />
      </div>
    );
  }
  return (
    <div className="chats">
      {/* <MessageOptions x={x} y={y} showMenu={showMenu} id={id} /> */}
      {chats.length === 0 ? (
        <p style={{ color: "#fff", fontSize: "20px", margin: "auto 0" }}>
          This is the begining of your chats!
        </p>
      ) : (
        chats.map((c) => <ChatChunk chats={c} />)
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetchingChats,
  chats: selectUserChats,
  errMsg: selectErrMsg,
});

export default connect(mapStateToProps)(Chats);
