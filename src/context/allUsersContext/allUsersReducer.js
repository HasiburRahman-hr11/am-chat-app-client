const allUsersReducer = (state, action) => {
    switch (action.type) {
      // CREATE users
      case "CREATE_USER_START":
        return {
          users: state.users,
          loadinUsers: false,
          error: null,
        };
  
      case "CREATE_USER_SUCCESS":
        return {
          users: action.payload,
          loadinUsers: false,
          error: null,
        };
  
      case "CREATE_USER_FAILED":
        return {
          users: state.users,
          loadinUsers: false,
          error: action.payload,
        };


        case "GET_ALL_USERS_START":
        return {
          users: state.users,
          loadinUsers: true,
          error: null,
        };
  
      case "GET_ALL_USERS_SUCCESS":
        return {
          users: action.payload,
          loadinUsers: false,
          error: null,
        };
  
      case "GET_ALL_USERS_FAILED":
        return {
          users: state.users,
          loadinUsers: false,
          error: action.payload,
        };
  

      default:
        return state;
    }
  };
  
  export default allUsersReducer;
  