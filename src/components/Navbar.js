import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  RiFolderChartLine,
  RiFolderOpenLine,
  RiLoginBoxLine,
  RiUserAddLine,
  RiUserLine,
} from "react-icons/ri";
import Hamburger from "./Hamburger";
import LogoutButton from "./LogoutButton";

const Navbar = ({ isDropdownOpen, toggleDropdown }) => {
  const { loggedIn, user } = useContext(AuthContext);

  return (
    <>
      <Wrapper className="navbar">
        <Link to="/" className="logo">
          <h1>Apply Yourself</h1>
        </Link>
        <Hamburger
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        {loggedIn && (
          <>
            <div className="links">
              <Link to="/applications">
                <span>My Applications</span>
                <RiFolderOpenLine className="icon" />
              </Link>
              <div className="divider" />
              <Link to="/dashboard">
                <span>My Dashboard</span>
                <RiFolderChartLine className="icon" />
              </Link>
              <div className="divider" />
              <div
                className="username"
                onMouseEnter={() =>
                  document
                    .querySelector(".logout-btn-wrapper")
                    .classList.add("slide-in")
                }
                onMouseLeave={() =>
                  document
                    .querySelector(".logout-btn-wrapper")
                    .classList.remove("slide-in")
                }
              >
                <span>{user.username}</span>
                <RiUserLine className="icon" />
              </div>
              <div
                className="logout-btn-wrapper"
                onMouseEnter={() =>
                  document
                    .querySelector(".logout-btn-wrapper")
                    .classList.add("slide-in")
                }
                onMouseLeave={() =>
                  document
                    .querySelector(".logout-btn-wrapper")
                    .classList.remove("slide-in")
                }
              >
                <LogoutButton />
              </div>
            </div>
          </>
        )}
        {!loggedIn && (
          <div className="links">
            <Link to="/register">
              <span>Register</span>
              <RiUserAddLine className="icon" />
            </Link>
            <div className="divider" />
            <Link to="/login">
              <span>Login</span>
              <RiLoginBoxLine className="icon" />
            </Link>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.nav`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 3rem;
  background-color: var(--main-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  .logo {
    padding-left: 0.5rem;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
    h1 {
      font-weight: 400;
      color: black;
    }
  }
  .divider,
  .links > a,
  .logout-btn-wrapper {
    display: none;
  }
  .links {
    display: none;
  }

  @media (min-width: 768px) {
    .links {
      position: relative;
      z-index: 3;
      display: flex;
      justify-content: flex-end;
      height: 3rem;
    }
    .divider {
      display: block;
      width: 0.05rem;
      height: 2rem;
      margin: 0 0.5rem;
      background-color: black;
      transform: translateY(0.5rem);
    }
    .links > a,
    .username {
      font-size: 0.9rem;
      font-weight: 500;
      position: relative;
      z-index: 3;
      display: block;
      color: black;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-right: 0.5rem;
      }
      .icon {
        font-size: 1.2rem;
      }
    }
    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    .username {
      padding-right: 0.5rem;
    }
    .logout-btn-wrapper {
      z-index: 5;
      position: absolute;
      display: block;
      top: 2rem;
      right: -4rem;
      transition: 0.5s;
    }
    .slide-in {
      right: 0;
    }
  }
`;

export default Navbar;
