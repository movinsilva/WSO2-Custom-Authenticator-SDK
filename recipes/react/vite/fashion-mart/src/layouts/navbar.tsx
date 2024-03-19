import React from "react";
import logo from "../assets/fashion-logo.png";
import {
  SignedIn,
  SignInButton,
  useAuthentication,
  UserButton,
} from "@asgardeo/react-ui";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthentication();

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="FashionMart Logo" />
        <span>Fashion Mart</span>
        <SignedIn>
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              `nav-links ${isActive ? "nav-links-active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              `nav-links ${isActive ? "nav-links-active" : ""}`
            }
          >
            Profile
          </NavLink>
        </SignedIn>
      </div>
      <div className="buttons">
        {isAuthenticated === true ? (
          <>
            <UserButton />
          </>
        ) : (
          <>
            <SignInButton />
            <button className="register-btn">Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
