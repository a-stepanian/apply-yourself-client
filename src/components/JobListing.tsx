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
        <h2>{job.name}</h2>
        <div className="flex">
          <h3>{job.company.name}</h3>
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
  border: 1px solid ${({ theme }) => theme.color1};
  width: 100%;
  border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "18px")};
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.secondaryBackgroundColor};
  transition: 0.4s linear;
  .card {
    h2 {
      font-family: "Poppins", sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color2};
    }
    .flex {
      display: flex;
      justify-content: space-between;
      h3 {
        font-family: "Poppins", sans-serif;
        font-size: 1.4rem;
        font-weight: 900;
        color: ${({ theme }) => theme.color2};
      }
      button {
        width: 100px;
        padding: 0.5rem 0;
        border-radius: 3px;
        color: ${({ theme }) => theme.primaryBackgroundColor};
        background: ${({ theme }) => theme.color3};
        border: 1px solid ${({ theme }) => theme.color3};
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.color3};
          background: ${({ theme }) =>
            `linear-gradient(45deg, ${theme.color1}, ${theme.primaryBackgroundColor},${theme.color1})`};
        }
        &:disabled {
          color: ${({ theme }) => theme.primaryBackgroundColor};
          background: ${({ theme }) => theme.color3};
        }
        &:first-of-type {
          color: ${({ theme }) => theme.color1};
          background: ${({ theme }) => theme.primaryBackgroundColor};
          border: 1px solid ${({ theme }) => theme.color1};
        }
      }
    }
  }
`;
