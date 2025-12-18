import { useContext, useMemo, useState } from "react";
import { Navigate, Link as RouterLink } from "react-router";
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
  Chip,
} from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const passwordRegEx = useMemo(
    () => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    []
  );

  const register = async () => {
    setErr("");
    setOk("");

    const validPassword = passwordRegEx.test(password);

    if (!userName) {
      setErr("Username is required.");
      return;
    }
    if (!validPassword) {
      setErr("Password must be 8+ chars and include letter, number, and one of @$!%*#?& (no _).");
      return;
    }
    if (password !== passwordAgain) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      const result = await context.register(userName, password);
      if (!result) {
        setErr("Register failed (username exists?)");
        return;
      }
      setOk("Account created! Redirecting to login…");
      setRegistered(true);
    } catch (e) {
      setErr(e?.message || "Register error.");
    }
  };

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 520 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Create account
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            <Chip size="small" label="8+ chars" />
            <Chip size="small" label="Letter + number" />
            <Chip size="small" label="One of @$!%*#?&" />
          </Stack>

          {err && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {err}
            </Alert>
          )}
          {ok && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {ok}
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
              autoComplete="new-password"
              fullWidth
            />
            <TextField
              label="Password again"
              type="password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              autoComplete="new-password"
              fullWidth
            />

            <Button variant="contained" onClick={register} size="large">
              Register
            </Button>

            <Typography variant="body2">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
