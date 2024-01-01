// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import "./App.css"; // Add any global styles if needed

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Posts />
      </div>
    </div>
  );
};

export default App;
