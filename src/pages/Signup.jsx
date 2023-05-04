import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import { UserContext } from "../context/user-context/userContext";
import { errorNotify, successNotify } from "../utils/toastify";

const textFieldStyle = {
  width: "100%",
  marginTop: "20px",
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      return alert("Please fill up the form correctly");
    }
    if (password.length < 5) {
      return alert("Password must be at least 5 charecters");
    }
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://am-chat-app-api.onrender.com/user/add-user",
        userData
      );
      if (data?.email) {
        console.log(data);
        setLoading(false);
        navigate("/signin");
        successNotify('Signup Successfull');
      } else {
        errorNotify('Internal server error!');
      }
    } catch (error) {
      errorNotify(error?.response?.data?.message || 'Somthing went wrong!');
      setLoading(false);
    }
  };

  if (user?.email) {
    navigate("/");
  }

  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          minHeight: "100vh",
          paddingTop: "30px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "450px",
            background: "#fff",
            padding: "30px 30px",
            borderRadius: "10px",
            margin: "0 auto",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "#1976D2",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Signup
          </Typography>

          <TextField
            sx={textFieldStyle}
            id="firstName"
            label="First Name"
            variant="outlined"
            autoComplete="false"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="lastName"
            label="Last Name"
            variant="outlined"
            autoComplete="false"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="email"
            label="Email"
            variant="outlined"
            autoComplete="false"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" sx={textFieldStyle}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              autoComplete="false"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Box sx={{ mt: "30px", textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ padding: "10px 20px", minWidth: "100px" }}
            >
              {loading ? (
                <CircularProgress
                  sx={{
                    color: "#fff",
                    width: "25px !important",
                    height: "25px !important",
                  }}
                />
              ) : (
                "Signup"
              )}
            </Button>
          </Box>

          <Typography
            variant="h6"
            component="h6"
            sx={{ mt: "30px", textAlign: "center" }}
          >
            Or <Link to="/signin">Signin</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
