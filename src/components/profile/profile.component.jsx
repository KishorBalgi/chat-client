import React from "react";
import "./profile.styles.css";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faChevronCircleLeft,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
// Redux:
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectUserdata } from "../../redux/user/user.selector";
const Profile = ({ userData, showProfile }) => {
  return (
    <div className="profile">
      <button className="btn-profile-close" onClick={() => showProfile(false)}>
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </button>
      <div className="profile-img">
        <img src={userData.img} alt="Profile pic" />
        <div className="btn-profile-img-change">
          <div>
            <p>Change Profile Photo</p>
            <FontAwesomeIcon icon={faCamera} className="icon-camera" />
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Your name"
            value={userData.username}
            readOnly
          />
          <button className="btn-profile-edit-username">
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  userData: selectUserdata,
});

export default connect(mapStateToProps)(Profile);
