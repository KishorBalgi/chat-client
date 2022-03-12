import { Sender } from "../../components/chat-sender/chat-sender.component";
import { Receiver } from "../../components/chat-receiver/chat-receiver.component";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
const user = encryptStorage.getItem("user");

export const appendChatUtil = (chat, chats) => {
  if (chat.msg === "") return chats;
  const time = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const obj = {
    id: chat.uid ? chat.uid : user.id,
    message: chat.msg,
    timestamp: time,
  };
  const c =
    obj.id === user.id ? (
      <Sender {...obj} key={Date.now()} />
    ) : (
      <Receiver {...obj} key={Date.now()} />
    );
  return [...chats, c];
};

export const modifyChats = (chats) => {
  let ch = chats.map((c) => {
    const date = new Date(c.timestamp);
    const time = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    c.timestamp = time;
    return c.user === user.id ? (
      <Sender {...c} key={c._id} />
    ) : (
      <Receiver {...c} key={c._id} />
    );
  });
  return ch;
};

export const getCurrentChat = (users) => {
  let res = users.filter((u) => u._id !== user.id);
  return res[0];
};

export const deleteAMessage = (id, chats) => {
  const i = chats.findIndex((c) => c.key === id);
  chats.splice(i, 1);
  return [...chats];
};
