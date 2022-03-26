import React from "react";
import "./account.styles.css";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faIdBadge,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Account = ({
  showSettings,
  showProfile,
  showAccount,
  showChgPass,
  showDelAcc,
}) => {
  return (
    <div className="account">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
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
          className="btn-grad"
          onClick={() => {
            showProfile(true);
            showAccount(false);
          }}
        >
          <FontAwesomeIcon icon={faIdBadge} />
          Profile
        </li>
        <li
          className="btn-grad"
          onClick={() => {
            showChgPass(true);
            showAccount(false);
          }}
        >
          <FontAwesomeIcon icon={faPen} />
          Update Password
        </li>
        <li
          className="btn-grad"
          onClick={() => {
            showDelAcc(true);
            showAccount(false);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete account
        </li>
      </ul>
    </div>
  );
};

export default Account;
