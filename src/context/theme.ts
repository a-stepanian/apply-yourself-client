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
  color4: "#363537"
};
export const darkTheme: IStyleTheme = {
  name: "darkMode",
  primaryFont: "'Poppins', san-serif",
  primaryBorderRadius: "2px",
  primaryBackgroundColor: "#040012", // Dark Background
  secondaryBackgroundColor: "#333", // Dark Background
  color1: "#3a5eff", // Blue
  // color1: "#8097FF", // Blue
  color2: "#6dfff8", // Green
  // color2: "#67A8A4", // Green
  color3: "#c024ff", // Pink
  // color3: "#ff8091", // Pink
  color4: "#6d46f8" // Purple
  // color4: "#A78FFF" // Purple
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    color: ${({ theme }) => theme.color1};
    font-family: ${({ theme }) => theme.primaryFont};
    transition: all 0.2s linear;
  }
  `;
