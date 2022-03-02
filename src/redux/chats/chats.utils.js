import { Sender } from "../../components/chat-sender/chat-sender.component";
import { Receiver } from "../../components/chat-receiver/chat-receiver.component";
import store from "../store";

export const appendChatUtil = (chat, chats) => {
  const obj = {
    id: 1,
    txt: chat,
    time: "8.13",
  };
  const c = obj.id === 1 ? <Sender {...obj} /> : <Receiver {...obj} />;
  return [...chats, c];
};

export const modifyChats = (chats) => {
  let ch = chats.map((c) =>
    c.id === 1 ? <Sender {...c} /> : <Receiver {...c} />
  );
  return ch;
};
