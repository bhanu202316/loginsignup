import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./auth/signup";
import Login from "./auth/login";
import Persona from "./person";
import StartingPage from "./starting_page";

export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/persona" element={<Persona />} /> 
      </Routes>
    </Router>
  );
}
