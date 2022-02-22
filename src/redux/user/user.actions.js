import { userTypes } from "./user.types";
import { encryptStorage } from "../../utils/encrypt_storage/encryptStorage";
import axios from "axios";

// Options:
const postOptions = (data) => ({
  method: "POST",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
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
// Login saved:
export const checkSavedLogin = () => {
  return (dispatch) => {
    const user = encryptStorage.getItem("user");
    console.log(user);
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
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/user/auth/login",
        data: data,
      });
      console.log(res.data);
      if (res.data.status === "success") {
        const user = res.data.data;

        dispatch(
          loginSuccessful({
            username: user.name,
            uid: user.uid,
            img: user.img,
          })
        );
      }
    } catch (err) {
      dispatch(loginFailed(err));
    }
    // .post("http://localhost:8000/api/v1/user/auth/login")
    // .then((data) => {
    //   console.log(data);
    //
    // encryptStorage.setItem("user", { email: email, password: password });
    // } else if (data.status === "fail") {
    //   throw data.message;
    // }
    // })
    // .catch((err) => dispatch(loginFailed(err)));
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
    console.log(data);
    dispatch(signupStart());
    await axios
      .post("http://localhost:8000/api/v1/user/auth/signup")
      // .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          dispatch(
            signupSuccessful({
              username: name,
              uid: data.user.uid,
              img: data.user.img,
            })
          );
          encryptStorage.setItem("user", {
            email: email,
            password: password,
          });
        } else if (data.status === "fail") {
          throw data.message;
        }
      })
      .catch((err) => dispatch(signupFailed(err)));
  };
};

// LogOut:
export const logout = () => {
  return (dispatch) => {
    encryptStorage.clear();
    dispatch(logoutSuccessful());
  };
};
