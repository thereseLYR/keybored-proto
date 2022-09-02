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
        Register
      </Typography>
      <Typography variant="caption" component="h1" textAlign="center">
        Create an account to have more features in keybored
      </Typography>
    </Box>
  );
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = () => {
    axios
      .post("/api/register", { username: username, password: password })
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
        <MainTitle />
        <TextField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          onClick={handleRegistration}
          disabled={!(username.length && password.length)}
        >
          Register
        </Button>
        <Link href="/login" textAlign="center">
          Already have an account? Click here to login!
        </Link>
      </Stack>
    </Container>
  );
}
