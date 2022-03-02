import { chatListTypes } from "./chat-list.types";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";

export const fetchChatListStart = () => ({
  type: chatListTypes.FETCH_CHAT_LIST_START,
});

export const fetchChatListSuccess = (chatlist) => ({
  type: chatListTypes.FETCH_CHAT_LIST_SUCCESS,
  payload: chatlist,
});

export const fetchChatListFailure = (err) => ({
  type: chatListTypes.FETCH_CHAT_LIST_FAILURE,
  payload: err,
});

export const fetchChatListAsync = () => {
  return (dispatch) => {
    dispatch(fetchChatListStart);
    fetch(`${process.env.REACT_APP_HOST_URL}/api/v1/chats/getChats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const chatlist = data.chatlist;
        encryptStorage.setItem("chatsID", data.chatsID);
        dispatch(fetchChatListSuccess(chatlist));
      })
      .catch((err) => {
        dispatch(fetchChatListFailure(err));
      });
  };
};
