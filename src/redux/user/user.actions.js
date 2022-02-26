import { userTypes } from "./user.types";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import axios from "axios";
// config axios:
const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
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

export const updating = () => ({
  type: userTypes.UPDATING,
});

export const updateSuccessful = (userData) => ({
  type: userTypes.UPDATE_SUCCESSFUL,
  payload: userData,
});

export const updateFailed = (msg) => ({
  type: userTypes.UPDATE_FAILED,
  payload: msg,
});

export const updatePassSuccessful = (userData) => ({
  type: userTypes.UPDATE_PASS_SUCCESSFUL,
  payload: userData,
});
// Login saved:
export const checkSavedLogin = () => {
  return async (dispatch) => {
    const user = encryptStorage.getItem("user");
    var res;
    if (user) {
      res = await fetch(
        `${process.env.REACT_APP_HOST_URL}/api/v1/user/auth/isLoggedIn`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            encryptStorage.setItem("user", data.user);
            dispatch(loginSuccessful(data.user));
            return true;
          } else return false;
        });
    }
    return res;
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
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          encryptStorage.setItem("user", data.user);
          dispatch(loginSuccessful(data.user));
          window.location.assign("/app");
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
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          encryptStorage.setItem("user", data.user);
          dispatch(signupSuccessful(data.user));
          window.location.assign("/app");
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
    fetch(`${process.env.REACT_APP_HOST_URL}/api/v1/user/auth/logout`, {
      credentials: "include",
    });
    encryptStorage.clear();
    dispatch(logoutSuccessful());
    window.location.assign("/");
  };
};
// Update me:
export const updateMe = (name, email) => {
  return (dispatch) => {
    const data = {};
    const user = encryptStorage.getItem("user");
    if (user.username !== name || user.email !== email) {
      dispatch(updating());
      if (user.username !== name) data.name = name;
      if (user.email !== email) data.email = email;
      fetch(`${process.env.REACT_APP_HOST_URL}/api/v1/user/updateMe`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            encryptStorage.setItem("user", data.user);
            dispatch(updateSuccessful(data.user));
          } else {
            throw data;
          }
        })
        .catch((err) => {
          dispatch(updateFailed(err.message));
        });
    }
  };
};
// Update password:
export const updatePassword = (currentPass, newPass) => {
  return (dispatch) => {
    if (currentPass && newPass) {
      dispatch(updating());
      const data = {
        currPassword: currentPass,
        newPassword: newPass,
      };
      api
        .patch("/api/v1/user/auth/updatePassword", data)
        .then((res) => {
          if (res.data.status === "success") dispatch(updatePassSuccessful());
          else throw res.data;
        })
        .catch((err) => console.log(err));
    }
  };
};
