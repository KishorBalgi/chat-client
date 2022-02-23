import React, { useState } from "react";
import "./profile-bar.styles.css";
// Animations:
import { motion } from "framer-motion";
// Component:
import ProfileMenu from "../profile-menu/profile-menu.component";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserdata } from "../../redux/user/user.selector";
const ProfileBar = ({ userData, showProfile, showSettings }) => {
  const [showPMenu, setPMenu] = useState(false);
  return (
    <div className="profile-bar">
      <motion.img
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="profile-bar-img"
        src={userData.img}
        onClick={() => showProfile(true)}
      />
      <button className="chat-send">
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="btn-menu"
          onClick={() => setPMenu(!showPMenu)}
        />
        {showPMenu ? <ProfileMenu showSettings={showSettings} /> : null}
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userData: selectUserdata,
});

export default connect(mapStateToProps)(ProfileBar);
