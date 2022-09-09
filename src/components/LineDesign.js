import React from "react";
import styled from "styled-components";

const LineDesign = () => {
  return (
    <Wrapper>
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .line {
    position: absolute;
    top: 0;
    left: calc(50% - 5rem);
    width: 15rem;
    height: calc(100% - 5rem);

    background-color: rgba(235, 243, 200, 0.4);
    filter: blur(70px);
    &:nth-of-type(2) {
      background-color: rgba(200, 220, 255, 0.4);
      transform: translateX(15rem) rotate(-5deg);
      transform-origin: top right;
    }
    &:nth-of-type(3) {
      background-color: rgba(215, 210, 255, 0.4);
      transform: translateX(-15rem) rotate(5deg);
      transform-origin: top right;
    }
  }
`;

export default LineDesign;
