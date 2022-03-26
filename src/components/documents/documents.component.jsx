import React from "react";
import "./document.styles.css";
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faFileAlt } from "@fortawesome/free-solid-svg-icons";

const Documents = () => {
  return (
    <div className="docs">
      <input type="file" accept="image/*" id="chatImgInp" className="hidden" />
      <input type="file" accept="image/*" id="chatFileInp" className="hidden" />
      <ul className="docs-btns">
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="chat-docs btn-docs"
            onClick={() => document.getElementById("chatImgInp").click()}
          >
            <FontAwesomeIcon icon={faImages} />
          </motion.button>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="chat-docs btn-docs"
            onClick={() => document.getElementById("chatFileInp").click()}
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </motion.button>
        </li>
      </ul>
    </div>
  );
};

export default Documents;
