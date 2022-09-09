import React from "react";
import styled from "styled-components";
import LineDesign from "./LineDesign";

const Hero = () => {
  return (
    <Wrapper>
      <LineDesign />
      <h1>Land your dream job</h1>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

export default Hero;
