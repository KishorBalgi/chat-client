import { Sender } from "../../components/chat-sender/chat-sender.component";
import { Receiver } from "../../components/chat-receiver/chat-receiver.component";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
const user = encryptStorage.getItem("user");

export const appendChatUtil = (chat, chats) => {
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
  let ch = chats.map((c) =>
    c.user === user.id ? (
      <Sender {...c} key={c._id} />
    ) : (
      <Receiver {...c} key={c._id} />
    )
  );
  return ch;
};
