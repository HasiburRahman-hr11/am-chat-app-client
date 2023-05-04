import React, { useContext, useEffect, useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { UserContext } from "../../context/user-context/userContext";
import axios from "axios";
import convertToBase64 from "../../utils/convertToBase64";

const Chat = ({ chat , setCurrentChat}) => {
  const { user } = useContext(UserContext);
  const [chatUser, setChatUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const chatUserId = chat?.members?.find((m) => m !== user._id);
    const getChatUser = async () => {
      try {
        const { data } = await axios.get(
          `https://am-chat-app-api.onrender.com/user/get-user/${chatUserId}`
        );
        console.log(chatUserId);
        setChatUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if(chatUserId !== undefined){
      getChatUser();
    }
  }, [chat.members, user._id]);
  return (
    <>
      {!loading && (
        <ListItem sx={{ cursor: "pointer" }} onClick={()=> setCurrentChat(chat)}>
          <ListItemAvatar>
            {chatUser?.profilePicture ? (
              <Avatar
                src={`data:image/png;base64,${convertToBase64(
                  chatUser?.profilePicture.data
                )}`}
              />
            ) : (
              <Avatar>
                <ImageIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={chatUser?.firstName + " " + chatUser?.lastName}
            secondary={chatUser?.email}
          />
        </ListItem>
      )}
    </>
  );
};

export default Chat;
