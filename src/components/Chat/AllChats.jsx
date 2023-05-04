
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";

import Chat from "./Chat";
import { useContext } from "react";
import { ChatContext } from "../../context/chatContext/chatContext";


const AllChats = ({  setCurrentChat}) => {

  const {chats , loadingChats} = useContext(ChatContext);
  
  return (
    <Box
      sx={{
        borderRight: "1px solid #f5f5f5",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          mb: "15px",
          mt: "20px",
        }}
      >
        Chat List
      </Typography>
      <Box sx={{ padding: "0 1rem" }}>
        <TextField label="Search user" variant="standard" fullWidth />
      </Box>

      {loadingChats ? (
        <Box>
          <Typography sx={{textAlign:'center', mt:'20px'}}>Loading Chats...</Typography>
        </Box>
      ) : (
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
          {chats.length > 0 ? (
            <>
            {chats.map((chat , ind) => (
            <Chat key={ind} chat={chat} setCurrentChat={setCurrentChat} />
          ))}
            </>
          ) : (
            <Typography sx={{
              textAlign:'center',
              padding:'20px 10px'
            }}>You chatlist is empty.</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default AllChats;
