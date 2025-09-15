import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "../../components/Home";
import Login from "./Login";
import Register from "./Register";

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
    </Routes>
  )
}

export default CommonRoutes
