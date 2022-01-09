import React, { useState } from "react";
import "./sinlog.styles.css";
// Components:
import { Spinner } from "../spinner/spinner.component";
// Icons:
// Icons:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
// Redux:
import { connect } from "react-redux";
import { login, signup } from "../../redux/user/user.actions";
import {
  selectIsLoggingIn,
  selectIsSigningUp,
  selectLoginErr,
} from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
const Sinlog = ({ login, signup, isLoggingIn, isSigninigUp, loginErr }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [btnActive, setActive] = useState(true);
  return (
    <div className="sinlog">
      <div className="sinlog-container">
        <div
          className={`sinlog-options ${
            isLoggingIn || isSigninigUp ? "hidden" : ""
          }`}
        >
          <button
            className={`btn-login ${btnActive ? "btn-sinlog-active" : ""}`}
            onClick={() => setActive(true)}
          >
            Login
          </button>
          <button
            className={`btn-signup ${btnActive ? "" : "btn-sinlog-active"}`}
            onClick={() => setActive(false)}
          >
            Sign Up
          </button>
        </div>
        {btnActive ? (
          isLoggingIn ? (
            <Spinner msg="Logging In ..." />
          ) : (
            <div className="sinlog-form login-form">
              <div className="sinlog-fdiv">
                <label>E-Mail:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="sinlog-fdiv">
                <label>Password:</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginErr ? (
                <div className="sinlog-err">
                  <p>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="sinlog-err-icon"
                    />
                    {loginErr}
                  </p>
                </div>
              ) : null}

              <button
                className="btn-sinlog-submit"
                onClick={() => login(email, password)}
              >
                Login
              </button>
            </div>
          )
        ) : isSigninigUp ? (
          <Spinner msg="Signing Up ..." />
        ) : (
          <div className="sinlog-form signup-form">
            <div className="sinlog-fdiv">
              <label>Name:</label>{" "}
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="sinlog-fdiv">
              <label>E-Mail:</label>{" "}
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="sinlog-fdiv">
              <label>Password:</label>{" "}
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginErr ? (
              <div className="sinlog-err">
                <p>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="sinlog-err-icon"
                  />
                  {loginErr}
                </p>
              </div>
            ) : null}

            <button
              className="btn-sinlog-submit"
              onClick={() => signup(name, email, password)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const mapstateToProps = createStructuredSelector({
  isLoggingIn: selectIsLoggingIn,
  isSigninigUp: selectIsSigningUp,
  loginErr: selectLoginErr,
});
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  signup: (name, email, password) => dispatch(signup(name, email, password)),
});
export default connect(mapstateToProps, mapDispatchToProps)(Sinlog);
