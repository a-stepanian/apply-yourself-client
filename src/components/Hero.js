import React, { useEffect } from "react";
import styled from "styled-components";
import LineDesign from "./LineDesign";
import { BsBuilding } from "react-icons/bs";

const Hero = () => {
  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    for (let i = 0; i < dots.length; i++) {
      const delay = (i + 1) * 100;
      setTimeout(() => {
        dots[i].classList.add("show");
      }, delay);
    }
  });
  return (
    <Wrapper>
      <LineDesign />
      <BsBuilding className="smiley" />
      <h1>
        <span className="dot">L</span>
        <span className="dot">a</span>
        <span className="dot">n</span>
        <span className="dot">d</span>
        <span className="space"> </span>
        <span className="dot">y</span>
        <span className="dot">o</span>
        <span className="dot">u</span>
        <span className="dot">r</span>
        <span className="space"> </span>
        <span className="dot">d</span>
        <span className="dot">r</span>
        <span className="dot">e</span>
        <span className="dot">a</span>
        <span className="dot">m</span>
        <span className="space"> </span>
        <span className="dot">j</span>
        <span className="dot">o</span>
        <span className="dot">b</span>
        <span className="dot">.</span>
      </h1>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
  }
  .dot,
  .space {
    margin-left: 1rem;
    position: relative;
    z-index: 1;
    font-size: 4rem;
    font-family: "Josefin Slab", serif;
    display: none;
    letter-spacing: -1rem;
  }
  .show,
  .space {
    display: inline;
  }
  .smiley {
    position: absolute;
    opacity: 0.1;
    font-size: 15rem;
  }
  @media (min-width: 460px) {
    .dot {
      font-size: 5rem;
    }
  }
  @media (min-width: 560px) {
    .dot {
      font-size: 6rem;
    }
  }
`;

export default Hero;
