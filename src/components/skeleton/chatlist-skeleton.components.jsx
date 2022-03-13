import React from "react";
import "./skeleton.styles.css";

const sklItems = [];
for (let i = 0; i < 10; i++) {
  sklItems.push(
    <div className="skl-cht-lst-itm">
      <div className="skl-cht-lst-img skeleton"></div>
      <div className="skl-cht-lst-name skeleton"></div>
    </div>
  );
}
const ChatlistSkeleton = () => {
  return <div className="chat-list">{sklItems}</div>;
};

export default ChatlistSkeleton;
