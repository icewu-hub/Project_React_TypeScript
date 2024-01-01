// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./Navbar.css"; // Import the CSS file

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="nav-link" to="/">
            Main Page
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/albums">
            Albums
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/photos">
            Photos
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/todos">
            Todos
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
