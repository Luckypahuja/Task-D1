// ============================================================
// App.jsx - now SMALL. It only decides which component shows
// on which URL. All real UI code lives in src/components.
// ============================================================
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ScrollToHash from "./components/ScrollToHash";
import Pricing from "./components/Pricing";

function App() {
  return (
    <>
      <ScrollToHash />   {/* handles smooth scrolling to #sections */}
      <Navbar />         {/* fixed bar, visible on every page */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>

      <Footer />         {/* visible on every page */}
    </>
  );
}

export default App;
