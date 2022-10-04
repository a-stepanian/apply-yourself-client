import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrEdit } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";

const Job = ({ app }) => {
  const {
    applied,
    comments,
    company,
    location,
    position,
    status,
    response,
    website,
    _id,
  } = app;
  return (
    <Wrapper
      style={{
        backgroundColor:
          (status === "Applied" && "rgba(223, 232, 187, 0.1)") ||
          (status === "Interview" && "rgba(0, 255, 0, 0.1)") ||
          (status === "Declined" && "rgba(255, 0, 0, 0.1)"),
      }}
    >
      <header className="job-details">
        <div className="left-column">
          <p>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="position"
            >
              {position}
            </a>
          </p>
          <p className="company">{company}</p>
          <p className="location">
            <MdOutlineLocationOn className="icon" />
            {location}
          </p>
        </div>
        <div className="right-column">
          <p className="applied">
            Applied <br /> {applied.slice(5, 10)}-{applied.slice(0, 4)}
          </p>
          {response && (
            <p className="applied">
              Response <br /> {response.slice(5, 10)}-{response.slice(0, 4)}
            </p>
          )}
          <p
            className="status"
            style={{
              backgroundColor:
                (status === "Applied" && "rgba(223, 232, 187, 0.2)") ||
                (status === "Interview" && "rgba(0, 255, 0, 0.2)") ||
                (status === "Declined" && "rgba(255, 0, 0, 0.2)"),
            }}
          >
            {status === "Applied" ? "Waiting" : status}
          </p>
        </div>
      </header>
      <footer className="bottom">
        <p className="comments">{comments}</p>
        <Link to={`/applications/${_id}/edit`} className="edit">
          <GrEdit />
        </Link>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  z-index: 1;
  position: relative;
  width: calc(100% - 2rem);
  margin: 1rem 1rem 0;
  &:last-of-type {
    margin: 1rem;
  }
  padding: 1rem;
  box-shadow: 0 0 8px rgba(75, 75, 75, 0.2);
  .job-details {
    display: flex;

    .left-column {
      width: calc(100% - 4rem);
      display: flex;
      flex-direction: column;
      .position {
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: black;
      }
      .company {
        font-size: 1rem;
        letter-spacing: -0.05em;
      }
      .location {
        font-size: 0.8rem;
        font-family: "Josefin Slab", serif;
      }
    }

    .right-column {
      width: 4rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      font-size: 0.6rem;
      font-weight: 100;
      font-family: Arial, Helvetica, sans-serif;
      p {
        text-align: end;
      }
      .status {
        font-weight: 900;
      }
    }
  }
  .bottom {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
  }
  .comments {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    overflow-wrap: break-word;
  }
  .edit {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 900;
    color: gray;
  }

  @media (min-width: 990px) {
    width: calc(100% - 8rem);
    margin: 4rem 4rem 0;
    &:last-of-type {
      margin: 4rem;
    }
    padding: 1.5rem;
    box-shadow: 0 0 8px rgba(75, 75, 75, 0.2);
  }
`;

export default Job;
