import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./settings.styles.css";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faUserAstronaut,
  faPaintRoller,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

const Settings = ({ showSettings, showAccount, showTheme }) => {
  const navigate = useNavigate();
  return (
    <div className="settings">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="btn-profile-close"
        onClick={() => showSettings(false)}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <ul className="settings-menu chat-menu-ul">
        <li
          className="btn-grad"
          onClick={() => {
            showAccount(true);
            showSettings(false);
          }}
        >
          <FontAwesomeIcon icon={faUserAstronaut} />
          Account
        </li>
        <li
          className="btn-grad"
          onClick={() => {
            showTheme(true);
            showSettings(false);
          }}
        >
          <FontAwesomeIcon icon={faPaintRoller} />
          Theme
        </li>

        <li className="btn-grad" onClick={() => navigate("/about")}>
          <FontAwesomeIcon icon={faAddressCard} />
          About
        </li>
      </ul>
    </div>
  );
};

export default Settings;
