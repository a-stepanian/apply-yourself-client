import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const HeroPage = () => {
  const { loggedIn } = useContext(AuthContext);
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
      <div className="register-wrapper">
        {loggedIn ? (
          <Link to="/dashboard" className="register">
            Continue to Dashboard
          </Link>
        ) : (
          <Link to="/register" className="register">
            Sign up for a free account
          </Link>
        )}
      </div>
      {!loggedIn && (
        <div className="login-wrapper">
          <p>
            Already have an account?
            <Link to="/login" className="login">
              Log In
            </Link>
          </p>
        </div>
      )}

      <img
        className="svg"
        src="hero.svg"
        alt="Happy employees collaborating at work."
      />
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
    width: 17rem;
    height: 8rem;
    margin: 5rem 0;
    text-align: center;
    font-size: 3.5rem;
    line-height: 3rem;
  }
  .dot,
  .space {
    margin-left: 1rem;
    position: relative;
    z-index: 1;
    font-family: "Josefin Slab", serif;
    display: none;
    letter-spacing: -1rem;
  }
  .show,
  .space {
    display: inline;
  }
  .svg {
    position: relative;
    z-index: 1;
    width: 100%;
    margin-bottom: 30vh;
  }

  .register {
    text-decoration: none;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 3rem;
    padding: 0 1.5rem;
    border: 2px solid rgba(0, 0, 0, 0.7);
    border-radius: 1.5rem;
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
  }
  .login-wrapper {
    margin-top: 1rem;
    margin-bottom: 2rem;
    p {
      font-size: 0.8rem;
      font-weight: 900;
    }
    .login {
      margin-left: 0.5rem;
    }
  }

  /* Media Queries */
  @media (min-width: 480px) {
    h1 {
      width: 100%;
      height: 4rem;
      margin: 5rem 0 3rem;
      font-size: 2.8rem;
    }
    .register-wrapper,
    .login-wrapper {
      animation: fadeIn 5s;
    }
    .register {
      animation: hover 1.2s infinite;
    }
  }

  @media (min-width: 768px) {
    h1 {
      width: 100%;
      margin: 25vh 0 40vh;
      font-size: 4.5rem;
      line-height: 4.5rem;
    }
    .register-wrapper,
    .login-wrapper {
      position: absolute;
      right: calc(50% - 20rem);
      width: 17rem;
      display: flex;
      justify-content: center;
    }
    .register-wrapper {
      top: 60vh;
    }
    .login-wrapper {
      color: rgba(0, 0, 0, 0.5);
      top: calc(60vh + 2.5rem);
    }
    .svg {
      max-width: 60rem;
    }
  }

  @media (min-width: 990px) {
    h1 {
      margin: 25vh 0 40vh;
      font-size: 5.5rem;
    }
    .register-wrapper,
    .login-wrapper {
      position: absolute;
      right: calc(50% - 20rem);
      width: 17rem;
      display: flex;
      justify-content: center;
    }
    .register-wrapper {
      top: 60vh;
    }
    .login-wrapper {
      color: rgba(0, 0, 0, 0.5);
      top: calc(60vh + 2.5rem);
    }
    .svg {
      max-width: 60rem;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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
`;

export default HeroPage;
