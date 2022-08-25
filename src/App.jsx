import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Keeb from "./components/keyboard.jsx";
import Login from "./components/login/Login.jsx";
import Root from "./components/Root.jsx";

export default function App() {
  // guest user will not have userId and sessionHash in cookies
  // TODO: protect routes on save music etc (keyboard actions)
  // const [userMode, setUserMode] = useState({ userId: "", sessionHash: "" });
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/keybored" element={<Keeb />} />
    </Routes>
  );
}
