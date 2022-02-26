import React from "react";
import "./account.styles.css";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Account = ({ showSettings, showProfile, showAccount, showChgPass }) => {
  return (
    <div className="account">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="btn-profile-close"
        onClick={() => {
          showSettings(true);
          showAccount(false);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <ul className="account-options chat-menu-ul">
        <li
          onClick={() => {
            showProfile(true);
            showAccount(false);
          }}
        >
          Profile
        </li>
        <li
          onClick={() => {
            showChgPass(true);
            showAccount(false);
          }}
        >
          Update Password
        </li>
        <li>Delete account</li>
      </ul>
    </div>
  );
};

export default Account;
