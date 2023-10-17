import { Link } from "react-router-dom";
import React from "react";
import "./navStyle.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      
        <li>
          <Link to="/about">About</Link>
        </li>
        
        <li>
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;