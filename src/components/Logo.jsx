import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboredLogo from "../assets/keyboard-96-web-left.svg";

const Logo = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="keybored__logo">
      <img
        src={KeyboredLogo}
        alt="keybored-logo.svg"
        onClick={() => {
          Cookies.get("user_id") === undefined ? navigate("/") : handleLogout();
        }}
      ></img>
    </div>
  );
};

export default Logo;
