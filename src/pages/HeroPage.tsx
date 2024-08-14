import { useEffect } from "react";
import styled from "styled-components";
import { LineDesign } from "../components/LineDesign";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { TypingEffect } from "../components/TypingEffect";
import { FaArrowRight } from "react-icons/fa";

interface IHeroPageProps {
  theme: string;
}

export const HeroPage = (props: IHeroPageProps) => {
  const { theme } = props;
  const { loggedIn } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTargets = document?.querySelectorAll(".scroll-target");
      if (scrollTargets?.length > 0) {
        for (let i = 0; i < scrollTargets.length; i++) {
          const target = scrollTargets[i];
          const rect = target.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            document.querySelector(`.block-top-${i}`)?.classList.add(`slide-left`);
            document.querySelector(`.block-bottom-${i}`)?.classList.add(`slide-right`);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      {theme === "light" && <LineDesign />}
      <section className="above-the-fold">
        <div className="hero-text-wrapper">
          <TypingEffect text="Land your dream job." textElementType="h1" speedInMilliseconds={50} />
          <Link to="/jobs" className="get-started-cta">
            See who's hiring
            <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
        <div className="astronaut-wrapper">
          <img className="astronaut" src="purple-astronaut.svg" alt="Happy Astronaut." />
        </div>
        <div className="scroll-target"></div>
      </section>
      <section className="hero hero1">
        <h2 className="info">Manage the application process</h2>
        <div className="block-top-0 block-top"></div>
        <div className="centering-wrapper">
          <div className="svg-wrapper">
            <img
              className="hero1-svg svg"
              src={`${theme === "light" ? "manage" : "brainstorm-purple"}.svg`}
              alt={`${theme === "light" ? "Employee managing their application process." : "Brainstorming session"}`}
            />
          </div>
        </div>
        <div className="block-bottom-0 block-bottom"></div>
        <p className="details">Getting a job can be difficult - managing the process shouldn't be.</p>
      </section>
      <Link to="/jobs" className="cta-2">
        All openings
        <FaArrowRight className="arrow-icon" />
      </Link>
      <div className="scroll-target" />
      <section className="hero hero2">
        <h2 className="info">Make the most of your time</h2>
        <div className="block-top-1 block-top" />
        <div className="centering-wrapper">
          <div className="svg-wrapper">
            <img
              className="hero2-svg svg"
              // src={`${theme === "light" ? "time" : "blue-time"}.svg`}
              src={`${theme === "light" ? "time" : "time-management"}.svg`}
              alt={`${theme === "light" ? "Employee excerizing excellent time management." : "Hourglass"}`}
            />
          </div>
        </div>
        <div className="block-bottom-1 block-bottom" />
        <p className="details">Spend more time job hunting and less time organizing.</p>{" "}
      </section>
      <Link to="/jobs" className="cta-2">
        Latest Postings
        <FaArrowRight className="arrow-icon" />
      </Link>
      <div className="scroll-target" />
      <section className="hero hero3">
        <h2 className="info">Gain valuable insights</h2>
        <div className="block-top-2 block-top" />
        <div className="centering-wrapper">
          <div className="svg-wrapper">
            <img
              className="hero3-svg svg"
              src={`${theme === "light" ? "charts" : "purple-analytics"}.svg`}
              alt={`${theme === "light" ? "Job application metrics." : "Handing in a resume."}`}
            />
          </div>
        </div>
        <div className="block-bottom-2 block-bottom" />
        <p className="details">Learn what works and what doesn't - leverage this information in your search.</p>{" "}
      </section>
      <div className="register-wrapper-bottom">
        {loggedIn ? (
          <h2 className="get-started">Good Luck!</h2>
        ) : (
          <Link to="/register" className="get-started">
            Get started today
          </Link>
        )}
      </div>
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
  .above-the-fold {
    min-height: 100vh;
  }
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
    padding-left: 1rem;
    padding-right: 1rem;
    position: absolute;
    width: 80vw;
    max-width: 600px;
    left: 10vw;
    top: 360px;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #c024ff;
    font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.2rem" : "1.5rem")};
    font-weight: ${({ theme }) => (theme.name === "darkMode" ? "700" : "900")};
    color: #111;
    border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "3rem")};
    border: 5px solid rgb(2, 0, 8);
    z-index: 55;
    transition: border-radius 0.4s linear, background-color 0.4s linear;
    .arrow-icon {
      margin-left: 1rem;
    }
  }
  .cta-2 {
    position: relative;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 80vw;
    max-width: 600px;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #c024ff;
    font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.2rem" : "1.5rem")};
    font-weight: ${({ theme }) => (theme.name === "darkMode" ? "700" : "900")};
    color: #111;
    border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "3rem")};
    border: 5px solid rgb(2, 0, 8);
    z-index: 55;
    transition: border-radius 0.4s linear, background-color 0.4s linear;
    margin-bottom: 8rem;
    .arrow-icon {
      margin-left: 1rem;
    }
  }
  .astronaut-wrapper {
    position: absolute;
    top: 130px;
    right: -10vw;
    width: calc(50% - 10px);
    padding-top: 2rem;
    z-index: 9;
    opacity: 0;
    animation: fadeInLight 0.5s ease-in forwards;
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
    margin-bottom: 8rem;
    max-width: 40rem;
    .info,
    .details {
      position: relative;
      z-index: 11;
      color: ${({ theme }) => theme.primaryBackgroundColor};
    }
    .info {
      font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.6rem" : "2rem")};
      height: 12rem;
      margin: 0 0 2rem;
      padding: 4rem 0;
    }
    .details {
      /* color: ${({ theme }) => (theme.name === "darkMode" ? "#eee" : "#111")}; */
      font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.4rem" : "1.6rem")};
      line-height: 2rem;
      height: 12rem;
      padding-top: 3rem;
    }
    .block-top {
      position: absolute;
      top: 0;
      z-index: 0;
      width: 150vw;
      height: 12rem;
      transform: translateX(100%);
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "8rem")};
      transition: transform 0.8s linear, border-radius 0.4s linear, background-color 0.4s linear;
    }
    .centering-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
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
      z-index: 0;
      width: 150vw;
      height: 12rem;
      transform: translateX(-100%);
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "12rem")};
      transition: transform 0.8s linear 0.4s, border-radius 0.4s linear, background-color 0.4s linear;
    }
    .slide-left {
      transform: translateX(-10%);
    }
    .slide-right {
      transform: translateX(-30%);
    }
  }
  .hero1 {
    .block-top-0,
    .block-bottom-0 {
      background-color: ${({ theme }) => theme.color4};
    }
    .info {
      text-shadow: -1px -1px 0 ${({ theme }) => theme.color4}, 1px -1px 0 ${({ theme }) => theme.color4},
        -1px 1px 0 ${({ theme }) => theme.color4}, 1px 1px 0 ${({ theme }) => theme.color4};
    }
  }
  .hero2 {
    .block-top-1,
    .block-bottom-1 {
      background-color: ${({ theme }) => theme.color2};
    }
    .info {
      text-shadow: -1px -1px 0 ${({ theme }) => theme.color2}, 1px -1px 0 ${({ theme }) => theme.color2},
        -1px 1px 0 ${({ theme }) => theme.color2}, 1px 1px 0 ${({ theme }) => theme.color2};
    }
  }
  .hero3 {
    .block-top-2,
    .block-bottom-2 {
      background-color: ${({ theme }) => theme.color4};
    }
    .info {
      text-shadow: -1px -1px 0 ${({ theme }) => theme.color4}, 1px -1px 0 ${({ theme }) => theme.color4},
        -1px 1px 0 ${({ theme }) => theme.color4}, 1px 1px 0 ${({ theme }) => theme.color4};
    }
  }
  .register-wrapper-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    .get-started {
      z-index: 1;
      text-align: center;
      font-size: 3rem;
      text-shadow: 0 0 80px rgb(115, 0, 255);
      color: ${({ theme }) => theme.color1};
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
      .info {
        margin: 0 5vw 2rem 33vw;
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "2rem" : "2.4rem")};
        padding: 3rem 0;
      }
      .details {
        width: 80%;
        margin: 3rem 10%;
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.8rem" : "2.2rem")};
        height: unset;
        text-align: start;
      }
      .slide-left {
        transform: translateX(15%);
      }
      .slide-right {
        transform: translateX(-20%);
      }
    }
    .register-wrapper-bottom {
      .get-started {
        width: 24rem;
        font-size: 5rem;
        margin-bottom: 4rem;
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
        color: ${({ theme }) => (theme.name === "darkMode" ? "rgba(2, 0, 6, 0.7)" : "rgba(255, 255, 255, 0.8)")};
      }
    }
    .hero {
      .info {
        font-size: 2.5rem;
        padding: 0;
        margin: 2rem 0 0 25vw;
        width: 100%;
      }
      .details {
        margin: ${({ theme }) => (theme.name === "darkMode" ? "5rem 0 5rem 10rem" : "5rem 0 5rem 10rem")};
        line-height: 2rem;
        transform: translateX(8rem);
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
      margin: 16rem 0;
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
    .hero1 {
      margin-top: 50vh;
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
      opacity: 0.3;
      transform: scale(1.1);
    }
  }
`;
