import FileSaver from "file-saver";
import { chatsTypes } from "./chats.types";
import { api } from "../user/user.actions";
import { updateChatList } from "../chat-list/chat-list.actions";
import store from "../store";
import { sendFile } from "./chats.utils";

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

export const uploadingFile = () => ({
  type: chatsTypes.UPLOADING_FILE,
});

export const uploadingFileSuccess = () => ({
  type: chatsTypes.UPLOADING_FILE_SUCCESS,
});

export const uploadingFileFailed = () => ({
  type: chatsTypes.UPLOADING_FILE_FAILED,
});

export const resetUpload = () => ({
  type: chatsTypes.RESET_UPLOAD,
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

export const uploadFile = (id, room) => {
  return (dispatch) => {
    console.log(id);
    console.log(room);
    dispatch(uploadingFile());
    const imgInp = document.getElementById("chatImgInp");
    const vidInp = document.getElementById("chatVidInp");
    const audInp = document.getElementById("chatAudInp");
    const fileInp = document.getElementById("chatFileInp");

    const form = new FormData();
    if (imgInp.files[0]) {
      form.append("file", imgInp.files[0]);
    } else if (vidInp.files[0]) {
      form.append("file", vidInp.files[0]);
    } else if (audInp.files[0]) {
      form.append("file", audInp.files[0]);
    } else if (fileInp.files[0]) {
      form.append("file", fileInp.files[0]);
    } else {
      return;
    }
    api
      .post("/api/v1/chats/uploadFile", form)
      .then((res) => {
        if (res.data.status !== "success") throw res.data;
        const data = res.data;
        dispatch(uploadingFileSuccess());
        const file = { file: data.filename, filetype: data.filetype };
        dispatch(appendChat(file));
        sendFile(file, id, room);
      })
      .catch((err) => {
        dispatch(uploadingFileFailed());
        console.log(err);
      });
  };
};

export const downloadFile = (filename) => {
  return (dispatch) => {
    console.log(filename);
    api.get(`/api/v1/chats/file/${filename}`).then((res) => {
      console.log(res.data);
      FileSaver.saveAs(res.data, "sparta_sample_pack.zip");
    });
  };
};
