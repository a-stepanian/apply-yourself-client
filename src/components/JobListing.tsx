import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { IJobResult } from "../interfaces/interfaces";
import { FaCheck } from "react-icons/fa";

interface IJobListingProps {
  job: IJobResult;
  applied: boolean;
}

export const JobListing = (props: IJobListingProps) => {
  const { job, applied } = props;

  const { setSelectedJob, setShowModal } = useAppContext();

  return (
    <Wrapper>
      <div className="card">
        <div className="card-header">
          <h2>{job.name}</h2>
          <div className="company-and-status">
            <h3>{job?.company[0]?.name}</h3>
            {applied && (
              <p className="applied-badge">
                <FaCheck />
                &nbsp;Applied
              </p>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="details-wrapper">
            <span>{job?.locations[0]?.name ?? "Location Not Provided"}</span>
            <span className="hide-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <span>{job?.categories[0]?.name ?? "Category Not Provided"}</span>
            <span className="hide-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
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
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  .card {
    padding: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.secondaryBackgroundColor};
    border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "32px")};
    border: 2px solid ${({ theme }) => (theme.name === "darkMode" ? "transparent" : theme.color1)};
    transition: 0.4s linear;
    .card-header {
      color: #eee;
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
      .company-and-status {
        display: flex;
        justify-content: space-between;
        h3 {
          font-family: "Poppins", sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .applied-badge {
          display: flex;
          align-items: center;
          color: ${({ theme }) => theme.appliedBadge};
          font-family: "Poppins", sans-serif;
        }
      }
    }
    .flex {
      margin-top: 1rem;
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
        display: flex;
        flex-direction: column;
        .hide-sm {
          display: none;
        }
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
        transition: 0.2s linear;
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
  @media (min-width: 768px) {
    .card {
      .flex {
        .details-wrapper {
          flex-direction: row;
          .hide-sm {
            display: block;
          }
        }
      }
    }
  }
`;
