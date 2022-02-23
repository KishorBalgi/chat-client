import React from "react";
import "./profile-menu.styles.css";
// Redux:
import { connect } from "react-redux";
import { logout } from "../../redux/user/user.actions";

const ProfileMenu = ({ logout, showSettings }) => {
  return (
    <div className="profile-menu">
      <ul className="profile-menu-options">
        <li onClick={() => showSettings(true)}>Settings</li>
        <li onClick={() => logout()}>Logout</li>
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(ProfileMenu);
