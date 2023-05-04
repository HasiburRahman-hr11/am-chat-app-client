export const createUserStart = () => ({ type: "CREATE_USER_START" });
export const createUserSuccess = (users) => ({
  type: "CREATE_USER_SUCCESS",
  payload: users,
});
export const createUserFailed = (error) => ({
  type: "CREATE_USER_FAILED",
  payload: error,
});


export const getAllUsersStart = () => ({ type: "GET_ALL_USERS_START" });
export const getAllUsersSuccess = (users) => ({
  type: "GET_ALL_USERS_SUCCESS",
  payload: users,
});
export const getAllUsersFailed = (error) => ({
  type: "GET_ALL_USERS_FAILED",
  payload: error,
});

