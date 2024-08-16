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
    <Wrapper onClick={toggleDarkMode} title="Toggle Dark Mode">
      <BsMoonStars className="moon" />
      <CiSun className="sun" />
      <div className="circle"></div>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  position: relative;
  background: transparent;
  border: none;
  border: 2px solid #111;
  outline: none;
  outline: 2px solid #111;
  color: #111;
  border-radius: 35px;
  height: 36px;
  width: 72px;
  cursor: pointer;
  .circle {
    position: absolute;
    top: -1px;
    left: ${({ theme }) => `${theme.name === "darkMode" ? "36px" : "-1px"}`};
    width: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: #111;
    border: 2px solid #111;
    transition: left 0.2s linear;
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
  @media (min-width: 768px) {
    position: fixed;
    bottom: 12px;
    right: 12px;
    outline: 2px solid ${({ theme }) => theme.primaryBackgroundColor};
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    border: 2px solid ${({ theme }) => theme.color1};
    color: ${({ theme }) => theme.color1};
    transition: 0.1s linear;
    .circle {
      background-color: ${({ theme }) => theme.color1};
      border: 2px solid ${({ theme }) => theme.color1};
      transition: all 0.1s linear;
    }
    .moon,
    .sun {
      color: ${({ theme }) => theme.color1};
    }
  }
  @media (min-width: 990px) {
    border: 4px solid ${({ theme }) => theme.color1};
    outline: 4px solid ${({ theme }) => theme.primaryBackgroundColor};
    border-radius: 39px;
    height: 42px;
    width: 84px;
    cursor: pointer;
    .circle {
      top: -3px;
      left: ${({ theme }) => `${theme.name === "darkMode" ? "42px" : "-3px"}`};
      width: 39px;
      height: 39px;
      border-radius: 100%;
    }
    .moon {
      top: 4px;
      left: 6px;
      width: 26px;
      height: 26px;
    }
    .sun {
      top: -3px;
      right: -2px;
      width: 39px;
      height: 39px;
    }
  }
`;
