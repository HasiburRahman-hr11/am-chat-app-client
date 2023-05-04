import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "../components/Header/Header";
import ChatBox from "../components/Chat/ChatBox";

import ActiveChats from "../components/Chat/ActiveChats";
import AllChats from "../components/Chat/AllChats";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/user-context/userContext";
import axios from "axios";
import { Typography } from "@mui/material";
import { errorNotify } from "../utils/toastify";
import { io } from "socket.io-client";
import AllUsers from "../components/Chat/AllUsers";
import { ChatContext } from "../context/chatContext/chatContext";
import {
  getAllChatFailed,
  getAllChatStart,
  getAllChatSuccess,
} from "../context/chatContext/chatAction";
import { AllUserContext } from "../context/allUsersContext/AllUsersContext";
import {
  getAllUsersFailed,
  getAllUsersStart,
  getAllUsersSuccess,
} from "../context/allUsersContext/allUsersAction";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [showAllUser, setShowAllUsers] = useState(false);

  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);
  const { dispatch: dispatchUsers, users: allUsers } =
    useContext(AllUserContext);
  const scrollRef = useRef();
  const socket = useRef();

  const submitNewMessage = async () => {
    if (!newMessage) {
      return alert("Please type your message first");
    }
    let message = {
      chatId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const { data } = await axios.post(
        "https://am-chat-app-api.onrender.com/chat/message/create",
        message
      );
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
      errorNotify("Somethin Went Wron!");
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      dispatchUsers(getAllUsersStart());
      try {
        const { data } = await axios.get(
          "https://am-chat-app-api.onrender.com/user/all-users"
        );
        // setAllUsers(data);
        dispatchUsers(getAllUsersSuccess(data));
      } catch (error) {
        console.log(error);
        dispatchUsers(getAllUsersFailed(error));
      }
    };
    getAllUsers();
  }, []);

  // Socket
  useEffect(() => {
    // socket.current = io("ws://localhost:8080");
    socket.current = io("https://am-chat-app-api.onrender.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        allUsers.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user, allUsers]);

  useEffect(() => {
    const getChats = async () => {
      dispatch(getAllChatStart());
      try {
        const { data } = await axios.get(
          `https://am-chat-app-api.onrender.com/chat/get/${user._id}`
        );
        dispatch(getAllChatSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(getAllChatFailed());
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `https://am-chat-app-api.onrender.com/chat/message/all/${currentChat._id}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);


  return (
    <>
      <Header />
      <Box
        sx={{
          paddingTop: "70px",
          height: "calc(100vh - 70px)",
          background: "#fff",
        }}
      >
        <Grid container>
          <Grid item md={3}>
            <AllChats setCurrentChat={setCurrentChat} />
          </Grid>
          <Grid item md={6}>
            {currentChat ? (
              <ChatBox
                messages={messages}
                currentChat={currentChat}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                submitNewMessage={submitNewMessage}
                scrollRef={scrollRef}
              />
            ) : (
              <Box className="no-open-chat">
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "30px 20px",
                  }}
                >
                  Click an user to start conversation.
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item md={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: "15px",
                mt: "20px",
              }}
            >
              <Typography
                onClick={() => setShowAllUsers(false)}
                sx={{
                  marginLeft: "20px",
                  opacity: showAllUser ? "0.5" : "1",
                  cursor: "pointer",
                }}
              >
                Active Users
              </Typography>
              <Typography
                onClick={() => setShowAllUsers(true)}
                sx={{
                  marginLeft: "20px",
                  opacity: showAllUser ? "1" : "0.5",
                  cursor: "pointer",
                }}
              >
                All Users
              </Typography>
            </Box>
            {showAllUser ? (
              <AllUsers setCurrentChat={setCurrentChat} />
            ) : (
              <ActiveChats
                onlineUsers={onlineUsers}
                setCurrentChat={setCurrentChat}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ChatPage;
