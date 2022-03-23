import React from "react";
import "./theme.styles.css";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
// Redux:
import { connect } from "react-redux";
import { setTheme } from "../../redux/user/user.actions";

const Theme = ({ showSettings, showTheme, setTheme }) => {
  return (
    <div className="theme">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="btn-profile-close"
        onClick={() => {
          showTheme(false);
          showSettings(true);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <ul className="theme-menu chat-menu-ul">
        <li className="btn-grad" onClick={() => setTheme("light")}>
          <FontAwesomeIcon icon={faSun} />
          Light
        </li>
        <li className="btn-grad" onClick={() => setTheme("dark")}>
          <FontAwesomeIcon icon={faMoon} />
          Dark
        </li>
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(setTheme(theme)),
});
export default connect(null, mapDispatchToProps)(Theme);
