import React, { useEffect } from "react";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";
import { Link } from "react-router-dom";

const HeroPage = () => {
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
      <img src="hero.svg" alt="Happy employees collaborating at work." />
      <Link to="/register" className="register">
        Sign up for a free account
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  padding: 1rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-top: 5rem;
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
  img {
    width: 100%;
  }

  .register {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 4rem;
    margin: 4rem 0;
    border: 2px solid rgba(0, 0, 0, 0.7);
    border-radius: 2rem;
    background: linear-gradient(
      rgba(215, 210, 255, 0.8),
      rgba(235, 243, 200, 0.8),
      rgba(200, 220, 255, 0.8)
    );
    color: black;
    font-weight: 700;
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: hover 1.2s infinite;
    @keyframes hover {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-3px);
        box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.15);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  @media (min-width: 460px) {
    .dot {
      font-size: 5rem;
    }
  }

  @media (min-width: 560px) {
    height: 130vh;
    .dot {
      font-size: 6rem;
    }
    img {
      width: 60%;
    }
  }
`;

export default HeroPage;
