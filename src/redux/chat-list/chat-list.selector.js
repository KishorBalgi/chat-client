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

export const selectFindingUsers = createSelector(
  [selectChatlist],
  (chatlist) => chatlist.findingUsers
);

export const selectUsersSearchRes = createSelector(
  [selectChatlist],
  (chatlist) => chatlist.searchResult
);

export const selectUsersSearchErr = createSelector(
  [selectChatlist],
  (chatlist) => chatlist.userSearchErr
);
