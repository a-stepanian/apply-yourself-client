import React, { useEffect } from "react";
import styled from "styled-components";

const Loading = () => {
  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    for (let i = 0; i < dots.length; i++) {
      const delay = (i + 1) * 40;
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
  width: fit-content;
  margin: 3rem 0 20rem;
  font-size: 2rem;
  .dot {
    display: none;
  }
  .show {
    display: inline;
  }
`;

export default Loading;
