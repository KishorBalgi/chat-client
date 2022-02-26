import React, { useEffect } from "react";
import "./apppage.styles.css";
import { useNavigate } from "react-router-dom";
// Components:
import { ChatBox } from "../../components/chat-box/chat-box.component";
import { ChatMenu } from "../../components/chat-menu/chat-menu.component";
import { Spinner } from "../../components/spinner/spinner.component";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsLoggedIn } from "../../redux/user/user.selector";
import { checkSavedLogin } from "../../redux/user/user.actions";

const AppPage = ({ isLoggedIn, checkSavedLogin }) => {
  let navigate = useNavigate();
  useEffect(async () => {
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
