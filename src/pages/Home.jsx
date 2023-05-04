import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight:'100vh'
        }}
      >
        <Typography variant="h1" component="h1">
          This is Homepage
        </Typography>
      </Box>
    </>
  );
};

export default Home;
