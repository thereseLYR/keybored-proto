import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import axios from "axios";

const Logo = () => {
  return (
    <Box>
      <Typography variant="h1" component="h1" textAlign="center">
        KeyBored
      </Typography>
      <Typography variant="h3" component="h1" textAlign="center">
        Login
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
      .post("/login", { username: username, password: password })
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
    <Container maxWidth="sm" className="keybored-logo">
      <Stack gap={2}>
        <Logo />
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
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Link href="/register" textAlign="center">
          Don't have an account? Click here to register
        </Link>
      </Stack>
    </Container>
  );
}
