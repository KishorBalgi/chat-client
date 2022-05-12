import { Sender } from "../../components/chat-sender/chat-sender.component";
import { Receiver } from "../../components/chat-receiver/chat-receiver.component";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import { socket } from "../../pages/app/apppage.component";
const user = encryptStorage.getItem("user");

export const appendChatUtil = (chat, chats) => {
  console.log(chat);
  const today = new Date().toLocaleDateString("en-IN");
  const time = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const obj = {
    id: chat.uid ? chat.uid : user.id,
    message: chat.msg ? chat.msg : null,
    file: chat.file ? chat.file : null,
    filetype: chat.filetype ? chat.filetype : null,
    timestamp: time,
  };
  const c =
    obj.id === user.id ? (
      <Sender {...obj} key={Date.now()} />
    ) : (
      <Receiver {...obj} key={Date.now()} />
    );

  if (chats.length === 0 || chats.at(-1).timestamp !== today) {
    const chatToday = { _id: "newchattoday", chats: [c], timestamp: today };
    return [...chats, chatToday];
  } else {
    chats.at(-1).chats = [...chats.at(-1).chats, c];
    return [...chats];
  }
};

export const modifyChats = (chats) => {
  let ch = chats.map((c) => {
    c.chats = c.chats.map((e) => {
      const date = new Date(e.timestamp);
      const time = date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      e.timestamp = time;
      // e.message = linkify(e.message);
      return e.user === user.id ? (
        <Sender {...e} key={e._id} />
      ) : (
        <Receiver {...e} key={e._id} />
      );
    });
    return c;
  });
  return ch;
};

export const getCurrentChat = (users) => {
  let res = users.filter((u) => u._id !== user.id);
  return res[0];
};

export const deleteAMessage = (id, chats) => {
  chats = chats.map((c) => {
    const i = c.chats.findIndex((c) => c.key === id);
    if (i !== -1) c.chats.splice(i, 1);
    return c;
  });
  return [...chats];
};

export const sendFile = (file, id, room) => {
  const data = { file: file.file, filetype: file.filetype };
  socket.emit("send-message", data, room, id);
};
