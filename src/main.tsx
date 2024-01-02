// src/Main.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import "./App.css";

const Main: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Posts />
      </div>
    </div>
  );
};

export default Main;
