import SearchedUser from "../../components/searchedUser/searchedUser.component";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";

const user = encryptStorage.getItem("user");

export const modifiyUserSearchRes = (users) => {
  if (users === null) return null;
  const modifiedArr = users.map((e) => <SearchedUser key={e._id} {...e} />);
  return modifiedArr;
};

export const appendChatList = (users, chatlist) => {
  let res = users.filter((u) => u._id !== user.id);
  const i = chatlist.findIndex((c) => c._id === res[0]._id);
  if (i !== -1) chatlist.splice(i, 1);
  return [res[0], ...chatlist];
};
