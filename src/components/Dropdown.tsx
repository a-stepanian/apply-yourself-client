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
          </>
        )}
      </nav>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;

  nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 15rem;
    background-color: var(--white);
    box-shadow: 2px 2px 5px var(--beige2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: 0.4s;
    transform: translateY(-15rem);
    a {
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
