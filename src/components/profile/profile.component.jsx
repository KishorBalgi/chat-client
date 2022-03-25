import React, { useState } from "react";
import "./profile.styles.css";
import {
  _arrayBufferToBase64,
  loadImagePreview,
} from "../../utils/encrypt_storage/imageHandlers";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
// Redux:
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectUserdata,
  selectUpdating,
  selectUpdateSuccess,
  selectUpdateErr,
} from "../../redux/user/user.selector";
import { updateMe } from "../../redux/user/user.actions";

const Profile = ({
  userData,
  updating,
  updated,
  updateErr,
  update,
  showProfile,
}) => {
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);

  return (
    <div className="profile">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="btn-profile-close"
        onClick={() => showProfile(false)}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <motion.div
        animate={{ scale: 1.5 }}
        transition={{ duration: 0.5 }}
        className="profile-img"
      >
        <img
          src={
            userData.photo
              ? `data:image/jpeg;base64,${_arrayBufferToBase64(
                  userData.photo.data
                )}`
              : "https://i.ibb.co/d5RgxfH/user-blank.png"
          }
          alt={userData.name}
        />
      </motion.div>
      <div className="profile-details menu-form">
        <div>
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(event) => loadImagePreview(event, "img")}
          />
          <motion.button
            whileTap={{ scale: 0.3 }}
            className="btn-profile-img-upload btn-grad"
            onClick={() => document.getElementById("img").click()}
          >
            Update Photo
          </motion.button>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <motion.button
            whileTap={{ scale: 0.3 }}
            className="btn-profile-update btn-grad"
            onClick={() => update(username, email)}
          >
            {updating ? "Updating..." : "Update"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  userData: selectUserdata,
  updating: selectUpdating,
  updated: selectUpdateSuccess,
  updateErr: selectUpdateErr,
});

const mapDispatchToProps = (dispatch) => ({
  update: (name, email) => dispatch(updateMe(name, email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
