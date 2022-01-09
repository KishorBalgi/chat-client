import React from "react";
import "./chat-item.styles.css";

export const ChatItem = ({ id, name, img, timestamp }) => {
  const date = new Date(timestamp * 1000);
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="chat-item">
      <div className="chat-item-det">
        <img src={img} alt="img" className="chat-item-img" />
        <p className="chat-item-name">{name}</p>
      </div>

      <p className="chat-item-timestamp">{time}</p>
      {/* {notifc === null ? null : <p className="chat-notifc">{notifc}</p>} */}
    </div>
  );
};
