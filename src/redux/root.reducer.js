import { combineReducers } from "redux";
// Reducers:
import chatListReducer from "./chat-list/chat-list.reducer";
import chatsReducer from "./chats/chats.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  chatlist: chatListReducer,
  chats: chatsReducer,
  user: userReducer,
});

export default rootReducer;
