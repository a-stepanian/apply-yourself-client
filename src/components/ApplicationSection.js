import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Job from "./Job";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import { RiFolderAddLine } from "react-icons/ri";
import Filter from "./Filter";
import { useState } from "react";
import { useEffect } from "react";

const ApplicationSection = () => {
  const [filter, setFilter] = useState("all");
  const [appsToDisplay, setAppsToDisplay] = useState([]);
  const { applications } = useContext(AuthContext);

  useEffect(() => {
    if (filter === "all") {
      setAppsToDisplay(applications);
    } else {
      const filteredApps = applications.filter((app) => app.status === filter);
      setAppsToDisplay(filteredApps);
    }
  }, [applications, filter]);

  return (
    <Wrapper>
      {applications.length > 0 ? (
        <>
          <header className="sticky-header">
            <h2>My Applications</h2>
            <div className="cover-strip" />
            <div className="button-wrapper">
              <Link to="/applications/new" className="add-app">
                <span>Add Application</span>
                <RiFolderAddLine className="icon" />
              </Link>
              <Filter setFilter={setFilter} />
            </div>
          </header>
          {appsToDisplay.map((app, index) => {
            const { _id } = app;
            return <Job key={_id} app={app} />;
          })}
        </>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 38rem;
  .sticky-header {
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    z-index: 2;
    top: 0;
    width: 100%;
    display: flex;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    .button-wrapper {
      padding: 1rem;
      width: 100%;
      display: flex;
    }
  }
  .wrapper {
    position: absolute;
    z-index: 1;
    top: 15rem;
  }

  .add-app {
    text-decoration: none;
    position: relative;
    z-index: 1;
    height: 2rem;
    width: 11rem;
    border: 2px solid rgba(0, 0, 0, 0.7);
    border-radius: 1.5rem;
    background: linear-gradient(
      rgba(215, 210, 255, 0.8),
      rgba(235, 243, 200, 0.8),
      rgba(200, 220, 255, 0.8)
    );
    color: black;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon {
      font-size: 1.3rem;
    }
  }

  // Displayed when user has no applications
  .img-wrapper {
    width: 100%;
    max-width: 30rem;
    padding: 5rem 1rem;
    opacity: 0.2;
    img {
      width: 100%;
    }
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

  @media (min-width: 990px) {
    .cover-strip {
      position: absolute;
      z-index: 1;
      background-color: var(--white);
      top: 0;
      left: -0.4rem;
      width: 0.8rem;
      height: 100%;
    }
  }
`;

export default ApplicationSection;
