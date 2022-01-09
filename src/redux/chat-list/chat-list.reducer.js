import { chatListTypes } from "./chat-list.types";

const INITIAL_STATE = {
  chatlist: null,
  errorMessage: undefined,
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
    default:
      return state;
  }
};
export default chatListReducer;
