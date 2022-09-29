import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const HeroPage = () => {
  const { loggedIn } = useContext(AuthContext);

  // Make hero letters appear with typing effect
  useEffect(() => {
    const dots = document.querySelectorAll(".dot");
    for (let i = 0; i < dots.length; i++) {
      const delay = (i + 1) * 80;
      setTimeout(() => {
        dots[i].classList.add("show");
      }, delay);
    }
  });

  //
  useEffect(() => {
    const handleScroll = () => {
      const scrollTarget0 = document.querySelectorAll(".scroll-target")[0];
      // get distance from the top of the viewport
      const distanceFromTop0 = scrollTarget0.getBoundingClientRect().top;
      if (distanceFromTop0 < 400) {
        const blueBlockTop = document.querySelector(".blue-block-top");
        blueBlockTop.classList.add("slide-left");
        const blueBlockBottom = document.querySelector(".blue-block-bottom");
        blueBlockBottom.classList.add("slide-right");
      }

      const scrollTarget1 = document.querySelectorAll(".scroll-target")[1];
      // get distance from the top of the viewport
      const distanceFromTop1 = scrollTarget1.getBoundingClientRect().top;
      if (distanceFromTop1 < 400) {
        const yellowBlockTop = document.querySelector(".yellow-block-top");
        yellowBlockTop.classList.add("slide-left");
        const yellowBlockBottom = document.querySelector(
          ".yellow-block-bottom"
        );
        yellowBlockBottom.classList.add("slide-right");
      }

      const scrollTarget2 = document.querySelectorAll(".scroll-target")[2];
      // get distance from the top of the viewport
      const distanceFromTop2 = scrollTarget2.getBoundingClientRect().top;
      if (distanceFromTop2 < 400) {
        const purpleBlockTop = document.querySelector(".purple-block-top");
        purpleBlockTop.classList.add("slide-left");
        const purpleBlockBottom = document.querySelector(
          ".purple-block-bottom"
        );
        purpleBlockBottom.classList.add("slide-right");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            Go To Your Dashboard
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
        className="main-svg"
        src="hero.svg"
        alt="Happy employees collaborating at work."
      />
      <div className="scroll-target" />
      <article className="hero hero1">
        <h2 className="info">Manage the application process</h2>
        <div className="blue-block-top block-top" />
        <p className="details">
          Getting a job can be difficult - managing the process shouldn't be.
        </p>
        <div className="svg-wrapper">
          <img
            className="hero1-svg svg"
            src="manage.svg"
            alt="Employee managing their application process."
          />
        </div>{" "}
        <div className="blue-block-bottom block-bottom" />
      </article>
      <div className="scroll-target" />
      <article className="hero hero2">
        <h2 className="info">Make the most of your time</h2>
        <div className="yellow-block-top block-top" />
        <p className="details">
          Spend more time focusing on your career and less time organizing your
          applications and interviews.
        </p>
        <div className="svg-wrapper">
          <img
            className="hero2-svg svg"
            src="time.svg"
            alt="Employee excerizing excellent time management."
          />
        </div>{" "}
        <div className="yellow-block-bottom block-bottom" />
      </article>

      <div className="scroll-target" />
      <article className="hero hero3">
        <h2 className="info">Gain valuable insights</h2>
        <div className="purple-block-top block-top" />
        <p className="details">
          Learn what works and what doesn't - see what companies respond to and
          leverage this information in your search.
        </p>
        <div className="svg-wrapper">
          <img
            className="hero3-svg svg"
            src="charts.svg"
            alt="Job application metrics visualized to help with your job search."
          />
        </div>{" "}
        <div className="purple-block-bottom block-bottom" />
      </article>
      <div className="register-wrapper-bottom">
        <Link to="/register" className="register">
          Get started for free today
        </Link>
      </div>

      <div className="spacer" />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  padding: 0 1rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    width: 17rem;
    height: 8rem;
    margin: 6rem 0;
    text-align: center;
    font-size: 3.5rem;
    line-height: 3rem;
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
  }

  .main-svg {
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 3rem 0 8rem;
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

  // Shared
  .hero {
    position: relative;
    margin: 7rem 0;
    .info {
      position: relative;
      z-index: 1;
      font-size: 2rem;
      margin: 1rem 0 2rem 1rem;
      font-family: "Josefin Slab", serif;
    }
    .block-top {
      position: absolute;
      top: 0;
      z-index: 0;
      width: 100vw;
      height: 6rem;
      transition: 1s;
      transform: translateX(110%);
    }
    .details {
      position: relative;
      z-index: 1;
      margin: 5rem 0 3rem 2rem;
      line-height: 2rem;
    }
    .svg-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        max-width: 40rem;
      }
    }
    .block-bottom {
      opacity: 0.5;
      position: absolute;
      bottom: 0;
      z-index: 0;
      width: 100vw;
      height: 2rem;
      transition: 1s;
      transform: translateX(-110%);
    }
    .slide-left {
      transform: translateX(0);
    }
    .slide-right {
      transform: translateX(-70%);
    }
  }

  // Manage the application process article
  .hero1 {
    .blue-block-top,
    .blue-block-bottom {
      background-color: var(--blue);
    }
    .hero1-svg {
      position: relative;
      z-index: 1;
      width: 100%;
    }
  }

  // Make the most of your time
  .hero2 {
    .yellow-block-top,
    .yellow-block-bottom {
      background-color: var(--yellow);
    }
    .hero2-svg {
      position: relative;
      z-index: 1;
      width: 80%;
      padding-left: 20%;
      transform: translateX(20%);
    }
  }

  // Gain valuable insights
  .hero3 {
    .purple-block-top,
    .purple-block-bottom {
      background-color: var(--purple);
    }
    .hero3-svg {
      position: relative;
      z-index: 1;
      width: 100%;
    }
  }
  .spacer {
    margin-bottom: 8rem;
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
    .main-svg {
      max-width: 60rem;
    }
    .hero {
      .info {
        position: relative;
        z-index: 1;
        font-size: 2.5rem;
        margin: 1rem 0 2rem 10rem;
        font-family: "Josefin Slab", serif;
      }
      .details {
        position: relative;
        z-index: 1;
        margin: 5rem 0 3rem 2rem;
        line-height: 2rem;
      }
      .slide-left {
        transform: translateX(8rem);
      }
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
