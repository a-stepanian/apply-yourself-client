import React from "react";
// @ts-ignore
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { RiFolderChartLine, RiFolderOpenLine, RiFolderAddLine, RiUserAddLine, RiLoginBoxLine } from "react-icons/ri";
import { useAppContext } from "../context/AppContext";

export const Dropdown = () => {
  const { loggedIn, isDropdownOpen, toggleDropdown } = useAppContext();
  return (
    <Wrapper>
      <nav className={isDropdownOpen ? "open" : ""}>
        {loggedIn && (
          <>
            <Link to="/jobs" className="logo page-link" onClick={() => toggleDropdown()}>
              Job Listings
            </Link>
            <Link to="/applications" onClick={() => toggleDropdown()}>
              <span>View All</span>
              <RiFolderOpenLine className="icon" />
            </Link>
            <Link to="/dashboard" onClick={() => toggleDropdown()}>
              <span>Dashboard</span>
              <RiFolderChartLine className="icon" />
            </Link>
            <Link to="/applications/new" onClick={() => toggleDropdown()}>
              <span>Add An Application</span>
              <RiFolderAddLine className="icon" />
            </Link>
            <LogoutButton />
          </>
        )}
        {!loggedIn && (
          <>
            <Link to="/register" onClick={() => toggleDropdown()}>
              <span>Register</span>
              <RiUserAddLine className="icon" />
            </Link>
            <Link to="/login" onClick={() => toggleDropdown()}>
              <span>Login</span>
              <RiLoginBoxLine className="icon" />
            </Link>
            <Link to="/jobs" className="logo page-link">
              Job Listings
            </Link>
          </>
        )}
      </nav>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  position: relative;
  z-index: 98;
  width: 100%;

  nav {
    position: fixed;
    top: 48px;
    left: 0;
    width: 100%;
    height: calc(100vh - 48px);
    background: linear-gradient(#3a5eff, #c024ff);
    /* background-color: var(--black); */
    /* box-shadow: 2px 2px 5px var(--beige2); */
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-evenly;
    transition: 0.4s;
    transform: translateY(-100vh);
    a {
      font-size: 1.6rem;
      padding: 0.2rem;
      color: black;
      text-decoration: none;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      span {
        margin-right: 0.5rem;
      }
      .icon {
        font-size: 1.2rem;
      }
    }
  }
  .open {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
export default Dropdown;
