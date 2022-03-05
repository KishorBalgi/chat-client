import { createSelector } from "reselect";

const selectChats = (state) => state.chats;

export const selectIsFetchingChats = createSelector(
  [selectChats],
  (chats) => chats.isFetchingChats
);

export const selectUserChats = createSelector(
  [selectChats],
  (chats) => chats.chats
);

export const selectErrMsg = createSelector(
  [selectChats],
  (chats) => chats.errorMessage
);

export const selectCurrentChat = createSelector(
  [selectChats],
  (chats) => chats.currentChat
);
