import React, { useState } from "react";
import "./forgot-password.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { forgotPassword } from "../../redux/user/user.actions";
import {
  selectTokenErr,
  selectTokenStart,
  selectTokenSuccess,
} from "../../redux/user/user.selector";
import { Spinner } from "../../components/spinner/spinner.component";

const ForgotPassword = ({
  forgotPassword,
  tokenStart,
  tokenSuccess,
  tokenErr,
}) => {
  const [email, setEmail] = useState(null);
  return (
    <div className="forgot-pass">
      <div className="forgot-pass-form">
        <p>Forgot Password</p>
        {tokenStart ? (
          <Spinner />
        ) : (
          <div>
            <label htmlFor="forgot-email">Enter your email</label>
            <input
              type="email"
              id="forgot-email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => forgotPassword(email)}>Submit</button>
          </div>
        )}
        {tokenSuccess ? (
          <p className="err">Check your email for password reset</p>
        ) : null}
        {tokenErr ? <p className="err">{tokenErr}</p> : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email) => dispatch(forgotPassword(email)),
});

const mapStateToProps = createStructuredSelector({
  tokenStart: selectTokenStart,
  tokenSuccess: selectTokenSuccess,
  tokenErr: selectTokenErr,
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
