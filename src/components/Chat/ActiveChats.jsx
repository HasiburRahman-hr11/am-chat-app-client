import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import convertToBase64 from "../../utils/convertToBase64";
import axios from "axios";
import { UserContext } from "../../context/user-context/userContext";
import { errorNotify } from "../../utils/toastify";
import { ChatContext } from "../../context/chatContext/chatContext";
import { getAllChatSuccess } from "../../context/chatContext/chatAction";

const ActiveChats = ({ onlineUsers, setCurrentChat }) => {
  const {user} = useContext(UserContext);
  const { chats, dispatch } = useContext(ChatContext);

  const handleClick = async(receiverId)=>{
    console.log('Clicking')
    
    try {
      const {data} = await axios.post(`https://am-chat-app-api.onrender.com/chat/create` , {
        senderId:user._id,
        receiverId:receiverId
      });
      
      // if(!chats.some(chat => chat._id === data._id)){
      //   setCurrentChat(data);
      //   setChats([data , ...chats]);
      // }

      if (data) {
        let restChats = [];
        restChats = chats.filter((c) => c?._id !== data[0]?._id);
        const isChatExist = chats.find(c => c?._id === data[0]?._id);

        if(!isChatExist){
          dispatch(getAllChatSuccess([data, ...restChats]));
          setCurrentChat(data)
        }else{
          dispatch(getAllChatSuccess([...chats]));
          setCurrentChat(data[0]);
        }
      }
    } catch (error) {
      console.log(error);
      errorNotify('Somethin Went Wrong!');
    }
  }
  return (
    <Box
      sx={{
        borderleft: "1px solid #f5f5f5",
      }}
    >
      <Box sx={{ padding: "0 1rem" }}>
        <TextField label="Search user" variant="standard" fullWidth />
      </Box>

      <List
        className="chat-users"
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "100%",
          maxHeight: "calc(100vh - 240px)",
          overflowY: "scroll",
        }}
      >
        {onlineUsers.filter(i => i._id !== user._id).map((user) => (
          <ListItem key={user._id} sx={{ cursor: "pointer" }} onClick={() => handleClick(user._id)}>
            <ListItemAvatar sx={{ position: "relative" }}>
              {user?.profilePicture ? (
                <Avatar
                  src={`data:image/png;base64,${convertToBase64(
                    user?.profilePicture.data
                  )}`}
                />
              ) : (
                <Avatar>
                  <ImageIcon />
                </Avatar>
              )}
              <span className="online-beep"></span>
            </ListItemAvatar>
            <ListItemText
              primary={user?.firstName + " " + user?.lastName}
              secondary={user?.email}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActiveChats;
