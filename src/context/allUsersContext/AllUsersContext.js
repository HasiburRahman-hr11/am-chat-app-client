import React, { createContext, useReducer } from "react";
import allUsersReducer from "./allUsersReducer";


let initialState = {
  users: [],
  loadingUsers: false,
  error: null,
};

export const AllUserContext = createContext();

const AllUserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(allUsersReducer, initialState);
  return (
    <AllUserContext.Provider
      value={{
        users: state.users,
        loadingUsers: state.loadingUsers,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AllUserContext.Provider>
  );
};

export default AllUserContextProvider;
