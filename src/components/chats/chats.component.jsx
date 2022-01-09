import React, { useEffect } from "react";
import "./chats.styles.css";
import { connect } from "react-redux";
//Components:
import { Sender } from "../chat-sender/chat-sender.component";
import { Receiver } from "../chat-receiver/chat-receiver.component";
import { Spinner } from "../spinner/spinner.component";
// Redux:
import { fetchChatsAsync } from "../../redux/chats/chats.actions";
import { createStructuredSelector } from "reselect";
import {
  selectIsFetchingChats,
  selectUserChats,
  selectErrMsg,
} from "../../redux/chats/chats.selector";

const my_id = 1;
const Chats = ({ chats, isFetching, errMsg, fetchChatsAsync }) => {
  useEffect(() => {
    fetchChatsAsync();
  }, [isFetching]);
  return (
    <div className="chats">
      {chats === null ? (
        <Spinner />
      ) : (
        chats.map((c) =>
          c.id === my_id ? <Sender {...c} /> : <Receiver {...c} />
        )
      )}
    </div>
  );
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
