import React from "react";
import "./profile-menu.styles.css";
// Redux:
import { connect } from "react-redux";
import { logout } from "../../redux/user/user.actions";

const ProfileMenu = ({ logout, showProfile }) => {
  return (
    <div className="profile-menu">
      <ul className="profile-menu-options">
        <li onClick={() => showProfile(true)}>Profile</li>
        <li>Settings</li>
        <li onClick={() => logout()}>Logout</li>
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(ProfileMenu);
