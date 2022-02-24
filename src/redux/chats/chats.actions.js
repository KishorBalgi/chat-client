import { chatsTypes } from "./chats.types";

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

export const fetchChatsAsync = () => {
  return (dispatch) => {
    dispatch(fetchChatsStart);
    fetch(`${process.env.REACT_APP_HOST_URL}/api/v1/chats`)
      .then((res) => res.json())
      .then((data) => {
        const chats = data;
        dispatch(fetchChatsSuccess(chats));
      })
      .catch((err) => {
        dispatch(fetchChatsFailure(err));
      });
  };
};
