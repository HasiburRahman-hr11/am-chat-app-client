import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Message from "./Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../context/user-context/userContext";
import axios from "axios";

const ChatBox = ({ messages, currentChat, newMessage, setNewMessage , submitNewMessage , scrollRef}) => {
  const { user } = useContext(UserContext);
  const [chatUser, setChatUser] = useState({});
  useEffect(() => {
    const chatUserId = currentChat?.members?.find((m) => m !== user._id);
    const getChatUser = async () => {
      try {
        const { data } = await axios.get(
          `https://am-chat-app-api.onrender.com/user/get-user/${chatUserId}`
        );
        setChatUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    if(chatUserId !== undefined){
      getChatUser();
    }
    
  }, [user._id, currentChat]);
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          padding: "15px 0",
          backgroundColor: "#f1f1f1",
        }}
      >
        {chatUser ? <>{chatUser?.firstName + " " + chatUser?.lastName}</> : 'User Loading..'}
      </Typography>

      <Box
        className="chat-messages"
        sx={{
          padding: "0 10px",
          height: "calc(100vh - 208px)",
          overflowY: "scroll",
        }}
      >
        {messages.length > 0 ? (
          <div ref={scrollRef}>
            {messages.map((message , ind) => (
              <Message key={ind} message={message} />
            ))}
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              No Convrsation yet.
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          padding: "10px 10px 15px 10px",
          background: "#eee",
        }}
      >
        <TextField
          label="Message"
          variant="standard"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
        onClick={submitNewMessage}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            position: "absolute",
            right: "10px",
            top: "14px",
            background: "transparent",
            color: "#333",
            border: "0",
            boxShadow: "none",
            "&:hover": {
              background: "transparent",
              boxShadow: "none",
              color: "#000",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
