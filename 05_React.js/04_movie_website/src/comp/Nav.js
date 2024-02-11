import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
const Nav = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <div className="header_container">
      <div className="contant">
        <div className="logo">
          <img src="./img/logo5.png" alt="logo" title="logo"></img>
        </div>
        <ul>
          <li>
            <Link to="/home" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              Movie
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              Tv Shows
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              contact
            </Link>
          </li>
        </ul>
        <div className="auth">
          {isAuthenticated ? (
            <div className="login">
              <div className="login_logo">
                <FiLogOut />
              </div>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="login">
              <div className="login_logo">
                <FiLogIn />
              </div>
              <button onClick={() => loginWithRedirect()}>Login</button>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <div className="user">
            <div className="user_name_logo">
              <FaRegUserCircle />
            </div>
            <div className="user_detail">
              <p>Hello,{user.name} </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
