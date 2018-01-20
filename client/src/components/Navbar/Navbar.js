import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props =>
  <nav className="navbar navbar-default navbar-fixed-top">
		<div className='container-fluid'>
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
        <img src={"/../../images/logo3.png"}style={{width:100, height:60,marginTop: -17}} />
        </Link>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li className={window.location.pathname === "/search" ? "active" : ""}>
          <Link to="/search">Explore</Link>
        </li>
        <li className={window.location.pathname === "/playgroup" ? "active" : ""}>
          <Link to="/playgroup">Playgroups</Link>
        </li>
        <li className={window.location.pathname === "/" ? "active" : ""}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
		</div>
  </nav>;

export default Navbar;
