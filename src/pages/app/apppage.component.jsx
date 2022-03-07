import React, { useEffect } from "react";
import "./apppage.styles.css";
import { useNavigate } from "react-router-dom";
// Components:
import ChatBox from "../../components/chat-box/chat-box.component";
import ChatMenu from "../../components/chat-menu/chat-menu.component";
import { Spinner } from "../../components/spinner/spinner.component";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsLoggedIn } from "../../redux/user/user.selector";
import { checkSavedLogin } from "../../redux/user/user.actions";
// Socket:
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import io from "socket.io-client";
const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://chat-box-app-server.herokuapp.com"
    : "http://localhost:8000";
export const socket = io(socketURL, {
  auth: { token: encryptStorage.getItem("jwt") },
});
socket.on("connect_error", (err) => {
  console.log(err);
});
const AppPage = ({ isLoggedIn, checkSavedLogin }) => {
  let navigate = useNavigate();
  useEffect(async () => {
    if (!isLoggedIn)
      if (!(await checkSavedLogin())) {
        navigate("/");
      }
  });

  if (isLoggedIn) {
    return (
      <div className="app-page">
        <ChatMenu />
        <ChatBox />
      </div>
    );
  } else {
    return (
      <div
        className="home
        "
      >
        <Spinner msg="loading..." />
      </div>
    );
  }
};
const mapDispatchToProps = (dispatch) => ({
  checkSavedLogin: () => dispatch(checkSavedLogin()),
});
const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectIsLoggedIn,
});
export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
