export const createChatStart = () => ({ type: "CREATE_CHAT_START" });
export const createChatSuccess = (chats) => ({
  type: "CREATE_CHAT_SUCCESS",
  payload: chats,
});
export const createChatFailed = (error) => ({
  type: "CREATE_CHAT_FAILED",
  payload: error,
});


export const getAllChatStart = () => ({ type: "GET_ALL_CHAT_START" });
export const getAllChatSuccess = (chats) => ({
  type: "GET_ALL_CHAT_SUCCESS",
  payload: chats,
});
export const getAllChatFailed = (error) => ({
  type: "GET_ALL_CHAT_FAILED",
  payload: error,
});

