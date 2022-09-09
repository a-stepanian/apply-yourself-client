import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  RiFolderChartLine,
  RiFolderOpenLine,
  RiFolderAddLine,
} from "react-icons/ri";
import Hamburger from "./Hamburger";

const Navbar = ({ isDropdownOpen, toggleDropdown }) => {
  return (
    <Wrapper className="navbar">
      <h1>Apply Yourself</h1>
      <Hamburger
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
      />
      <div className="divider" />
      <Link to="/applications">
        <span>View All</span>
        <RiFolderOpenLine className="icon" />
      </Link>
      <div className="divider" />
      <Link to="/dashboard">
        <span>Dashboard</span>
        <RiFolderChartLine className="icon" />
      </Link>
      <div className="divider" />
      <Link to="/applications/new">
        <span>Add An Application</span>
        <RiFolderAddLine className="icon" />
      </Link>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 4rem;
  padding: 1rem;
  background-color: var(--main-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-weight: 500;
  }
  .divider,
  a {
    display: none;
  }

  @media (min-width: 768px) {
    .divider {
      display: block;
      width: 0.05rem;
      height: 1.8rem;
      margin: 0 0.5rem;
      background-color: black;
    }
    h1,
    a {
      width: 25%;
    }
    a {
      display: block;
      color: black;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
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
`;
