import { chatsTypes } from "./chats.types";
import { api } from "../user/user.actions";
import { updateChatList } from "../chat-list/chat-list.actions";
import store from "../store";

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

export const setCurrentChat = (users) => ({
  type: chatsTypes.SET_CURRENT_CHAT,
  payload: users,
});

export const deleteMsg = (id) => ({
  type: chatsTypes.DELETE_MSG,
  payload: id,
});

export const fetchChatsAsync = (id) => {
  return (dispatch) => {
    dispatch(fetchChatsStart());
    api
      .post(`${process.env.REACT_APP_HOST_URL}/api/v1/chats/getChatHistory`, {
        id: id,
      })
      .then((res) => {
        if (res.data.status !== "success") throw res.data;
        const data = res.data;
        dispatch(fetchChatsSuccess(data.chats));
        dispatch(setCurrentChat(data.users));
        dispatch(updateChatList(data.users));
      })
      .catch((err) => {
        dispatch(fetchChatsFailure(err.message));
      });
  };
};

export const deleteMessageAsync = (id) => {
  return (dispatch) => {
    dispatch(deleteMsg(id));
    const ReceiverId = store.getState().chats.currentChat._id;
    api
      .delete(
        `${process.env.REACT_APP_HOST_URL}/api/v1/chats/deleteMessage/${ReceiverId}/${id}`
      )
      .then((res) => {
        if (res.data.status !== "success") throw res.data;
      })
      .catch((err) => console.log(err.message));
  };
};
