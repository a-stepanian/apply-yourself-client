import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Job from "../components/Job";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import { RiFolderAddLine } from "react-icons/ri";
import { useEffect } from "react";
import LineDesign from "../components/LineDesign";

const ShowAppsPage = () => {
  const navigate = useNavigate();
  const { applications, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  return (
    <Wrapper>
      <LineDesign />
      {applications.length > 0 ? (
        applications.map((app, index) => {
          const { _id } = app;
          return <Job key={_id} app={app} />;
        })
      ) : (
        <>
          <div className="wrapper">
            <h2>No applications found.</h2>
            <Link to="/applications/new" className="add-first-app">
              <span>Add Application</span>
              <RiFolderAddLine className="icon" />
            </Link>
          </div>
          <div className="img-wrapper">
            <img
              src="/empty.svg"
              alt="Person standing next to a document with a plus sign."
              className="image"
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 38rem;
  .wrapper {
    position: absolute;
    z-index: 1;
    top: 15rem;
  }
  .add-first-app {
    text-decoration: none;
    position: relative;
    z-index: 1;
    height: 3rem;
    width: 16rem;
    padding: 0 1.5rem;
    border: 2px solid rgba(0, 0, 0, 0.7);
    border-radius: 1.5rem;
    background: linear-gradient(
      rgba(215, 210, 255, 0.8),
      rgba(235, 243, 200, 0.8),
      rgba(200, 220, 255, 0.8)
    );
    color: black;
    font-weight: 700;
    font-size: 1.1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 3rem 0;
    .icon {
      font-size: 1.3rem;
    }
  }
  .img-wrapper {
    width: 100%;
    max-width: 30rem;
    padding: 5rem 1rem;
    opacity: 0.2;
    img {
      width: 100%;
    }
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
