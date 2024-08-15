import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

export const Hamburger = () => {
  const { isDropdownOpen, toggleDropdown } = useAppContext();
  return (
    <Wrapper onClick={() => toggleDropdown()} title="Navigation Menu">
      <div className="hamburger-wrapper">
        <div className={isDropdownOpen ? "line top top-open" : "line top"}></div>
        <div className={isDropdownOpen ? "line bottom bottom-open" : "line bottom"}></div>
      </div>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.button`
  margin-right: 0.5rem;
  background-color: transparent;
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  border-radius: 5px;
  &:hover {
    border-color: ${({ theme }) => theme.color1};
  }
  .hamburger-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    .line {
      position: absolute;
      width: 1.3rem;
      height: 1.5px;
      background-color: ${({ theme }) => theme.color1};
      transition: height 0.4s linear, width 0.4s linear, transform 0.4s linear, top 0.4s linear;
    }
    .top {
      top: 20px;
    }
    .bottom {
      top: 25px;
    }
    .top-open {
      top: 22px;
      width: 0.9rem;
      transform: rotate(45deg);
    }
    .bottom-open {
      top: 22px;
      width: 0.9rem;
      transform: rotate(-45deg);
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
