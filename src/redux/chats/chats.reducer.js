import { chatsTypes } from "./chats.types";
import { appendChatUtil, modifyChats } from "./chats.utils";
import { getCurrentChat, deleteAMessage } from "./chats.utils";

const INITIAL_STATE = {
  chats: null,
  currentChat: null,
  isFetchingChats: false,
  errorMessage: undefined,
};

const chatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatsTypes.FETCH_CHAT_START:
      return {
        ...state,
        isFetchingChats: true,
      };
    case chatsTypes.FETCH_CHAT_SUCCESS:
      return {
        ...state,
        isFetchingChats: false,
        chats: modifyChats(action.payload),
      };
    case chatsTypes.FETCH_CHAT_FAILUER:
      return {
        ...state,
        isFetchingChats: false,
        errorMessage: action.payload,
      };
    case chatsTypes.APPEND_CHAT:
      return {
        ...state,
        chats: appendChatUtil(action.payload, state.chats),
      };
    case chatsTypes.SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: getCurrentChat(action.payload),
      };
    case chatsTypes.DELETE_MSG:
      return {
        ...state,
        chats: deleteAMessage(action.payload, state.chats),
      };
    default:
      return {
        ...state,
      };
  }
};

export default chatsReducer;
