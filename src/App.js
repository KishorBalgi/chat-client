import "./App.css";
// Components:
import { ChatMenu } from "./components/chat-menu/chat-menu.component";
import { ChatBox } from "./components/chat-box/chat-box.component";
import Sinlog from "./components/sinlog/sinlog.component";
import { motion } from "framer-motion";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsLoggedIn } from "./redux/user/user.selector";
import { checkSavedLogin } from "./redux/user/user.actions";

function App({ isLoggedIn, checkSavedLogin }) {
  if (isLoggedIn) {
    return (
      <div className="App">
        <motion.div className="alert"></motion.div>
        <ChatMenu />
        <ChatBox />
      </div>
    );
  } else {
    checkSavedLogin();
    return (
      <div className="App">
        <motion.div className="alert"></motion.div>
        <Sinlog />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectIsLoggedIn,
});
const mapDispatchToProps = (dispatch) => ({
  checkSavedLogin: () => dispatch(checkSavedLogin()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
