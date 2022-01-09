import { chatListTypes } from "./chat-list.types";
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
    fetch("https://chat-box-app-server.herokuapp.com/api/v1/chatlist")
      .then((res) => res.json())
      .then((data) => {
        const chatlist = data;
        dispatch(fetchChatListSuccess(chatlist.today));
      })
      .catch((err) => {
        dispatch(fetchChatListFailure(err));
      });
  };
};
