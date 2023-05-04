import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, CircularProgress } from "@mui/material";
import Header from "../components/Header/Header";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import convertToBase64 from "../utils/convertToBase64";
import LoadingBox from "../components/Loading/LoadingBox";
import { errorNotify, successNotify } from "../utils/toastify";
import { UserContext } from "../context/user-context/userContext";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [base64Thumb, setBase64Thumb] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const setuserData = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);

    if (data?.profilePicture) {
      setBase64Thumb(convertToBase64(data.profilePicture.data));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        `https://am-chat-app-api.onrender.com/admin/user/edit-user/${params.userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data) {
        setuserData(data);
        setLoading(false);
        successNotify("Profile updated successfully");
      } else {
        errorNotify("Something went wrong!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorNotify("Something went wrong!");
    }
  };

  const handleUploadPicture = (e) => {
    setBase64Thumb("");
    setProfilePicturePreview(URL.createObjectURL(e.target.files[0]));
    setProfilePicture(e.target.files[0]);
  };

  const handleRemovePicture = () => {
    setBase64Thumb("");
    setProfilePicture(null);
    setProfilePicturePreview(null);
  };

  useEffect(() => {
    if (user._id !== params.userId) {
      navigate("/");
      errorNotify("You cannot perform this action.");
    }
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `https://am-chat-app-api.onrender.com/user/get-user/${params.userId}`
        );
        setuserData(data);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
        setLoadingUser(false);
      }
    };
    if (params.userId) {
      getUser();
    }
  }, [params.userId]);

  return (
    <>
      <Header />
      {loadingUser ? (
        <LoadingBox />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            marginTop: "100px",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              maxWidth: "700px",
              margin: "0 auto",
              padding: "30px 30px",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <Box
                sx={{
                  maxWidth: "400px",
                  margin: "0 auto 60px auto",
                  textAlign: "center",
                }}
              >
                <Box component="div">
                  {base64Thumb ? (
                    <img
                      src={`data:image/png;base64,${base64Thumb}`}
                      alt="Thumbnail"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        margin: "0 auto",
                        display: "blocks",
                      }}
                    />
                  ) : (
                    <img
                      src={
                        profilePicturePreview
                          ? profilePicturePreview
                          : "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                      }
                      alt="Thumbnail"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        margin: "0 auto",
                        display: "blocks",
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                  {profilePicture || base64Thumb ? (
                    <Button variant="contained" onClick={handleRemovePicture}>
                      Remove
                    </Button>
                  ) : (
                    <Button
                      component="label"
                      sx={{
                        background: "#C6D9F8",
                      }}
                    >
                      Profile Picture
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleUploadPicture(e)}
                      />
                    </Button>
                  )}
                </Box>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    type="email"
                    name="email"
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>

              </Grid>

              <Box sx={{ mt: "20px", textAlign: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ padding: "10px 20px", minWidth: "150px" }}
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
                    "Update"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditProfile;
