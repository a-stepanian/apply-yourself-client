import { useEffect } from "react";
import styled from "styled-components";
import { LineDesign } from "../components/LineDesign";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { TypingEffect } from "../components/TypingEffect";

interface IHeroPageProps {
  theme: string;
}

export const HeroPage = (props: IHeroPageProps) => {
  const { theme } = props;
  const { loggedIn } = useAppContext();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTarget0 = document.querySelectorAll(".scroll-target")[0];
      // get distance from the top of the viewport
      const distanceFromTop0 = scrollTarget0.getBoundingClientRect().top;
      if (distanceFromTop0 < 600) {
        const blueBlockTop = document.querySelector(".blue-block-top");
        blueBlockTop?.classList.add("slide-left");
        const blueBlockBottom = document.querySelector(".blue-block-bottom");
        blueBlockBottom?.classList.add("slide-right");
      }

      const scrollTarget1 = document.querySelectorAll(".scroll-target")[1];
      // get distance from the top of the viewport
      const distanceFromTop1 = scrollTarget1.getBoundingClientRect().top;
      if (distanceFromTop1 < 600) {
        const yellowBlockTop = document.querySelector(".yellow-block-top");
        yellowBlockTop?.classList.add("slide-left");
        const yellowBlockBottom = document.querySelector(".yellow-block-bottom");
        yellowBlockBottom?.classList.add("slide-right");
      }

      const scrollTarget2 = document.querySelectorAll(".scroll-target")[2];
      // get distance from the top of the viewport
      const distanceFromTop2 = scrollTarget2.getBoundingClientRect().top;
      if (distanceFromTop2 < 600) {
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
      {theme === "light" && <LineDesign />}
      <div className="hero-text-wrapper">
        <TypingEffect text="Land your dream job." textElementType="h1" speedInMilliseconds={50} />
        <Link to="/jobs" className="get-started-cta">
          See current job postings
        </Link>
      </div>
      <div className="astronaut-wrapper">
        <img className="astronaut" src="purple-astronaut.svg" alt="Happy Astronaut." />
      </div>
      <div className="scroll-target" />
      <article className="hero hero1">
        <h2 className="info">Manage the application process</h2>
        <div className="blue-block-top block-top" />
        <p className="details">Getting a job can be difficult - managing the process shouldn't be.</p>
        <div className="centering-wrapper">
          <div className="svg-wrapper">
            {theme === "light" ? (
              <img className="hero1-svg svg" src="manage.svg" alt="Employee managing their application process." />
            ) : (
              <img
                className="hero1-svg svg"
                src="brainstorm-purple.svg"
                alt="Employee managing their application process."
              />
            )}
          </div>
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
        <div className="centering-wrapper">
          <div className="svg-wrapper">
            {theme === "light" ? (
              <img className="hero2-svg svg" src="time.svg" alt="Employee excerizing excellent time management." />
            ) : (
              <img
                className="hero2-svg svg"
                src="purple-time.svg"
                alt="Employee excerizing excellent time management."
              />
            )}
          </div>
        </div>
        <div className="yellow-block-bottom block-bottom" />
      </article>
      <div className="scroll-target" />
      <article className="hero hero3">
        <h2 className="info">Gain valuable insights</h2>
        <div className="purple-block-top block-top" />
        <p className="details">Learn what works and what doesn't - leverage this information in your search.</p>
        <div className="centering-wrapper">
          <div className="svg-wrapper">
            {theme === "light" ? (
              <img
                className="hero3-svg svg"
                src="charts.svg"
                alt="Job application metrics visualized to help with your job search."
              />
            ) : (
              <img
                className="hero3-svg svg"
                src="pink-resume.svg"
                alt="Job application metrics visualized to help with your job search."
              />
            )}
          </div>
        </div>
        <div className="purple-block-bottom block-bottom" />
      </article>
      {loggedIn ? (
        <div className="register-wrapper-bottom">
          <h2 className="get-started">Good Luck!</h2>
        </div>
      ) : (
        <div className="register-wrapper-bottom">
          <h2 className="get-started">
            Get started
            <br />
            today
          </h2>
          <Link to="/register" className="register sign-up">
            Sign Up
          </Link>
        </div>
      )}
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
  /* background-color: rgb(4, 0, 12); */
  justify-content: center;
  align-items: center;
  .hero-text-wrapper {
    width: 100vw;
    padding: 0 10vw;
    height: 500px;
    display: flex;
    flex-direction: column;
    min-height: 20rem;
    padding-top: 3rem;
    position: relative;
  }
  h1 {
    width: ${({ theme }) => (theme.name === "darkMode" ? "170px" : "150px")};
    min-height: 280px;
    font-size: 3.5rem;
    line-height: 3.5rem;
    z-index: 1;
    color: ${({ theme }) => theme.color1};
    text-shadow: 0 0 80px rgb(115, 0, 255);
  }
  .get-started-cta {
    position: absolute;
    width: 80vw;
    left: 10vw;
    top: 360px;
    background: #c024ff;
    padding: 1.5rem 3rem;
    text-decoration: none;
    text-align: center;
    font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.5rem" : "1.9rem")};
    font-weight: ${({ theme }) => (theme.name === "darkMode" ? "700" : "900")};
    color: #111;
    border-radius: ${({ theme }) => theme.primaryBorderRadius};
    z-index: 55;
  }
  .astronaut-wrapper {
    position: absolute;
    top: 130px;
    right: -10vw;
    width: calc(50% - 10px);
    padding-top: 2rem;
    z-index: 9;
    opacity: 0;
    animation: fadeInLight 2.3s ease-in forwards;
    img {
      width: 100%;
    }
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
  .hero {
    position: relative;
    margin: 7rem 0;
    max-width: 40rem;
    .info,
    .details {
      position: relative;
      z-index: 11;
      color: ${({ theme }) => theme.bodyBackground};
    }
    .info {
      font-size: 2rem;
      height: 4rem;
      margin: 1rem 0 2rem 5rem;
    }
    .details {
      margin: 5rem 0 3rem 0;
      line-height: 2rem;
      text-align: center;
    }
    .block-top {
      position: absolute;
      top: 0;
      z-index: 0;
      width: 150vw;
      height: 16rem;
      transform: translateX(110%);
      transition: transform 0.8s linear, border-radius 0.3s linear;
    }
    .centering-wrapper {
      display: flex;
      justify-content: center;
      .svg-wrapper {
        width: 10rem;
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          position: relative;
          z-index: 20;
        }
      }
    }
    .block-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
      width: 100vw;
      height: 2rem;
      transform: translateX(-100%);
      transition: transform 0.8s linear, border-radius 0.3s linear;
    }
    .slide-left {
      transform: translateX(0);
    }
    .slide-right {
      transform: translateX(-40%);
    }
  }
  .hero1 {
    .blue-block-top,
    .blue-block-bottom {
      background-color: ${({ theme }) => theme.color2};
      border-radius: ${({ theme }) => theme.primaryBorderRadius};
      z-index: 10;
    }
  }
  .hero2 {
    .yellow-block-top,
    .yellow-block-bottom {
      background-color: ${({ theme }) => theme.color3};
      border-radius: ${({ theme }) => theme.primaryBorderRadius};
    }
  }
  .hero3 {
    .purple-block-top,
    .purple-block-bottom {
      background-color: ${({ theme }) => (theme.name === "darkMode" ? "#6d46f8" : theme.color2)};
      border-radius: ${({ theme }) => theme.primaryBorderRadius};
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
      text-shadow: 0 0 80px rgb(115, 0, 255);
    }
    .sign-up {
      width: 10rem;
    }
  }

  @media (min-width: 480px) {
    h1 {
      height: 8rem;
      font-size: 4.2rem;
      line-height: 4rem;
    }
    .astronaut-wrapper {
      right: 10px;
    }
    .get-started-cta {
      top: 400px;
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
    .hero-text-wrapper {
      padding-top: 0;
    }
    h1 {
      width: 26rem;
      font-size: ${({ theme }) => (theme.name === "darkMode" ? "4.5rem" : "5rem")};
      line-height: ${({ theme }) => (theme.name === "darkMode" ? "4.5rem" : "5rem")};
      margin: 15vh 0 40vh;
    }
    .get-started-cta {
      width: 50vw;
      transform: translateX(25vw);
      &:hover {
        transform: translateX(25vw) translateY(-5px);
        box-shadow: 0 8px 8px
          ${({ theme }) => (theme.name === "darkMode" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.8)")};
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .hero {
      .info {
        font-size: 2.5rem;
        margin: ${({ theme }) => (theme.name === "darkMode" ? "1rem 0 2rem 10rem" : "1rem 0 2rem 15rem")};
      }
      .details {
        margin: ${({ theme }) => (theme.name === "darkMode" ? "5rem 0 5rem 10rem" : "5rem 0 5rem 10rem")};
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
      font-size: ${({ theme }) => (theme.name === "darkMode" ? "5.5rem" : "6.2rem")};
      line-height: ${({ theme }) => (theme.name === "darkMode" ? "5.5rem" : "6.2rem")};
      width: 31rem;
    }
    .get-started-cta {
      margin-top: 5rem;
    }
    .astronaut-wrapper {
      animation: fadeInLight 2s linear forwards;
      max-width: 40rem;
    }
    .hero {
      .centering-wrapper {
        .svg-wrapper {
          width: 20rem;
          height: 20rem;
        }
      }
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
`;
