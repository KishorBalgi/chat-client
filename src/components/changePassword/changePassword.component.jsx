import React, { useState } from "react";
import "./changePassword.styles.css";
// Animations:
import { motion } from "framer-motion";
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
// Redux:
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { updatePassword } from "../../redux/user/user.actions";
import {
  selectUpdateSuccess,
  selectUpdating,
} from "../../redux/user/user.selector";

const ChangePassword = ({
  updatePass,
  updating,
  updated,
  showAccount,
  showChgPass,
}) => {
  const [current, setCurrent] = useState(null);
  const [newPass, setNewPass] = useState(null);
  return (
    <div className="password-change">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="btn-profile-close"
        onClick={() => {
          showAccount(true);
          showChgPass(false);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <div className="password-change-from menu-form">
        <div>
          <label htmlFor="current">Current password:</label>
          <input
            type="password"
            id="current"
            onChange={(e) => setCurrent(e.target.value)}
            autoFocus="autoFocus"
          />
        </div>
        <div>
          <label htmlFor="newPass">New password:</label>
          <input
            type="password"
            id="newPass"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="btn-password-change btn-grad"
            onClick={() => updatePass(current, newPass)}
          >
            {updating ? "Updating..." : "Update Password"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  updating: selectUpdating,
  updated: selectUpdateSuccess,
});
const matchDispatchToProps = (dispatch) => ({
  updatePass: (current, newPass) => dispatch(updatePassword(current, newPass)),
});
export default connect(mapStateToProps, matchDispatchToProps)(ChangePassword);
