import styled from "styled-components";
import { BsMoonStars } from "react-icons/bs";
import { CiSun } from "react-icons/ci";

interface IDarkModeButtonProps {
  theme: any;
  toggleDarkMode: any;
}

export const DarkModeButton = (props: IDarkModeButtonProps) => {
  const { toggleDarkMode } = props;

  return (
    <Wrapper>
      <button type="button" onClick={toggleDarkMode} title="Toggle Dark Mode">
        <BsMoonStars className="moon" />
        <CiSun className="sun" />
        <div className="circle"></div>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  button {
    position: relative;
    background: transparent;
    border: none;
    border: 3px solid #111;
    color: #111;
    border-radius: 38px;
    height: 38px;
    width: 74px;
    cursor: pointer;
    .circle {
      position: absolute;
      top: -1px;
      left: ${({ theme }) => (theme.name === "darkMode" ? "36px" : "-1px")};
      width: 35px;
      height: 35px;
      border-radius: 35px;
      background-color: #111;
      border: 2px solid #111;
      transition: 0.4s linear;
    }
    .moon {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 24px;
      height: 24px;
      color: #111;
    }
    .sun {
      position: absolute;
      top: -1px;
      right: -4px;
      width: 36px;
      height: 36px;
      color: #111;
    }
  }
  @media (min-width: 768px) {
    position: fixed;
    bottom: 12px;
    right: 12px;
    border-radius: ${({ theme }) => (theme.name === "darkMode" ? "6px" : "39px")};
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    transition: 0.4s linear;
    button {
      margin: 2px;
      background-color: ${({ theme }) => theme.primaryBackgroundColor};
      border: 2px solid ${({ theme }) => theme.color1};
      color: ${({ theme }) => theme.color1};
      transition: 0.4s linear;
      border: 4px solid ${({ theme }) => theme.color1};
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "39px")};
      height: 42px;
      width: 84px;
      cursor: pointer;
      .circle {
        background-color: ${({ theme }) => theme.color1};
        border: 2px solid ${({ theme }) => theme.color1};
        transition: 0.3s linear;
        top: -3px;
        left: ${({ theme }) => (theme.name === "darkMode" ? "40px" : "-3px")};
        width: 39px;
        height: 39px;
        border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "39px")};
      }
      .moon {
        color: ${({ theme }) => theme.color1};
        top: 4px;
        left: 6px;
        width: 26px;
        height: 26px;
      }
      .sun {
        color: ${({ theme }) => theme.color1};
        top: -3px;
        right: -2px;
        width: 39px;
        height: 39px;
      }
    }
  }
`;
