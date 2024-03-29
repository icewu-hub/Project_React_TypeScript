// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Albums from "./components/Albums";
import Photos from "./components/Photos";
import Posts from "./components/Posts";
import Users from "./components/Users";
import Todos from "./components/Todos";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
