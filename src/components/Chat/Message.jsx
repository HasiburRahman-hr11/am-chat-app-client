import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../../context/user-context/userContext";
import {format} from 'timeago.js'


const Message = ({ message }) => {
  const { user } = useContext(UserContext);
  return (
    <Box
      component="div"
      className={message?.sender === user._id ? "message own" : "message"}
    >
      <Box component="div" className="message-text">
        <Avatar src="https://eu.ui-avatars.com/api/?name=john&size=250" />
        <Typography component="p" variant="p">
          {message.text}
        </Typography>
      </Box>
      <Typography
        className="message-time"
        component="p"
        variant="p"
        sx={{ mt: "10px" }}
      >
        {format(message.createdAt)}
      </Typography>
    </Box>
  );
};

export default Message;
