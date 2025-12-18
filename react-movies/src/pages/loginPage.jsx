import { useContext, useState } from "react";
import { Navigate, useLocation, Link as RouterLink } from "react-router";
import { AuthContext } from "../contexts/authContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  Stack,
} from "@mui/material";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const location = useLocation();
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  const login = async () => {
    setErr("");
    if (!userName || !password) {
      setErr("Enter username and password.");
      return;
    }
    try {
      await context.authenticate(userName, password);
      // если не залогинилось — покажем ошибку
      if (!window.localStorage.getItem("token")) {
        setErr("Login failed. Check username/password.");
      }
    } catch (e) {
      setErr(e?.message || "Login failed.");
    }
  };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  return (
    <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
            Log in to access protected pages (Favorites / Watchlist / Profile).
          </Typography>

          {err && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {err}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              fullWidth
            />

            <Button variant="contained" onClick={login} size="large">
              Log in
            </Button>

            <Typography variant="body2">
              Not registered?{" "}
              <Link component={RouterLink} to="/signup">
                Sign up
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
