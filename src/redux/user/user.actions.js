import { userTypes } from "./user.types";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import store from "../store";
import axios from "axios";
// config axios:
export const api = axios.create({
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
export const updateProfilePicStart = () => ({
  type: userTypes.UPDATE_PROFILE_PIC_START,
});

export const updateProfilePicComplete = () => ({
  type: userTypes.UPDATE_PROFILE_PIC_COMPLETE,
});

export const updateProfilePicFailed = (err) => ({
  type: userTypes.UPDATE_PROFILE_PIC_FAILED,
  payload: err,
});
export const delAccStart = () => ({
  type: userTypes.DEL_ACC_START,
});
export const delAccFailed = (err) => ({
  type: userTypes.DEL_ACC_FAILED,
  payload: err,
});
export const tokenSendStart = () => ({
  type: userTypes.TOKEN_START,
});
export const tokenSentSuccess = () => ({
  type: userTypes.TOKEN_SUCCESS,
});

export const tokenSentFail = (err) => ({
  type: userTypes.TOKEN_FAIL,
  payload: err,
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
          encryptStorage.setItem("jwt", data.token);
          // document.cookie = `jwt=${data.token}; SameSite=None; Secure`;
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
          encryptStorage.setItem("jwt", data.token);
          // document.cookie = `jwt=${data.token}; SameSite=None; Secure`;
          dispatch(signupSuccessful(data.user));
          window.location.assign("/app");
        } else {
          throw data;
        }
      })
      .catch((err) => {
        dispatch(signupFailed(err.message));
      });
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
// Update profile pic:
export const updateProfilePic = (remove) => {
  return (dispatch) => {
    const state = store.getState();
    const userData = state.user.userData;
    dispatch(updateProfilePicStart());
    const form = new FormData();
    if (document.getElementById("imgUploadInp").files[0] && !remove) {
      form.append("photo", document.getElementById("imgUploadInp").files[0]);
    }
    if (remove) {
      form.append("remove", true);
    }

    api
      .post("/api/v1/user/uploadProfilePic", form)
      .then((res) => {
        if (res.data.status !== "success") throw res.data;
        if (res.data.status === "success" && res.data.photo) {
          userData.photo = res.data.photo;
        } else {
          userData.photo = null;
        }
        dispatch(updateSuccessful(userData));
        dispatch(updateProfilePicComplete());
      })
      .catch((err) => {
        dispatch(updateProfilePicFailed(err));
      });
  };
};
// Delete Account:
export const deleteAccount = (password) => {
  return (dispatch) => {
    if (!password) return;
    dispatch(delAccStart());
    api
      .delete(`/api/v1/user/deleteMe/${password}`)
      .then(() => {
        console.log("Hi");
        dispatch(logout());
      })
      .catch((err) => delAccFailed(err));
  };
};
// Set Theme:
export const setTheme = (theme) => {
  return () => {
    const root = document.querySelector(":root");
    if (theme) localStorage.setItem("app-theme", theme);
    if (theme === "light") {
      root.style.setProperty("--clr-primary", "#fafafa");
      root.style.setProperty("--clr-primary-highlight", "#e4e5f1");
      root.style.setProperty("--clr-primary-darker", "#d2d3db");
      root.style.setProperty("--clr-hover", "rgba(0, 0, 0, 0.1)");
      root.style.setProperty("--clr-font", "#000");
      root.style.setProperty("--clr-font-compl", "#fff");
      root.style.setProperty("--clr-chat-border", "rgba(0, 0, 0, 0.2)");
      root.style.setProperty("--clr-box-shadow", "rgba(0, 0, 0, 0.4)");
    }
    if (theme === "dark") {
      root.style.setProperty("--clr-primary", "#0d1117");
      root.style.setProperty("--clr-primary-highlight", "#333a44");
      root.style.setProperty("--clr-primary-darker", "#161b22");
      root.style.setProperty("--clr-hover", "rgba(255, 255, 255, 0.1)");
      root.style.setProperty("--clr-font", "#fff");
      root.style.setProperty("--clr-font-compl", "#000");
      root.style.setProperty("--clr-chat-border", "rgba(255, 255, 255, 0.2)");
      root.style.setProperty("--clr-box-shadow", "rgba(255, 255, 255, 0)");
    }
  };
};
export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch(tokenSendStart());
    api
      .post("/api/v1/user/auth/forgotPassword", { email })
      .then((res) => {
        if (res.data.success !== "success") throw res.data;
        dispatch(tokenSentSuccess());
      })
      .catch((err) => dispatch(tokenSentFail(err.message)));
  };
};
