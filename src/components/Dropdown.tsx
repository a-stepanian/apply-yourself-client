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
        <DarkModeButton
          theme={theme}
          toggleDarkMode={() => {
            toggleDarkMode();
            // setTimeout(() => {
            //   toggleDropdown();
            // }, 500);
          }}
        />
        <Link to="/jobs" className="logo page-link" onClick={() => toggleDropdown()}>
          Jobs
        </Link>
        <Link to="/companies" className="logo page-link" onClick={() => toggleDropdown()}>
          Companies
        </Link>
        <Link to="/about" className="logo page-link" onClick={() => toggleDropdown()}>
          About
        </Link>
        {loggedIn ? (
          <>
            <Link to="/dashboard" className="logo page-link" onClick={() => toggleDropdown()}>
              Dashboard
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/register" onClick={() => toggleDropdown()}>
              <span>Register</span>
            </Link>
            <Link to="/login" onClick={() => toggleDropdown()}>
              <span>Login</span>
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
  width: 100%;
  z-index: 99;

  nav {
    position: fixed;
    top: 48px;
    left: 0;
    width: 100%;
    height: calc(100vh - 48px);
    padding: 48px 12px;
    box-shadow: 0 0 50px black;
    background: ${({ theme }) =>
      theme.name === "darkMode" ? `linear-gradient( ${theme.color1}, ${theme.color3})` : theme.primaryBackgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.7s ease-out;
    transform: translateY(calc(-100vh - 300px));
    opacity: 1;
    a {
      font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.6rem" : "2rem")};
      padding: 0.3rem;
      margin-top: ${({ theme }) => (theme.name === "darkMode" ? "1rem" : "1.3rem")};
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
