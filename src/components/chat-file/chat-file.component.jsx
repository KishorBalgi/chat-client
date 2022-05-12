import React from "react";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { downloadFile } from "../../redux/chats/chats.actions";

const ChatFile = ({ file, filetype, downloadFile }) => {
  return (
    <div className="file-view">
      <a href={`${process.env.REACT_APP_HOST_URL}/api/v1/chats/file/${file}`}>
        <FontAwesomeIcon
          className="btn-file-download"
          data-file={file}
          icon={faDownload}
          // onClick={() => downloadFile(file)}
        ></FontAwesomeIcon>
      </a>
      <p className="chat-txt">{filetype.replace("/", "-")}</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  downloadFile: (filename) => dispatch(downloadFile(filename)),
});

export default connect(null, mapDispatchToProps)(ChatFile);
