import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogoutDialog() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const getUserDetails = () => {
    const cookieUserId = Cookies.get("user_id");
    console.log(cookieUserId);
    axios
      .get(`api/users/${cookieUserId}`)
      .then((res) => {
        // console.log(res);
        const username = res.data.result.username;
        cookieUserId && setUserId(cookieUserId);
        setUsername(username);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpen = () => {
    getUserDetails();
    setOpen(true);
  };

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        // console.log(res);
        setOpen(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} size="large">
        <AccountCircleIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-logout-dialog-title"
        aria-describedby="user-logout-dialog-description"
      >
        <DialogTitle id="user-logout-dialog-title">
          {"User Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="user-logout-dialog-description">
            {`Username: ${username}, User ID: ${userId}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
