import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserdata = createSelector(
  [selectUser],
  (user) => user.userData
);

export const selectIsLoggingIn = createSelector(
  [selectUser],
  (user) => user.loggingIn
);

export const selectIsLoggedIn = createSelector(
  [selectUser],
  (user) => user.loggedIn
);

export const selectLoginErr = createSelector(
  [selectUser],
  (user) => user.loginErr
);

export const selectIsSigningUp = createSelector(
  [selectUser],
  (user) => user.signingUp
);

export const selectIsSignedUp = createSelector(
  [selectUser],
  (user) => user.signedUp
);

export const selectSignupErr = createSelector(
  [selectUser],
  (user) => user.signupErr
);

export const selectUpdating = createSelector(
  [selectUser],
  (user) => user.updating
);
export const selectUpdateSuccess = createSelector(
  [selectUser],
  (user) => user.updateSuccess
);

export const selectUpdateErr = createSelector(
  [selectUser],
  (user) => user.updateErr
);
