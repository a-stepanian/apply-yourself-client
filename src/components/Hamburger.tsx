import React from "react";
import styled from "styled-components";

export const Hamburger = ({ isDropdownOpen, toggleDropdown }) => {
  return (
    <Wrapper onClick={() => toggleDropdown()}>
      <div className={isDropdownOpen ? "line top top-open" : "line top"} />
      <div className={isDropdownOpen ? "line bottom bottom-open" : "line bottom"} />
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.button`
  z-index: 2;
  position: relative;
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  .line {
    position: absolute;
    width: 2rem;
    height: 1.5px;
    background-color: black;
    transition: 0.6s;
  }
  .top {
    top: 0.5rem;
  }
  .bottom {
    top: 1.3rem;
  }
  .top-open {
    top: 1rem;
    transform: rotate(45deg);
  }
  .bottom-open {
    top: 1rem;
    transform: rotate(-45deg);
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
