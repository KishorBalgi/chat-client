import { userTypes } from "./user.types";

const INITIAL_STATE = {
  userData: null,
  loggingIn: false,
  loggedIn: false,
  loginErr: null,
  signingUp: false,
  signedUp: false,
  signupErr: null,
  updating: null,
  updateSuccess: null,
  updateErr: null,
  profPicUpadting: false,
  profPicUpdateErr: null,
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
        signingUp: false,
        signupErr: action.payload,
      };
    // LOGOUT:
    case userTypes.LOGOUT_SUCCESSFUL:
      return {
        ...state,
        loggedIn: false,
      };
    // Update:
    case userTypes.UPDATING:
      return {
        ...state,
        updating: true,
      };
    case userTypes.UPDATE_SUCCESSFUL:
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        userData: action.payload,
      };
    case userTypes.UPDATE_FAILED:
      return {
        ...state,
        updating: false,
        updateSuccess: false,
        updateErr: action.payload,
      };
    case userTypes.UPDATE_PASS_SUCCESSFUL:
      return {
        ...state,
        updating: false,
        updateSuccess: true,
      };
    case userTypes.UPDATE_PROFILE_PIC_START:
      return {
        ...state,
        profPicUpadting: true,
      };
    case userTypes.UPDATE_PROFILE_PIC_COMPLETE:
      return {
        ...state,
        profPicUpadting: false,
      };
    case userTypes.UPDATE_PROFILE_PIC_FAILED:
      return {
        ...state,
        profPicUpadting: false,
        profPicUpdateErr: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
