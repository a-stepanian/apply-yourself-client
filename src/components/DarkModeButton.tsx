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
  border: 2px solid #111;
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
    transition: 0.1s linear;
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
  @media (min-width: 990px) {
    bottom: 24px;
    right: 24px;
  }
`;
