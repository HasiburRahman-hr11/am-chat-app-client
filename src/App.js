import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { UserContext } from "./context/user-context/userContext";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PageScroll from "./components/PageScroll";
import ChatPage from "./pages/ChatPage";


const App = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <ToastContainer />
      <PageScroll />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/signin"
          element={user?.email ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          exact
          path="/signup"
          element={user?.email ? <Navigate to="/" /> : <Signup />}
        />

        <Route
          exact
          path="/profile/:userId"
          element={!user?._id ? <Navigate to="/" /> : <Profile />}
        />
        <Route
          exact
          path="/profile/edit-profile/:userId"
          element={!user?._id ? <Navigate to="/" /> : <EditProfile />}
        />

        <Route
          exact
          path="/chats"
          element={!user?._id ? <Navigate to="/" /> : <ChatPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
