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
  position: absolute;
  bottom: 8px;
  right: 12px;
  background: transparent;
  border: 2px solid #111;
  color: #111;
  border-radius: 16px;
  height: 28px;
  width: 56px;
  cursor: pointer;
  .circle {
    position: absolute;
    top: -1px;
    left: ${({ theme }) => `${theme.name === "darkMode" ? "28px" : "-1px"}`};
    width: 27px;
    height: 27px;
    border-radius: 24px;
    background-color: #111;
    border: 2px solid #111;
    transition: 0.1s linear;
  }
  .moon {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 18px;
    height: 18px;
    color: #111;
  }
  .sun {
    position: absolute;
    top: -1px;
    right: 0px;
    width: 26px;
    height: 26px;
    color: #111;
  }
  @media (min-width: 768px) {
    position: fixed;
    background-color: ${({ theme }) => theme.bodyBackground};
    border: 2px solid ${({ theme }) => theme.color1};
    color: ${({ theme }) => theme.color1};
    transition: 0.1s linear;
    .circle {
      background-color: ${({ theme }) => theme.color1};
      border: 2px solid ${({ theme }) => theme.color1};
    }
    .moon,
    .sun {
      color: ${({ theme }) => theme.color1};
    }
  }
`;
