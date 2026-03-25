import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DetectDisease from "./pages/DetectDisease";
import Community from "./pages/community";
import Profile from "./pages/Profile";
import AgriBot from "./pages/AgriBot";
import About from "./pages/About"; // ✅ VERY IMPORTANT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detect" element={<DetectDisease />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bot" element={<AgriBot />} />
        <Route path="/about" element={<About />} /> ✅ {/* THIS FIXES LEARN MORE */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
