const userReducer = (state, action) => {
    switch (action.type) {
      // CREATE User
      case "CREATE_USER_START":
        return {
          user: state.user,
          loadingUser: true,
          error: null,
        };
  
      case "CREATE_USER_SUCCESS":
        return {
          user: action.payload,
          loadingUser: false,
          error: null,
        };
  
      case "CREATE_USER_FAILED":
        return {
          user: state.user,
          loadingUser: false,
          error: action.payload,
        };
  
  
        // Logout User
      case "LOGOUT_START":
        return {
          user: state.user,
          loadingUser: true,
          error: null,
        };
  
      case "LOGOUT_SUCCESS":
        return {
          user: {},
          loadingUser: false,
          error: null,
        };
  
      case "LOGOUT_FAILED":
        return {
          user: state.user,
          loadingUser: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default userReducer;
  