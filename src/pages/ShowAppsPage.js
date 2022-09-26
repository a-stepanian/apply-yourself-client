import React, { useContext } from "react";
import Job from "../components/Job";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";

const ShowAppsPage = () => {
  const { applications } = useContext(AuthContext);
  return (
    <Wrapper>
      {applications && <h1>Your Applications</h1>}
      {applications ? (
        applications.map((app, index) => {
          return <Job key={index} {...app} />;
        })
      ) : (
        <h2>No applications found</h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .filter {
    width: 100%;
    height: 15rem;
    background: url("/list.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section {
    position: relative;
    width: 100%;
    min-height: 30rem;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .no-results {
      z-index: 1;
      position: relative;
      margin: 3.5rem 0 15rem;
      font-size: 1.5rem;
    }
  }
`;

export default ShowAppsPage;
