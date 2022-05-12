import React, { useEffect } from "react";
import "./document.styles.css";
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFileAlt,
  faVideo,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const Documents = ({ showFilePreview }) => {
  function resetForm(id) {
    const imgInp = document.getElementById("chatImgInp");
    const vidInp = document.getElementById("chatVidInp");
    const audInp = document.getElementById("chatAudInp");
    const fileInp = document.getElementById("chatFileInp");
    imgInp.value = vidInp.value = audInp.value = fileInp.value = null;

    switch (id) {
      case "chatImgInp":
        imgInp.click();
        break;
      case "chatVidInp":
        vidInp.click();
        break;
      case "chatAudInp":
        audInp.click();
        break;
      case "chatFileInp":
        fileInp.click();
        break;
    }
  }
  function showPreview(e) {
    showFilePreview(true);
    sessionStorage.setItem("preview", URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="docs">
      <input
        type="file"
        accept="image/*"
        id="chatImgInp"
        className="hidden"
        onChange={(e) => showPreview(e)}
      />
      <input
        type="file"
        accept="video/*"
        id="chatVidInp"
        className="hidden"
        onChange={(e) => showPreview(e)}
      />
      <input
        type="file"
        accept="audio/*"
        id="chatAudInp"
        className="hidden"
        onChange={(e) => showPreview(e)}
      />
      <input
        type="file"
        accept="*"
        id="chatFileInp"
        className="hidden"
        onChange={(e) => showPreview(e)}
      />
      <ul className="docs-btns">
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="chat-docs btn-docs"
            onClick={() => resetForm("chatImgInp")}
          >
            <FontAwesomeIcon icon={faImages} />
          </motion.button>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="chat-docs btn-docs"
            onClick={() => resetForm("chatVidInp")}
          >
            <FontAwesomeIcon icon={faVideo} />
          </motion.button>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="chat-docs btn-docs"
            onClick={() => resetForm("chatAudInp")}
          >
            <FontAwesomeIcon icon={faMusic} />
          </motion.button>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="chat-docs btn-docs"
            onClick={() => resetForm("chatFileInp")}
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </motion.button>
        </li>
      </ul>
    </div>
  );
};

export default Documents;
