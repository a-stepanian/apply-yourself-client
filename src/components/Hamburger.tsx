import React from "react";
// @ts-ignore
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

export const Hamburger = () => {
  const { isDropdownOpen, toggleDropdown } = useAppContext();
  return (
    <Wrapper onClick={() => toggleDropdown()}>
      <div className="hamburger-wrapper">
        <div className={isDropdownOpen ? "line top top-open" : "line top"} />
        <div className={isDropdownOpen ? "line bottom bottom-open" : "line bottom"} />
      </div>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.button`
  margin-right: 0.5rem;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: 0.1s;
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
      transition: 0.6s;
    }
    .top {
      top: 13px;
    }
    .bottom {
      top: 21px;
    }
    .top-open {
      top: 1.1rem;
      width: 0.9rem;
      transform: rotate(45deg);
    }
    .bottom-open {
      top: 1.1rem;
      width: 0.9rem;
      transform: rotate(-45deg);
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
