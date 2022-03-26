import React, { useState } from "react";
import "./delete-account.styles.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDelAccErr,
  selectDeletingAcc,
} from "../../redux/user/user.selector";
import { deleteAccount } from "../../redux/user/user.actions";
const DeleteAccount = ({
  showAccount,
  showDelAcc,
  deleteAcc,
  deletingAcc,
  delAccErr,
}) => {
  const [password, setPassword] = useState("");
  return (
    <div className="delete-account">
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="btn-profile-close"
        onClick={() => {
          showDelAcc(false);
          showAccount(true);
        }}
      >
        <FontAwesomeIcon icon={faChevronCircleLeft} />
      </motion.button>
      <div className="menu-form">
        <div>
          <label htmlFor="delAccPass">Enter your password :</label>
          <input
            type="password"
            id="delAccPass"
            autoFocus="autoFocus"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="btn-profile-update btn-grad"
            onClick={() => deleteAcc(password)}
          >
            {deletingAcc ? "Deleting" : "Submit"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  deletingAcc: selectDeletingAcc,
  delAccErr: selectDelAccErr,
});
const mapDispatchToProps = (dispatch) => ({
  deleteAcc: (password) => dispatch(deleteAccount(password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
