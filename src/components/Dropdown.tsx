import React from "react";
// @ts-ignore
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { RiFolderChartLine, RiFolderOpenLine, RiFolderAddLine, RiUserAddLine, RiLoginBoxLine } from "react-icons/ri";
import { useAppContext } from "../context/AppContext";
import { DarkModeButton } from "./DarkModeButton";

interface IDropdownProps {
  theme: any;
  toggleDarkMode: any;
}

export const Dropdown = (props: IDropdownProps) => {
  const { theme, toggleDarkMode } = props;
  const { loggedIn, isDropdownOpen, toggleDropdown } = useAppContext();
  return (
    <Wrapper>
      <nav className={isDropdownOpen ? "open" : ""}>
        <Link to="/jobs" className="logo page-link" onClick={() => toggleDropdown()}>
          Job Listings
        </Link>
        {loggedIn ? (
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
        ) : (
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
        <DarkModeButton theme={theme} toggleDarkMode={() => toggleDarkMode()} />
      </nav>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 99;

  nav {
    position: fixed;
    top: 48px;
    left: 0;
    width: 100%;
    height: calc(100vh - 48px);
    padding: 48px 12px;
    background: ${({ theme }) =>
      theme.name === "darkMode" ? `linear-gradient( ${theme.color1}, ${theme.color3})` : theme.bodyBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.5s ease-out;
    transform: translateY(calc(-100vh - 300px));
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
