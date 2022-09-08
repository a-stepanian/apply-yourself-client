import React from "react";
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
          - {location}
        </p>
      </div>

      {/* <p>Applied {applied}</p> */}
      <p>{status}</p>

      {/* <p>{comments}</p> */}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: calc(100% - 2rem);
  margin: 1rem;
  padding: 0.5rem;
  background-color: var(--beige2);
  display: flex;
  font-size: 0.8rem;
  .job-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .company {
    font-weight: 700;
    margin-bottom: 0.2rem;
  }
  .position {
    color: black;
  }
`;

export default Job;
