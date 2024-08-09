import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { IJobResult } from "../interfaces/interfaces";
import React from "react";

interface IJobListingProps {
  job: IJobResult;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const JobListing = (props: IJobListingProps) => {
  const { job, setShowModal } = props;

  const { setSelectedJob } = useAppContext();

  return (
    <Wrapper>
      <div className="card">
        <div className="card-header">
          <h2>{job.name}</h2>
          <div className="company-and-location">
            <h3>{job.company.name}</h3>
          </div>
        </div>
        <div className="flex">
          <div className="details-wrapper">
            <span>{job?.locations[0]?.name ?? "Location Not Provided"}</span>
            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <span>{job?.categories[0]?.name ?? "Category Not Provided"}</span>
            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <span>{job?.levels[0]?.name ?? "Level Not Provided"}</span>
          </div>
          <div>
            <button
              type="button"
              className="view-details-button"
              title="View Job Description"
              onClick={() => {
                setSelectedJob(job);
                setShowModal(true);
              }}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => (theme.name === "darkMode" ? "transparent" : theme.color1)};
  width: 100%;
  border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "32px")};
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.secondaryBackgroundColor};
  transition: 0.4s linear;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  .card {
    .card-header {
      color: #eee;
      margin: 1rem;
      padding: 1rem;
      background-color: #222;
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px 3px 3px 3px" : "16px 16px 3px 3px")};
      transition: 0.4s linear;
      h2 {
        font-family: "Poppins", sans-serif;
        font-size: 1.2rem;
        font-weight: 300;
        margin-bottom: 0.5rem;
      }
      h3 {
        font-family: "Poppins", sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
    .flex {
      padding: 0 1rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: 0.4s linear;
      color: ${({ theme }) => (theme.name === "darkMode" ? "#eee" : theme.color2)};
      .details-wrapper {
        font-family: "Poppins", sans-serif;
        font-size: 0.7rem;
        font-weight: 500;
        color: ${({ theme }) => (theme.name === "darkMode" ? "#eee" : theme.color2)};
      }
      .view-details-button {
        padding: 0.5rem 1rem;
        border-radius: 3px;
        color: ${({ theme }) => theme.primaryBackgroundColor};
        background: ${({ theme }) => theme.color3};
        border: 1px solid ${({ theme }) => theme.color3};
        border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "1.5rem")};
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        white-space: nowrap;
        cursor: pointer;
        transition: 0.4s linear;
        &:hover {
          color: ${({ theme }) => theme.color3};
          background: transparent;
        }
        &:disabled {
          color: ${({ theme }) => theme.primaryBackgroundColor};
          background: ${({ theme }) => theme.color3};
        }
      }
    }
    @media (min-width: 480px) {
      .company-and-location {
        display: flex;
        align-items: center;
        h3,
        h4 {
          white-space: nowrap;
        }
        h3 {
          margin-right: 1rem;
        }
      }
    }
  }
`;
