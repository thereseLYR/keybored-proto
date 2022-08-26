import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("registered user click");
    navigate("/login");
  };

  return (
    <Box justifyContent="center" display="flex">
      <Button
        className="rootpage__button"
        variant="contained"
        onClick={handleClick}
      >
        Play as Registered User
      </Button>
    </Box>
  );
};

const KeebsButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("guest user click");
    navigate("/keybored");
  };

  return (
    <Box justifyContent="center" display="flex">
      <Button
        className="rootpage__button"
        variant="outlined"
        onClick={handleClick}
      >
        Play as Guest
      </Button>
    </Box>
  );
};

const Home = (props) => {
  console.log(props);
  return (
    <Container maxWidth="sm">
      <Stack gap={2}>
        {/* TODO: Replace header with SVG Logo */}
        <Typography variant="h1" component="h1" textAlign="center">
          KeyBored
        </Typography>
        <LoginButton />
        <KeebsButton />
      </Stack>
    </Container>
  );
};

export default Home;
