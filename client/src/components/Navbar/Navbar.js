import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ user }) => {
  return(
    <nav className="navbar">
      <div className="logo">LOGO</div>
      <div>
        {
          user && user._id ? <Link to="logout">Log Out</Link> : <Link to="login">Log In</Link>
        }
      </div>
    </nav>
  )
}

export default Nav;
