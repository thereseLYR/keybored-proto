import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo.jsx";

const MainTitle = () => {
  return (
    <Box>
      <Typography variant="h3" component="h1" textAlign="center">
        Login
      </Typography>
      <Typography variant="caption" component="h1" textAlign="center">
        Login with existing account
      </Typography>
    </Box>
  );
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("/api/login", { username: username, password: password })
      .then((res) => {
        console.log(res);
        // setUser?
        // reset username and password from state
        setUsername("");
        setPassword("");
        navigate("/keybored");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm" id="keybored-login-container">
      <Stack gap={2}>
        <div id="div-spacing-login"></div>
        <Logo />
        <MainTitle />
        <TextField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={!(username.length && password.length)}
        >
          Login
        </Button>
        <Link href="/register" textAlign="center">
          Don't have an account? Click here to register
        </Link>
      </Stack>
    </Container>
  );
}
