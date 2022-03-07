import { chatListTypes } from "./chat-list.types";
import store from "../store";
import { api } from "../user/user.actions";

// State from global store:

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

export const findUsersStart = () => ({
  type: chatListTypes.FIND_USERS_START,
});

export const findUsersSuccess = (result) => ({
  type: chatListTypes.FIND_USERS_SUCCESS,
  payload: result,
});

export const findUsersFailed = (err) => ({
  type: chatListTypes.FIND_USERS_FAILED,
  payload: err,
});

export const updateChatList = (users) => ({
  type: chatListTypes.UPDATE_CHAT_LIST,
  payload: users,
});

export const assignChatlist = (chatlist) => ({
  type: chatListTypes.ASSIGN_CHATLIST,
  payload: chatlist,
});

export const fetchChatListAsync = () => {
  return (dispatch) => {
    dispatch(fetchChatListStart());
    api
      .get(`${process.env.REACT_APP_HOST_URL}/api/v1/chats/getChats`)
      .then((res) => {
        if (res.data.status !== "success") throw res.data;
        const chatlist = res.data.chatlist;
        // encryptStorage.setItem("chatsID", res.data.chatsID);
        dispatch(fetchChatListSuccess(chatlist));
      })
      .catch((err) => {
        dispatch(fetchChatListFailure(err.message));
      });
  };
};

export const searchUsers = (search) => {
  return (dispatch) => {
    if (search === "") return dispatch(findUsersSuccess(null));
    dispatch(findUsersStart());
    api
      .post(`${process.env.REACT_APP_HOST_URL}/api/v1/user/searchUsers`, {
        search,
      })
      .then((res) => {
        if (res.data.status !== "success") throw res.data;
        dispatch(findUsersSuccess(res.data.users));
      })
      .catch((err) => dispatch(findUsersFailed(err.message)));
  };
};

export const updateChatListOnNewMsg = (id) => {
  return (dispatch) => {
    const state = store.getState();
    const chatlist = state.chatlist.chatlist;
    let res = chatlist.findIndex((u) => u._id === id);
    if (res !== -1) {
      const obj = chatlist[res];
      chatlist.splice(res, 1);
      dispatch(assignChatlist([obj, ...chatlist]));
    } else {
      api
        .post(`${process.env.REACT_APP_HOST_URL}/api/v1/user/searchUser`, {
          id,
        })
        .then((res) => {
          if (res.data.status === "success") {
            const obj = res.data.user;
            dispatch(assignChatlist([obj, ...chatlist]));
          }
        });
    }
  };
};
