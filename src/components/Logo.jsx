import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboredLogo from "../assets/keyboard-96-web-left.svg";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="keybored__logo">
      <img
        src={KeyboredLogo}
        alt="keybored-logo.svg"
        onClick={() => navigate("/")}
      ></img>
    </div>
  );
};

export default Logo;
