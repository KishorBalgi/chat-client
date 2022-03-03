import { chatListTypes } from "./chat-list.types";
import { modifiyUserSearchRes } from "./chat-list.utils";

const INITIAL_STATE = {
  chatlist: null,
  errorMessage: undefined,
  findingUsers: null,
  searchResult: null,
  userSearchErr: null,
};

const chatListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatListTypes.FETCH_CHAT_LIST_START:
      return { ...state, isFetching: true };

    case chatListTypes.FETCH_CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatlist: action.payload,
      };

    case chatListTypes.FETCH_CHAT_LIST_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case chatListTypes.FIND_USERS_START:
      return {
        ...state,
        findingUsers: true,
      };
    case chatListTypes.FIND_USERS_SUCCESS:
      return {
        ...state,
        findingUsers: false,
        searchResult: modifiyUserSearchRes(action.payload),
      };
    case chatListTypes.FIND_USERS_FAILED:
      return {
        ...state,
        userSearchErr: action.payload,
      };
    default:
      return state;
  }
};
export default chatListReducer;
