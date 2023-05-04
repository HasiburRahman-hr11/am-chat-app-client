export const createUserStart = () => ({ type: "CREATE_USER_START" });
export const createUserSuccess = (user) => ({
  type: "CREATE_USER_SUCCESS",
  payload: user,
});
export const createUserFailed = (error) => ({
  type: "CREATE_USER_FAILED",
  payload: error,
});

export const logoutStart = () => ({ type: "LOGOUT_START" });
export const logoutSuccess = () => ({ type: "LOGOUT_SUCCESS" });
export const logoutFailed = (error) => ({
  type: "LOGOUT_FAILED",
  payload: error,
});
