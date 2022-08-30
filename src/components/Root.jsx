import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
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

const KeebsDialog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    navigate("/keybored");
  };

  return (
    <Box justifyContent="center" display="flex">
      <Button variant="outlined" onClick={handleClickOpen}>
        Play as Guest
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="warning-dialog-title"
        aria-describedby="warning-dialog-description"
      >
        <DialogTitle id="warning-dialog-title">{"Play as guest"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="warning-dialog-description">
            Limited features will be available to you when you play with a guest
            account. For more features select PLAY AS REGISTERED USER and
            register an account. Are you sure you want to continue playing as
            guest?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
        <KeebsDialog />
      </Stack>
    </Container>
  );
};

export default Home;
