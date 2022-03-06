import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// Components:
import Sinlog from "./components/sinlog/sinlog.component";
import { motion } from "framer-motion";
// Redux:
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { selectIsLoggedIn } from "./redux/user/user.selector";

// Pages:
import AboutPage from "./pages/about/aboutpage.component";
import AppPage from "./pages/app/apppage.component";
import HomePage from "./pages/home/homepage.component";

function App() {
  return (
    <div className="App">
      <motion.div className="alert"></motion.div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/login" element={<Sinlog />} />
      </Routes>
    </div>
  );
}

export default App;
