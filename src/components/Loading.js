import React, { useEffect } from "react";
import styled from "styled-components";

const Loading = () => {
  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    for (let i = 0; i < dots.length; i++) {
      const delay = (i + 1) * 50;
      setTimeout(() => {
        dots[i].classList.add("show");
      }, delay);
    }
  });

  return (
    <Wrapper>
      <span className="dot">L</span>
      <span className="dot">o</span>
      <span className="dot">a</span>
      <span className="dot">d</span>
      <span className="dot">i</span>
      <span className="dot">n</span>
      <span className="dot">g</span>
    </Wrapper>
  );
};

const Wrapper = styled.p`
  z-index: 2;
  position: relative;
  width: fit-content;
  margin: 3rem 0 5rem;
  font-size: 3rem;
  font-weight: 700;
  display: flex;
  .dot {
    border-radius: 50%;
    text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.5);
    display: none;
    &:nth-of-type(1) {
      color: rgb(215, 210, 255);
    }
    &:nth-of-type(2) {
      color: rgb(215, 210, 255);
    }
    &:nth-of-type(3) {
      color: rgb(235, 243, 200);
    }
    &:nth-of-type(4) {
      color: rgb(235, 243, 200);
    }
    &:nth-of-type(5) {
      color: rgb(235, 243, 200);
    }
    &:nth-of-type(6) {
      color: rgb(200, 220, 255);
    }
    &:nth-of-type(7) {
      color: rgb(200, 220, 255);
    }
  }
  .show {
    display: block;
  }
`;

export default Loading;
