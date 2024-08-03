import { useEffect } from "react";
import styled from "styled-components";
import { LineDesign } from "../components/LineDesign";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { TypingEffect } from "../components/TypingEffect";

export const HeroPage = () => {
  const { loggedIn } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTarget0 = document.querySelectorAll(".scroll-target")[0];
      // get distance from the top of the viewport
      const distanceFromTop0 = scrollTarget0.getBoundingClientRect().top;
      if (distanceFromTop0 < 400) {
        const blueBlockTop = document.querySelector(".blue-block-top");
        blueBlockTop?.classList.add("slide-left");
        const blueBlockBottom = document.querySelector(".blue-block-bottom");
        blueBlockBottom?.classList.add("slide-right");
      }

      const scrollTarget1 = document.querySelectorAll(".scroll-target")[1];
      // get distance from the top of the viewport
      const distanceFromTop1 = scrollTarget1.getBoundingClientRect().top;
      if (distanceFromTop1 < 400) {
        const yellowBlockTop = document.querySelector(".yellow-block-top");
        yellowBlockTop?.classList.add("slide-left");
        const yellowBlockBottom = document.querySelector(".yellow-block-bottom");
        yellowBlockBottom?.classList.add("slide-right");
      }

      const scrollTarget2 = document.querySelectorAll(".scroll-target")[2];
      // get distance from the top of the viewport
      const distanceFromTop2 = scrollTarget2.getBoundingClientRect().top;
      if (distanceFromTop2 < 400) {
        const purpleBlockTop = document.querySelector(".purple-block-top");
        purpleBlockTop?.classList?.add("slide-left");
        const purpleBlockBottom = document.querySelector(".purple-block-bottom");
        purpleBlockBottom?.classList?.add("slide-right");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      {/* <LineDesign /> */}
      <div className="hero-text-wrapper">
        <TypingEffect text="Land your dream job." textElementType="h1" speedInMilliseconds={50} />
        <a href="/jobs" className="get-started-cta">
          Get Started Now
        </a>
      </div>
      {/* <img className="main-svg" src="desk-pink.svg" alt="Happy employees collaborating at work." /> */}
      <div className="astronaut-wrapper">
        <img className="astronaut" src="purple-astronaut.svg" alt="Happy Astronaut." />
      </div>
      {/* <div className="register-wrapper">
        {loggedIn ? (
          <Link to="/dashboard" className="register">
            Go To Your Dashboard
          </Link>
        ) : (
          <Link to="/register" className="register">
            Sign up for a free account
          </Link>
        )}
      </div> */}
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
      <div className="scroll-target" />
      <article className="hero hero1">
        <h2 className="info">Manage the application process</h2>
        <div className="blue-block-top block-top" />
        <p className="details">Getting a job can be difficult - managing the process shouldn't be.</p>
        <div className="svg-wrapper">
          {/* <img className="hero1-svg svg" src="manage.svg" alt="Employee managing their application process." /> */}
        </div>
        <div>
          <img
            className="hero1-svg svg"
            src="brainstorm-purple.svg"
            alt="Employee managing their application process."
          />
        </div>
        <div className="blue-block-bottom block-bottom" />
      </article>

      <div className="scroll-target" />
      <article className="hero hero2">
        <h2 className="info">Make the most of your time</h2>
        <div className="yellow-block-top block-top" />
        <p className="details">
          Spend more time focusing on your career and less time organizing your applications and interviews.
        </p>
        <div className="svg-wrapper">
          <img className="hero2-svg svg" src="time.svg" alt="Employee excerizing excellent time management." />
        </div>
        <div className="yellow-block-bottom block-bottom" />
      </article>

      <div className="scroll-target" />
      <article className="hero hero3">
        <h2 className="info">Gain valuable insights</h2>
        <div className="purple-block-top block-top" />
        <p className="details">Learn what works and what doesn't - leverage this information in your search.</p>
        <div className="svg-wrapper">
          <img
            className="hero3-svg svg"
            src="charts.svg"
            alt="Job application metrics visualized to help with your job search."
          />
        </div>
        <div className="purple-block-bottom block-bottom" />
      </article>

      {loggedIn ? (
        <div className="register-wrapper-bottom">
          <h2 className="get-started">Good Luck!</h2>
        </div>
      ) : (
        <div className="register-wrapper-bottom">
          <h2 className="get-started">Get started today</h2>
          <Link to="/register" className="register sign-up">
            Sign Up
          </Link>
        </div>
      )}

      <div className="spacer" />
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  padding: 48px 1rem;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(4, 0, 12);
  justify-content: center;
  align-items: center;
  .hero-text-wrapper {
    width: 100vw;
    padding: 0 10vw;
    display: flex;
    min-height: 20rem;
    padding-top: 3rem;
    position: relative;
  }
  h1 {
    width: 170px;
    min-height: 280px;
    font-size: 3.5rem;
    line-height: 3.5rem;
    z-index: 1;
    font-family: "Poppins", sans-serif;
    color: #3a5eff;
    text-shadow: 0 0 80px rgb(115, 0, 255);
  }
  .get-started-cta {
    position: absolute;
    top: 360px;
    right: 10vw;
    background: #c024ff;
    padding: 1rem 2rem;
    text-decoration: none;
    font-weight: 700;
    color: #111;
    border-radius: 5px;
  }

  .astronaut-wrapper {
    position: absolute;
    top: 48px;
    right: -5vw;
    width: calc(30% - 10px);
    padding-top: 2rem;
    z-index: 999;
    opacity: 0;
    animation: fadeInLight 2.3s ease-in forwards;
    img {
      width: 100%;
    }
  }

  .main-svg {
    position: relative;
    z-index: 1;
    width: 30%;
    margin-bottom: 1rem;
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
    background: linear-gradient(rgba(215, 210, 255, 0.8), rgba(235, 243, 200, 0.8), rgba(200, 220, 255, 0.8));
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
    max-width: 40rem;
    .info {
      position: relative;
      z-index: 1;
      font-size: 2rem;
      height: 4rem;
      margin: 1rem 0 2rem 1rem;
      font-family: "Poppins", sans-serif;
    }
    .block-top {
      position: absolute;
      top: 0;
      z-index: 0;
      width: 100vw;
      height: 16rem;
      transition: 0.5s ease-out;
      transform: translateX(110%);
    }
    .details {
      position: relative;
      z-index: 1;
      margin: 5rem 0 3rem 0;
      line-height: 2rem;
      text-align: center;
    }
    .svg-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      img {
        max-width: 30rem;
      }
    }
    .block-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
      width: 100vw;
      height: 2rem;
      transition: 0.5s ease-out;
      transform: translateX(-100%);
    }
    .slide-left {
      transform: translateX(0);
    }
    .slide-right {
      transform: translateX(-40%);
    }
  }

  // Manage the application process article
  .hero1 {
    .blue-block-top,
    .blue-block-bottom {
      /* background-color: var(--blue); */
      background-color: #3a5eff;
    }
    .hero1-svg {
      padding: 1rem;
      position: relative;
      z-index: 1;
      width: 100%;
      filter: drop-shadow(0 0 30px rgb(34, 0, 136));
    }
  }

  // Make the most of your time
  .hero2 {
    .yellow-block-top,
    .yellow-block-bottom {
      background-color: var(--yellow);
    }
    .svg-wrapper {
      img {
        max-width: 25rem;
      }
    }
    .hero2-svg {
      padding: 1rem;
      background-color: var(--yellow2);
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
    .svg-wrapper {
      img {
        max-width: 25rem;
      }
    }
    .hero3-svg {
      padding: 1rem;
      background-color: var(--purple2);
      position: relative;
      z-index: 1;
      width: 100%;
    }
  }

  .register-wrapper-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8rem 0;
    .get-started {
      position: relative;
      width: 18rem;
      z-index: 1;
      margin-bottom: 2rem;
      text-align: center;
      font-size: 3rem;
      font-family: "Poppins", sans-serif;
    }
    .sign-up {
      width: 10rem;
    }
  }

  .spacer {
    margin-bottom: 8rem;
  }

  /* Media Queries */
  @media (min-width: 480px) {
    h1 {
      /* width: 20rem; */
      height: 8rem;
      font-size: 4.2rem;
      /* line-height: 5rem; */
      line-height: 4rem;
    }
    .main-svg {
      margin-bottom: 5rem;
    }
    .astronaut-wrapper {
      right: 10px;
    }
    .register-wrapper,
    .login-wrapper {
      animation: fadeIn 5s;
    }
    .register {
      animation: hover 1.2s infinite;
    }
    .hero {
      .details {
        width: 80%;
        margin: 5rem 10%;
        font-size: 1.4rem;
        text-align: start;
      }
    }
    .register-wrapper-bottom {
      .get-started {
        width: 24rem;
        font-size: 5rem;
        margin-bottom: 4rem;
      }
      .sign-up {
        width: 12rem;
      }
    }
  }

  @media (min-width: 768px) {
    h1 {
      /* width: 100%; */
      width: 26rem;
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
        font-size: 2.5rem;
        margin: 1rem 0 2rem 10rem;
      }
      .details {
        margin: 5rem 0 5rem 2rem;
        line-height: 2rem;
        transform: translateX(8rem);
      }
      .slide-left {
        transform: translateX(8rem);
      }
    }
    .register-wrapper-bottom {
      .get-started {
        width: 45rem;
        font-size: 5.5rem;
        margin-bottom: 4rem;
      }
      .sign-up {
        width: 12rem;
      }
    }
  }

  @media (min-width: 990px) {
    h1 {
      margin: 25vh 0 40vh;
      font-size: 5.5rem;
      line-height: 5.5rem;
      width: 31rem;
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
  @media (min-width: 1200px) {
    h1 {
      line-height: 7rem;
    }
    .hero-text-wrapper {
      width: 100vw;
      padding: 0 20vw;
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
  @keyframes fadeInLight {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    75% {
      transform: scale(1.1);
    }
    100% {
      opacity: 0.1;
      transform: scale(1.1);
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
