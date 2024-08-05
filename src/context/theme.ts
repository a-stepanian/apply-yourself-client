import { IStyleTheme } from "../interfaces/interfaces";
import { createGlobalStyle } from "styled-components";

export const lightTheme: IStyleTheme = {
  name: "lightMode",
  primaryFont: "'Josefin Slab', serif",
  primaryBorderRadius: "250px",
  bodyBackground: "#fafafa",
  color1: "#222",
  backgroundColor1: "#363537",
  color2: "#363537",
  backgroundColor2: "#363537",
  color3: "#363537",
  backgroundColor3: "#363537"
};
export const darkTheme: IStyleTheme = {
  name: "darkMode",
  primaryFont: "'Poppins', san-serif",
  primaryBorderRadius: "2px",
  bodyBackground: "#040012", // Dark Background
  color1: "#3a5eff", // Blue
  backgroundColor1: "#3a5eff", // Blue
  color2: "#6dfff8", // Purple
  backgroundColor2: "#6d46f8", // Purple
  color3: "#c024ff", // Pink
  backgroundColor3: "#c024ff" // Pink
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.color1};
    font-family: ${({ theme }) => theme.primaryFont};
    transition: all 0.2s linear;
  }
  `;
