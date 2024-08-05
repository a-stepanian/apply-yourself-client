// @ts-ignore
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { RiFolderOpenLine, RiFolderChartLine, RiFolderAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { OutsideClickDetector } from "./OutsideClickDetector";

export const UserDropdownMenu = () => {
  const { toggleUserDropdown, isUserDropdownOpen } = useAppContext();
  return (
    <Wrapper>
      <OutsideClickDetector activated={isUserDropdownOpen}>
        <nav className={isUserDropdownOpen ? "open" : ""}>
          <Link to="/applications" onClick={toggleUserDropdown}>
            <span>View All</span>
            <RiFolderOpenLine className="icon" />
          </Link>
          <Link to="/dashboard" onClick={toggleUserDropdown}>
            <span>Dashboard</span>
            <RiFolderChartLine className="icon" />
          </Link>
          <Link to="/applications/new" onClick={toggleUserDropdown}>
            <span>Add An Application</span>
            <RiFolderAddLine className="icon" />
          </Link>
          <LogoutButton />
        </nav>
      </OutsideClickDetector>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  nav {
    box-shadow: 0 0 15px ${({ theme }) => theme.color1};
    border: 1px solid ${({ theme }) => (theme.name === "darkMode" ? theme.bodyBackground : theme.color1)};
    border-radius: 3px;
    position: fixed;
    z-index: 70;
    top: 48px;
    right: 6px;
    padding: 12px;
    background: ${({ theme }) =>
      theme.name === "darkMode" ? `linear-gradient( ${theme.color1}, ${theme.color3})` : theme.bodyBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.5s ease-out;
    transform: translateY(-300px);
    a {
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
    transform: translateY(6px);
  }
`;
