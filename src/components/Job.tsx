import React, { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import styled from "styled-components";
import { GrEdit } from "react-icons/gr";
import { MdOutlineLocationOn, MdExpandLess, MdExpandMore } from "react-icons/md";
import { IApplicationModel } from "../models/models";

interface IJobProps {
  app: IApplicationModel;
}

export const Job = (props: IJobProps) => {
  const { applied, comments, company, location, position, status, response, website, _id } = props.app;

  const [showMore, setShowMore] = useState(false);

  // Destructure from props

  const toggleFooter = () => {
    if (showMore) setShowMore(false);
    if (!showMore) setShowMore(true);
  };

  return (
    <Wrapper
      style={{
        backgroundColor: `${
          status === "Applied"
            ? "rgb(250, 250, 250)"
            : status === "Interview"
            ? "rgb(230, 255, 230)"
            : status === "Declined" && "rgb(255, 230, 230)"
        }`
      }}>
      <header className="job-details">
        <div className="left-column">
          <p>
            <a href={website} target="_blank" rel="noreferrer" className="position">
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
          <p className="status">{status}</p>
          <select name="status" id="status" value={status}>
            <option value="Applied">Applied</option>
            <option value="Waiting">Waiting</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>
          <p className="applied">
            Applied <br /> {applied.slice(5, 10)}-{applied.slice(0, 4)}
          </p>
          {response && (
            <p className="applied">
              Response <br /> {response.slice(5, 10)}-{response.slice(0, 4)}
            </p>
          )}
        </div>
      </header>
      <div className="btn-wrapper">
        <button type="button" className="show-more-btn" onClick={() => toggleFooter()}>
          {showMore ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      {showMore && (
        <footer className="bottom">
          <p className="comments">{comments}</p>
          <div className="edit-wrapper">
            <Link to={`/applications/${_id}/edit`} className="edit">
              <GrEdit />
            </Link>
          </div>
        </footer>
      )}
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.article`
  z-index: 1;
  position: relative;
  width: calc(100% - 2rem);
  margin: 1rem 1rem 0;
  padding: 1rem 1rem 0;
  box-shadow: 0 0 8px rgba(75, 75, 75, 0.2);
  &:last-of-type {
    margin: 1rem;
  }

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
        margin: 0.5rem 0;
        font-size: 1rem;
        letter-spacing: -0.05em;
        line-height: 1rem;
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
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      font-family: Arial, Helvetica, sans-serif;
      p {
        text-align: end;
      }
      .status {
        font-weight: 900;
      }
    }
  }

  .btn-wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    .show-more-btn {
      background-color: transparent;
      height: 1.5rem;
      display: flex;
      align-items: center;
      font-size: 2rem;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .bottom {
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .comments {
      width: 100%;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 100;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      overflow-wrap: break-word;
    }
    .edit-wrapper {
      display: flex;
      margin-bottom: 1rem;
      justify-content: flex-end;
      .edit {
        width: 1rem;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: 900;
        color: gray;
      }
    }
  }

  @media (min-width: 480px) {
    margin: 2rem 2rem 0;
    box-shadow: 0 0 8px rgba(75, 75, 75, 0.3);
    &:last-of-type {
      margin: 2rem;
    }
  }

  @media (min-width: 990px) {
    width: calc(100% - 8rem);
    margin: 4rem 4rem 0;
    padding: 1.5rem;
    box-shadow: 0 0 8px rgba(75, 75, 75, 0.2);
    &:last-of-type {
      margin: 4rem;
    }
  }

  @media (min-width: 1200px) {
    max-width: 50rem;
    .job-details {
      .left-column {
        width: calc(100% - 6rem);
        .position {
          font-size: 1.5rem;
        }
        .company {
          margin: 1rem 0;
        }
        .location {
          font-size: 0.9rem;
        }
      }

      .right-column {
        width: 6rem;
        font-size: 0.7rem;
      }
    }
  }
`;
