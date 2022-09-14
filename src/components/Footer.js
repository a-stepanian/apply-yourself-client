import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <h1>Apply Yourself &copy; 2022</h1>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 15rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: var(--main-bg);

  h1 {
    margin-bottom: 5rem;
    text-align: center;
    font-size: 1.8rem;
  }
`;
export default Footer;
