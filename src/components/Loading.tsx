import React, { useEffect } from "react";
import styled from "styled-components";

export const Loading = () => {
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
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.p`
  z-index: 2;
  position: relative;
  width: fit-content;
  margin: 3rem 0 5rem;
  font-size: 3rem;
  font-weight: 100;
  display: flex;
  .dot {
    text-shadow: 2px 3px 1px rgba(0, 0, 0, 0.3);
    display: none;
  }
  .show {
    display: block;
  }
`;
