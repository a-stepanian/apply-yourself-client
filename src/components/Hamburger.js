import React from "react";
import styled from "styled-components";

const Hamburger = ({ isDropdownOpen, toggleDropdown }) => {
  return (
    <Wrapper onClick={() => toggleDropdown()}>
      <div className={isDropdownOpen ? "line top top-open" : "line top"} />
      <div
        className={isDropdownOpen ? "line bottom bottom-open" : "line bottom"}
      />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  position: relative;
  width: 2.5rem;
  height: 2rem;
  border: none;
  &:hover {
    cursor: pointer;
  }
  .line {
    position: absolute;
    width: 2.5rem;
    height: 0.05rem;
    background-color: black;
    transition: 0.7s;
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

export default Hamburger;
