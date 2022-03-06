import SearchedUser from "../../components/searchedUser/searchedUser.component";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import { api } from "../user/user.actions";

const user = encryptStorage.getItem("user");

export const modifiyUserSearchRes = (users) => {
  if (users === null) return null;
  const modifiedArr = users.map((e) => <SearchedUser key={e._id} {...e} />);
  return modifiedArr;
};

export const appendChatList = (users, chatlist) => {
  let res = users.filter((u) => u._id !== user.id);
  const i = chatlist.findIndex((c) => c._id === res[0]._id);
  if (i != -1) chatlist.splice(i, 1);
  return [res[0], ...chatlist];
};

const fetchUser = async (id) => {
  try {
    const res = await api.post(
      `${process.env.REACT_APP_HOST_URL}/api/v1/user/searchUser`,
      {
        id,
      }
    );
    if (res.data.status !== "success") throw res.data;
    return res.data.user;
  } catch (err) {
    console.log(err);
  }
};
export const appendChatListOnNewMsg = (id, chatlist) => {
  let obj;
  let res = chatlist.findIndex((u) => u._id === id);
  if (res !== -1) {
    obj = chatlist[res];
    chatlist.splice(res, 1);
    return [obj, ...chatlist];
  }
  return [...chatlist];
};
