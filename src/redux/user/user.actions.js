import { userTypes } from "./user.types";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import axios from "axios";

export const loginStart = () => ({
  type: userTypes.LOGIN_START,
});

export const loginSuccessful = (userData) => ({
  type: userTypes.LOGIN_SUCCESSFUL,
  payload: userData,
});

export const loginFailed = (errMsg) => ({
  type: userTypes.LOGIN_FAILED,
  payload: errMsg,
});

export const signupStart = () => ({
  type: userTypes.SIGNUP_START,
});

export const signupSuccessful = (userData) => ({
  type: userTypes.SIGNUP_SUCCESSFUL,
  payload: userData,
});

export const signupFailed = (errMsg) => ({
  type: userTypes.SIGNUP_FAILED,
  payload: errMsg,
});

export const logoutSuccessful = () => ({
  type: userTypes.LOGOUT_SUCCESSFUL,
});
// Login saved:
export const checkSavedLogin = () => {
  return (dispatch) => {
    const user = encryptStorage.getItem("user");
    if (user !== undefined) {
      dispatch(login(user.email, user.password));
    } else {
      return;
    }
  };
};
// Login:
export const login = (email, password) => {
  return async (dispatch) => {
    if (!email || !password) {
      return dispatch(loginFailed("All fields required."));
    }
    const data = { email: email, password: password };
    dispatch(loginStart());
    fetch(`${process.env.REACT_APP_HOST_URL}/api/v1/user/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          encryptStorage.setItem("user", data.user);
          dispatch(loginSuccessful(data.user));
        } else {
          throw data;
        }
      })
      .catch((err) => dispatch(loginFailed(err.message)));
  };
};
// SignUp:
export const signup = (name, email, password) => {
  return async (dispatch) => {
    if (!name || !email || !password) {
      return dispatch(signupFailed("All fields required."));
    }
    const data = {
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
    };
    dispatch(signupStart());
    fetch(`${process.env.REACT_APP_HOST_URL}/api/v1/user/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          encryptStorage.setItem("user", data.user);
          dispatch(signupSuccessful(data.user));
        } else {
          throw data;
        }
      })
      .catch((err) => dispatch(signupFailed(err.message)));
  };
};

// LogOut:
export const logout = () => {
  return (dispatch) => {
    encryptStorage.clear();
    dispatch(logoutSuccessful());
  };
};
