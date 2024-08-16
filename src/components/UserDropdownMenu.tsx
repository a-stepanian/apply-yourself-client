import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { RiFolderChartLine, RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { OutsideClickDetector } from "./OutsideClickDetector";
import { PiBriefcase } from "react-icons/pi";

export const UserDropdownMenu = () => {
  const { toggleUserDropdown, isUserDropdownOpen, logoutUser } = useAppContext();
  return (
    <Wrapper>
      <OutsideClickDetector onOutsideClick={() => toggleUserDropdown()} activated={isUserDropdownOpen}>
        <nav className={isUserDropdownOpen ? "open" : ""}>
          <Link to="/dashboard" onClick={toggleUserDropdown}>
            <RiFolderChartLine className="icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/dashboard" onClick={toggleUserDropdown}>
            <PiBriefcase className="icon" />
            <span>Saved Jobs</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              logoutUser();
              toggleUserDropdown();
            }}>
            <RiLogoutBoxRLine className="icon" />
            <span>Logout</span>
          </button>
        </nav>
      </OutsideClickDetector>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  position: relative;
  z-index: 100;
  nav {
    box-shadow: 0 0 15px ${({ theme }) => theme.color1};
    border: 1px solid ${({ theme }) => (theme.name === "darkMode" ? theme.primaryBackgroundColor : theme.color1)};
    border-radius: 3px;
    position: fixed;
    z-index: 70;
    top: 48px;
    right: 6px;
    padding: 12px 12px 1rem;
    background: ${({ theme }) =>
      theme.name === "darkMode" ? `linear-gradient( ${theme.color1}, ${theme.color3})` : theme.primaryBackgroundColor};
    display: flex;
    flex-direction: column;
    transition: transform 0.5s ease-out;
    transform: translateY(-300px);
    a,
    button {
      background-color: transparent;
      border: none;
      padding: 0;
      color: black;
      text-decoration: none;
      display: flex;
      align-items: center;
      font-family: ${({ theme }) => theme.primaryFont};
      font-size: 1rem;
      margin-top: 0.5rem;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      .icon {
        margin-right: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
  .open {
    transform: translateY(18px);
  }
`;
