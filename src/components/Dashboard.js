import React from "react";
import styled from "styled-components";
import LineDesign from "./LineDesign";

const Dashboard = () => {
  return (
    <Wrapper>
      <LineDesign />
      <h1>Dashboard</h1>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

export default Dashboard;
