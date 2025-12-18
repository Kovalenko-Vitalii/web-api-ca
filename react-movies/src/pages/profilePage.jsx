import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router";
import { Box, Card, CardContent, Typography, Button, Stack, Alert } from "@mui/material";

const ProfilePage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context.isAuthenticated) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center", px: 2 }}>
        <Card sx={{ width: "100%", maxWidth: 520 }}>
          <CardContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              You must log in to see your profile.
            </Alert>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center", px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 520 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Profile
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body1">
              Username: <b>{context.userName}</b>
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              (This is just a basic profile page for the CA demo.)
            </Typography>

            <Button variant="outlined" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
