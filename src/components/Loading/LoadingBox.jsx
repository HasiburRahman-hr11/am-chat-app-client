import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingBox = () => {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingBox;
