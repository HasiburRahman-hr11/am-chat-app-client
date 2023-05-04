import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingBox from "../components/Loading/LoadingBox";
import convertToBase64 from "../utils/convertToBase64";
const Profile = () => {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `https://am-chat-app-api.onrender.com/user/get-user/${params.userId}`
        );
        setUser(data);
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
          <Container>
            <Box
              component="div"
              sx={{
                padding: "20px 20px",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h5"
                component="h6"
                sx={{ padding: "15px 0", textAlign: "center", mb: "40px" }}
              >
                {user.firstName + " " + user.lastName}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    {user?.profilePicture ? (
                      <img
                        src={`data:image/png;base64,${convertToBase64(
                          user?.profilePicture.data
                        )}`}
                        alt={user.firstName}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={`https://eu.ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=250`}
                        alt=""
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <Typography variant="h6" component="h6" sx={{ mb: "10px" }}>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Role: {user.role}
                  </Typography>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "30px",
                }}
              >
                <Link to={`/profile/edit-profile/${user._id}`}>
                  <Button
                    sx={{
                      backgroundColor: "#9c27b0",
                      color: "#fff",
                      padding: "6px 10px",
                      "&:hover": {
                        backgroundColor: "#7B1FA2",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Link>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Profile;
