import React from "react";
import "./chat.styles.css";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const Chat = () => (
  <div className="chat">
    <input type="text" className="chat-input" placeholder="Type a message" />
    <button className="chat-send">
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </div>
);
