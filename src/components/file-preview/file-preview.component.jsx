import React, { useEffect } from "react";
import "./file-preview.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUploading,
  selectUploadSuccess,
  selectUploadFailed,
  selectCurrentChat,
} from "../../redux/chats/chats.selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
// Animations:
import { motion } from "framer-motion";
import { resetUpload, uploadFile } from "../../redux/chats/chats.actions";
import { Spinner } from "../spinner/spinner.component";
import { socket } from "../../pages/app/apppage.component";

const FilePreview = ({
  showFilePreview,
  uploadFile,
  uploading,
  uploadFailed,
  uploadSuccess,
  resetUpload,
  currentChat,
}) => {
  useEffect(() => {
    const file = sessionStorage.getItem("preview");
    const pre = document.getElementById("preview-img");
    pre.src = file;
    pre.onload = function () {
      URL.revokeObjectURL(pre.src);
    };
  }, []);
  function handleUploadSuccess() {
    showFilePreview(false);
    resetUpload();
  }
  return (
    <div className="file-preview">
      <h3>Preview</h3>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="btn-preview-close"
        onClick={() => showFilePreview(false)}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      {uploadSuccess ? handleUploadSuccess() : null}
      <div className="file-pre-img">
        {uploading ? (
          <div className="file-upload-spinner">
            <Spinner msg="sending" />
          </div>
        ) : null}
        <img
          src=""
          className={uploading ? "img-blur" : ""}
          id="preview-img"
          alt="No preview"
        />
      </div>
      {!uploading ? (
        <button
          className="chat-send file-send"
          onClick={() => uploadFile(currentChat._id, socket.currentRoom)}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (id, room) => dispatch(uploadFile(id, room)),
  resetUpload: () => dispatch(resetUpload()),
});

const mapStateToProps = createStructuredSelector({
  uploading: selectUploading,
  uploadSuccess: selectUploadSuccess,
  uploadFailed: selectUploadFailed,
  currentChat: selectCurrentChat,
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePreview);
