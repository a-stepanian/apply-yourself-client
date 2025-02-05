import { IStyleTheme } from "../interfaces/interfaces";
import { createGlobalStyle } from "styled-components";

export const lightTheme: IStyleTheme = {
  name: "lightMode",
  primaryFont: "'Josefin Slab', serif",
  primaryBorderRadius: "250px",
  primaryBackgroundColor: "#fafafa",
  secondaryBackgroundColor: "#ddd",
  color1: "#363537",
  color2: "#363537",
  color3: "#363537",
  color4: "#363537",
  primaryBlue: "#3a5eff", // Blue
  primaryPink: "#c024ff", // Pink
  primaryGreen: "#6dfff8", // Green
  appliedBadge: "#a3febb",
  primaryBlack: "#333"
};
export const darkTheme: IStyleTheme = {
  name: "darkMode",
  primaryFont: "'Poppins', san-serif",
  primaryBorderRadius: "2px",
  primaryBackgroundColor: "#040012", // Dark Background
  secondaryBackgroundColor: "#444", // Dark Background
  color1: "#3a5eff", // Blue
  // color1: "#8097FF", // Blue
  color2: "#6dfff8", // Green
  // color2: "#67A8A4", // Green
  color3: "#c024ff", // Pink
  // color3: "#ff8091", // Pink
  color4: "#6d46f8", // Purple
  // color4: "#A78FFF" // Purple
  primaryBlue: "#3a5eff", // Blue
  primaryPink: "#c024ff", // Pink
  primaryGreen: "#6dfff8", // Green
  appliedBadge: "#a3febb",
  primaryBlack: "#333"
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    color: ${({ theme }) => theme.color1};
    font-family: ${({ theme }) => theme.primaryFont};
    transition: all 0.2s linear;
    *::selection {
      background-color: ${({ theme }) => theme.primaryGreen};
      color: #111;
      text-shadow: none;
    }
  }
  `;
