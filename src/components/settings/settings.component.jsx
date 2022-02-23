import React, { useState } from "react";
import "./settings.styles.css";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";

const Settings = ({ showSettings, showAccount }) => {
  return (
    <div className="settings">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="btn-profile-close"
        onClick={() => showSettings(false)}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <ul className="settings-menu chat-menu-ul">
        <li
          onClick={() => {
            showAccount(true);
            showSettings(false);
          }}
        >
          <FontAwesomeIcon icon={faUserAstronaut} />
          Account
        </li>
        <li>Theme</li>
        <li>About</li>
      </ul>
    </div>
  );
};

export default Settings;
