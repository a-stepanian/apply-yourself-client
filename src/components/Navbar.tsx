import { Link } from "react-router-dom";
// @ts-ignore
import styled from "styled-components";
import { Hamburger } from "./Hamburger";
import { useAppContext } from "../context/AppContext";
import { UserDropdownButton } from "./UserDropdownButton";
import { UserDropdownMenu } from "./UserDropdownMenu";

export const Navbar = () => {
  const { loggedIn } = useAppContext();

  return (
    <>
      <UserDropdownMenu />
      <Wrapper className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/logo512.png" width={50} height={40} alt="" />
            <h1>
              Apply
              <br />
              Yourself
            </h1>
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/jobs" className="nav-link">
            <span>Jobs</span>
          </Link>
          <Link to="/companies" className="nav-link">
            <span>Companies</span>
          </Link>
        </div>
        <Hamburger />
        <div className="nav-right">
          {loggedIn && <UserDropdownButton />}
          {!loggedIn && (
            <>
              <Link to="/login" className="nav-link">
                <span>Login</span>
              </Link>
              <Link to="/register" className="register-link">
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
        <div className="bottom-border"></div>
      </Wrapper>
    </>
  );
};

// @ts-ignore
const Wrapper = styled.nav`
  z-index: 100;
  position: sticky;
  top: 0;
  height: 59px;
  padding-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bodyBackground};
  .nav-left {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    .logo {
      text-decoration: none;
      display: flex;
      align-items: center;
      &:hover {
        text-decoration: none;
      }
      img {
        display: none;
      }
      h1 {
        margin-top: 4px;
        line-height: 15px;
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "0.9rem" : "1rem")};
        font-weight: ${({ theme }) => (theme.name === "darkMode" ? "500" : "700")};
        color: ${({ theme }) => theme.color1};
      }
    }
  }
  .nav-center,
  .nav-right {
    display: none;
  }
  .bottom-border {
    position: absolute;
    z-index: 90;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => `linear-gradient(90deg, ${theme.color1}, ${theme.color3})`};
  }

  @media (min-width: 480px) {
    .nav-left .logo img {
      display: block;
      border-radius: 20%;
      margin-right: 2px;
    }
  }

  @media (min-width: 768px) {
    transition: 0.2s linear;
    background-color: ${({ theme }) => theme.bodyBackground};
    .nav-left {
      width: 200px;
    }
    .nav-center {
      display: flex;
      justify-content: center;
      flex-grow: 1;
      height: 100%;
      .nav-link {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.color2};
        padding: 0 0.5rem;
        margin-right: 1rem;
        text-decoration: none;
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "0.9rem" : "1.1rem")};
        font-weight: ${({ theme }) => (theme.name === "darkMode" ? "500" : "700")};
        &:hover {
          text-decoration: underline;
        }
        &:nth-last-of-type() {
          margin-right: 0;
        }
      }
    }
    .nav-right {
      display: flex;
      justify-content: flex-end;
      height: 100%;
      width: 200px;
      .nav-link {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.color3};
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "0.9rem" : "1.1rem")};
        font-weight: ${({ theme }) => (theme.name === "darkMode" ? "500" : "700")};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      .register-link {
        margin: 6px 1rem 6px;
        border: 1px solid ${({ theme }) => theme.color3};
        border-radius: ${({ theme }) => theme.primaryBorderRadius};
        color: ${({ theme }) => theme.color3};
        span {
          font-size: ${({ theme }) => (theme.name === "darkMode" ? "0.8rem" : "0.9rem")};
          font-weight: ${({ theme }) => (theme.name === "darkMode" ? "500" : "900")};
        }
        padding: 1rem;
        text-decoration: none;
        display: flex;
        align-items: center;
        &:hover {
          text-decoration: none;
          background-color: ${({ theme }) => (theme.name === "darkMode" ? theme.color3 : theme.color2)};
          color: ${({ theme }) => theme.bodyBackground};
        }
      }
    }
  }
`;
