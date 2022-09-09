import React, { useState } from "react";
import styled from "styled-components";

const Job = ({
  applied,
  comments,
  company,
  location,
  position,
  status,
  website,
}) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <Wrapper>
      <div className="job-info">
        <p className="company">{company}</p>
        <p>
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="position"
          >
            {position}
          </a>{" "}
          {location}
        </p>
      </div>

      <div className="application-info">
        <p className="applied">
          {applied.slice(5, 10)}-{applied.slice(0, 4)}
        </p>
        <p
          className="status"
          style={{
            backgroundColor:
              (status === "Applied" && "yellow") ||
              (status === "Interview" && "green") ||
              (status === "Rejected" && "red"),
          }}
        >
          {status}
        </p>
        <button onClick={() => setShowComments((prev) => !prev)}>
          Show Comments
        </button>
      </div>
      {showComments && <p className="comments">{comments}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  z-index: 1;
  position: relative;
  width: calc(100% - 2rem);
  max-width: 30rem;
  height: 5rem;
  margin: 0.5rem 1rem;
  padding: 0.8rem;
  background-color: var(--off-white);
  box-shadow: 5px 5px 15px rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  .job-info {
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .company {
    font-size: 1.2rem;
    letter-spacing: -0.05em;
  }
  .position {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: black;
  }
  .application-info {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  .applied {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
  }
  .status {
    width: 4.6rem;
    padding: 0.2rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 700;
  }
  .comments {
    z-index: -999;
    height: 5rem;
    padding: 0.8rem;
    background-color: var(--off-white);
    box-shadow: 5px 5px 15px rgb(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    right: -50%;
    height: 100%;
    width: 15rem;
    animation: slide-right 0.2s forwards;
  }
  @keyframes slide-right {
    0% {
      transform: translateX(-7.5rem) rotate3d(0, 1, 0, 90deg);
    }
    100% {
      transform: translateX(0) rotate3d(0, 1, 0, 0deg);
    }
  }
  @media (min-width: 480px) {
    height: 6rem;
    padding: 1.1rem;
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
    }
  }
`;

export default Job;
