import React, { createContext, useReducer } from "react";
import chatReducer from "./chatReducer";


let initialState = {
  chats: [],
  loadingChats: false,
  error: null,
};

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        loadingChats: state.loadingChats,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
