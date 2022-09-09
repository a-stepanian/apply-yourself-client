import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Job = ({
  _id,
  applied,
  comments,
  company,
  location,
  position,
  status,
  website,
}) => {
  return (
    <Wrapper>
      <header className="top-header">
        <p
          className="status"
          style={{
            backgroundColor:
              (status === "Applied" && "beige") ||
              (status === "Interview" && "rgba(0, 255, 0, 0.3)") ||
              (status === "Declined" && "rgba(255, 0, 0, 0.2)"),
          }}
        >
          {status}
        </p>
        <p className="applied">{applied}</p>
      </header>
      <div className="job-card">
        <p>
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="position"
          >
            {position}
          </a>
        </p>{" "}
        <p className="company">
          {company} - <span>{location}</span>
        </p>
      </div>

      <p className="comments">{comments}</p>
      <Link to={`/applications/edit/${_id}`}>Edit</Link>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  z-index: 1;
  position: relative;
  width: calc(100% - 2rem);
  max-width: 30rem;
  margin: 1rem 0.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 5px 5px 15px rgb(0, 0, 0, 0.15);
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 100;
    font-family: Arial, Helvetica, sans-serif;
  }
  .status {
    width: fit-content;
    padding: 0.2rem;
  }

  .job-card {
    height: 6rem;
    margin: 1rem 0;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-size: 0.8rem;
    background-color: var(--off-white);
    box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);
  }
  .position {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: black;
  }
  .company {
    font-size: 1rem;
    letter-spacing: -0.05em;
    span {
      font-size: 0.8rem;
    }
  }
  .comments {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
    font-size: 0.8rem;
  }
  @media (min-width: 480px) {
    /* padding: 1.1rem;
    .company {
      font-size: 1.2rem;
      letter-spacing: -0.05em;
    }
    .position {
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: black;
    }
    .applied {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 0.8rem;
      font-weight: 300;
      transform: translateY(0.3rem);
    }
    .status {
      width: 4rem;
      padding: 0.1rem;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 700;
    } */
  }
`;

export default Job;
