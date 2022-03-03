import { chatsTypes } from "./chats.types";
import { api } from "../user/user.actions";

export const fetchChatsStart = () => ({
  type: chatsTypes.FETCH_CHAT_START,
});

export const fetchChatsSuccess = (chats) => ({
  type: chatsTypes.FETCH_CHAT_SUCCESS,
  payload: chats,
});

export const fetchChatsFailure = (err) => ({
  type: chatsTypes.FETCH_CHAT_SUCCESS,
  payload: err,
});

export const appendChat = (chat) => ({
  type: chatsTypes.APPEND_CHAT,
  payload: chat,
});

export const fetchChatsAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchChatsStart);
    api
      .post(`${process.env.REACT_APP_HOST_URL}/api/v1/chats/getChatHistory`, {
        id: id,
      })
      .then((res) => {
        if (res.data.status === "success") {
          const chats = res.data.chats;
          dispatch(fetchChatsSuccess(chats));
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        dispatch(fetchChatsFailure(err.message));
      });
  };
};
