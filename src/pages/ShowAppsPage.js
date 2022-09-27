import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Job from "../components/Job";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import { RiFolderAddLine } from "react-icons/ri";

const ShowAppsPage = () => {
  const { applications } = useContext(AuthContext);
  return (
    <Wrapper>
      <div className="divider" />
      <Link to="/applications/new">
        <span>Add An Application</span>
        <RiFolderAddLine className="icon" />
      </Link>
      {applications && <h1>Your Applications</h1>}
      {applications ? (
        applications.map((app, index) => {
          const { _id } = app;
          return <Job key={_id} app={app} />;
        })
      ) : (
        <>
          <h2>No applications found</h2>
          <div className="divider" />
          <Link to="/applications/new">
            <span>Add An Application</span>
            <RiFolderAddLine className="icon" />
          </Link>{" "}
        </>
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
