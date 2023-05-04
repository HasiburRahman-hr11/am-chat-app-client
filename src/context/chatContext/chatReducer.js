const chatReducer = (state, action) => {
    switch (action.type) {
      // CREATE chats
      case "CREATE_CHAT_START":
        return {
          chats: state.chats,
          loadingChats: false,
          error: null,
        };
  
      case "CREATE_CHAT_SUCCESS":
        return {
          chats: action.payload,
          loadingChats: false,
          error: null,
        };
  
      case "CREATE_CHAT_FAILED":
        return {
          chats: state.chats,
          loadingChats: false,
          error: action.payload,
        };


        case "GET_ALL_CHAT_START":
        return {
          chats: state.chats,
          loadingChats: true,
          error: null,
        };
  
      case "GET_ALL_CHAT_SUCCESS":
        return {
          chats: action.payload,
          loadingChats: false,
          error: null,
        };
  
      case "GET_ALL_CHAT_FAILED":
        return {
          chats: state.chats,
          loadingChats: false,
          error: action.payload,
        };
  

      default:
        return state;
    }
  };
  
  export default chatReducer;
  