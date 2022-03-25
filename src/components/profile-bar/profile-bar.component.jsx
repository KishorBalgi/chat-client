import React, { useState, useEffect } from "react";
import "./profile-bar.styles.css";
import { _arrayBufferToBase64 } from "../../utils/encrypt_storage/imageHandlers";
// Animations:
import { motion } from "framer-motion";
// Component:
import ProfileMenu from "../profile-menu/profile-menu.component";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";
// Redux:
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserdata } from "../../redux/user/user.selector";

const ProfileBar = ({ userData, showProfile, showSettings }) => {
  const [showPMenu, setPMenu] = useState(false);
  function handleSearchClick() {
    const searchBar = document.querySelector(".search-bar");
    const chatlist = document.querySelector(".chat-list");
    if (searchBar.style.display === "" || searchBar.style.display === "none") {
      chatlist.style.marginTop = "120px";
      searchBar.style.display = "flex";
    } else {
      chatlist.style.marginTop = "60px";
      searchBar.style.display = "none";
    }
  }

  return (
    <div className="profile-bar">
      <motion.img
        src={
          userData.photo
            ? `data:image/jpeg;base64,${_arrayBufferToBase64(
                userData.photo.data
              )}`
            : "https://i.ibb.co/d5RgxfH/user-blank.png"
        }
        alt={userData.name}
        className="profile-bar-img"
        onClick={() => showProfile(true)}
      />

      <button className="chat-send">
        <FontAwesomeIcon
          icon={faSearch}
          className="btn-menu"
          onClick={handleSearchClick}
        />
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
