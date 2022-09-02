import React from "react";
import { Route, Routes } from "react-router-dom";
import Keeb from "./components/keyboard/Keyboard.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Root from "./components/Root.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/keybored" element={<Keeb />} />
    </Routes>
  );
}
