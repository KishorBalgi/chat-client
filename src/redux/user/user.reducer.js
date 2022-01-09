import { userTypes } from "./user.types";

const INITIAL_STATE = {
  userData: null,
  loggingIn: false,
  loggedIn: false,
  loginErr: null,
  signingUp: false,
  signedUp: false,
  signupErr: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //   LOGIN:
    case userTypes.LOGIN_START:
      return {
        ...state,
        loggingIn: true,
      };
    case userTypes.LOGIN_SUCCESSFUL:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        userData: action.payload,
      };
    case userTypes.LOGIN_FAILED:
      return {
        ...state,
        loggingIn: false,
        loginErr: action.payload,
      };
    //   SIGNUP:
    case userTypes.SIGNUP_START:
      return {
        ...state,
        signingUp: true,
      };
    case userTypes.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        signedUp: true,
        loggedIn: true,
        signingUp: false,
        userData: action.payload,
      };
    case userTypes.SIGNUP_FAILED:
      return {
        ...state,
        signupErr: action.payload,
      };
    // LOGOUT:
    case userTypes.LOGOUT_SUCCESSFUL:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
