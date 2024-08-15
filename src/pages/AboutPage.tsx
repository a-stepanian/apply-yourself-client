import { Link } from "react-router-dom";
import styled from "styled-components";

export const AboutPage = () => {
  return (
    <Wrapper>
      <svg
        className="blue-blob"
        id="10015.io"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <path fill="#3a5eff" d="M297,341Q123,442,127,246.5Q131,51,301,145.5Q471,240,297,341Z" />
      </svg>
      <div className="text-wrapper">
        <h2 className="welcome">Welcome to Apply Yourself!</h2>
        <p>
          See how easy job application management can be. Our system is designed to be simple and effective —{" "}
          <Link to={"/register"}>try it today!</Link>
        </p>
        <p>
          We make managing job applications easy and fast with our free, top-performing system. Whether you're a job
          seeker or an employer, our platform keeps things smooth and simple.
        </p>
        <p>
          Job applications shouldn’t be complicated. Our easy-to-use interface helps you get things done quickly so you
          can focus on finding the right job or candidate. <span>Plus, it’s completely free!</span>
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.primaryBackgroundColor};
  color: ${({ theme }) => (theme.name === "darkMode" ? "#e6e6e6" : theme.color1)};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  .blue-blob {
    display: none;
  }
  .text-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 768px;
    .welcome {
      text-align: center;
      font-size: 2.4rem;
      margin-bottom: 4rem;
    }
    p {
      font-size: 1.6rem;
      margin-bottom: 4rem;
      font-family: "Poppins", sans-serif;
      font-weight: 300;
      a,
      span {
        color: ${({ theme }) => theme.primaryPink};
        font-weight: bold;
      }
    }
  }
  @media (min-width: 768px) {
    .blue-blob {
      display: block;
      top: -600px;
      position: absolute;
      width: 2200px;
      opacity: ${({ theme }) => (theme.name === "darkMode" ? 0.2 : 0.1)};
    }
    .text-wrapper {
      .welcome {
        margin: 3rem 0;
        font-size: 4rem;
      }
    }
  }
`;
