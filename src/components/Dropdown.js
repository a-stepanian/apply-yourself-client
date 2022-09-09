import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  RiFolderChartLine,
  RiFolderOpenLine,
  RiFolderAddLine,
} from "react-icons/ri";

const Dropdown = ({ isDropdownOpen, toggleDropdown }) => {
  return (
    <Wrapper>
      <nav className={isDropdownOpen ? "open" : ""}>
        <Link to="/" onClick={() => toggleDropdown()}>
          <span>View All</span>
          <RiFolderOpenLine className="icon" />
        </Link>
        <Link to="/" onClick={() => toggleDropdown()}>
          <span>Dashboard</span>
          <RiFolderChartLine className="icon" />
        </Link>
        <Link to="/create" onClick={() => toggleDropdown()}>
          <span>Add An Application</span>
          <RiFolderAddLine className="icon" />
        </Link>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  nav {
    position: absolute;
    top: 4rem;
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
  } ;
`;
export default Dropdown;
