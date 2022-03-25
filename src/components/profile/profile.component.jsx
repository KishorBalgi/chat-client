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
import {
  faChevronCircleLeft,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
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
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showSaveImgBtn, setShowSaveImgBtn] = useState(false);

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
          <motion.button
            whileTap={{ scale: 0.3 }}
            className="btn-profile-img-upload btn-grad"
            onClick={() => setShowImageUploader(true)}
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
      {showImageUploader ? (
        <div className="profile-img-uploader">
          <div className="profile-img-uploader-box">
            <FontAwesomeIcon
              icon={faWindowClose}
              className="close-profile-pic-uploder"
              onClick={() => setShowImageUploader(false)}
            />
            <div className="profile-img-uploader-img">
              <input
                type="file"
                accept="image/*"
                id="imgUploadInp"
                onChange={(event) => {
                  loadImagePreview(event, "imgUpload");
                  setShowSaveImgBtn(true);
                }}
              />
              <img
                className="profile-img-uploader-img"
                id="imgUpload"
                src={
                  userData.photo
                    ? `data:image/jpeg;base64,${_arrayBufferToBase64(
                        userData.photo.data
                      )}`
                    : "https://i.ibb.co/d5RgxfH/user-blank.png"
                }
                alt="img"
              />
            </div>
            <div className="profile-img-uploader-btns">
              <motion.button
                whileTap={{ scale: 0.3 }}
                className="btn-profile-pic btn-grad"
              >
                Remove photo
              </motion.button>
              {showSaveImgBtn ? (
                <motion.button
                  whileTap={{ scale: 0.3 }}
                  className="btn-profile-pic btn-grad"
                >
                  Save
                </motion.button>
              ) : null}
              <motion.button
                whileTap={{ scale: 0.3 }}
                className="btn-profile-pic btn-grad"
                onClick={() => document.getElementById("imgUploadInp").click()}
              >
                Choose photo
              </motion.button>
            </div>
          </div>
        </div>
      ) : null}
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
