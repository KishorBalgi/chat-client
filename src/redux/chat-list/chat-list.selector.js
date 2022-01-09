import { createSelector } from "reselect";

const selectChatlist = (state) => state.chatlist;

export const selectChatList = createSelector(
  [selectChatlist],
  (chatlist) => chatlist.chatlist
);

export const selectErrMsg = createSelector(
  [selectChatlist],
  (chatlist) => chatlist.errorMessage
);
