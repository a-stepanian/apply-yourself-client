import { useEffect, useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import DOMPurify from "dompurify";
import { LoadingSpinner } from "./LoadingSpinner";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { OutsideClickDetector } from "./OutsideClickDetector";
import { Link } from "react-router-dom";

export const JobDescriptionModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);

  const { loggedIn, selectedJob, showModal, setShowModal, applications, fetchApplications } = useAppContext();

  let jobIds: string[] = [];
  if (applications?.length > 0) {
    jobIds = applications.map(x => x.job);
  }

  let jobDescription = selectedJob?.contents ? selectedJob.contents : "";
  if (jobDescription.length > 0) {
    jobDescription = DOMPurify.sanitize(jobDescription);
  }

  useEffect(() => {
    setIsLoading(true);
    setApplied(jobIds.includes(selectedJob?._id?.toString() ?? ""));
    setIsLoading(false);
  }, []);

  const applyToJob = async () => {
    setIsLoading(true);
    if (!selectedJob) return;
    try {
      await fetch(`${url}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobId: selectedJob._id,
          applied: true,
          response: "",
          comments: "",
          status: "Applied"
        }),
        credentials: "include"
      });
      setApplied(true);
      await fetchApplications();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <OutsideClickDetector onOutsideClick={() => setShowModal(false)} activated={showModal}>
        <div className={`modal ${showModal ? "show" : ""}`}>
          <div className="flex">
            <div>
              <h2>{selectedJob?.name}</h2>
              <h3>{selectedJob?.company[0]?.name}</h3>
              <div className="details-wrapper">
                <span>{selectedJob?.locations[0]?.name ?? "Location Not Provided"}</span>
                <span className="hide-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                <span>{selectedJob?.categories[0]?.name ?? "Category Not Provided"}</span>
                <span className="hide-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                <span>{selectedJob?.levels[0]?.name ?? "Level Not Provided"}</span>
              </div>
            </div>
            <div>
              <button
                className="close-modal-button"
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isLoading}>
                <IoCloseOutline />
              </button>
            </div>
          </div>
          <div className="justify-center">
            {loggedIn ? (
              <button
                className={`apply-now-button ${applied ? "applied-button" : ""}`}
                type="button"
                onClick={applyToJob}
                disabled={isLoading || applied}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : applied ? (
                  <span>
                    <FaCheck />
                    &nbsp; Applied
                  </span>
                ) : (
                  "Apply Now"
                )}
              </button>
            ) : (
              <Link className="apply-now-button" to="/login" onClick={() => setShowModal(false)}>
                Log in to apply
              </Link>
            )}
          </div>
          {selectedJob && <div className="job-description" dangerouslySetInnerHTML={{ __html: jobDescription }}></div>}
        </div>
      </OutsideClickDetector>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    display: none;
    transform: scale(0.8) translateY(30px);
    opacity: 0;
  }
  .show {
    position: relative;
    z-index: 999;
    display: block;
    background-color: ${({ theme }) => (theme.name === "darkMode" ? "#222" : "#ddd")};
    border-radius: 3px;
    height: calc(100% - 2rem);
    max-height: 100vh;
    margin: 1rem;
    overflow-y: scroll;
    padding: 1rem;
    max-width: 800px;
    transition: transform 0.1s linear, opacity 0.1s linear;
    .flex {
      display: flex;
      justify-content: space-between;
      display: flex;
      .details-wrapper {
        display: flex;
        flex-direction: column;
        .hide-sm {
          display: none;
        }
      }
    }
    .justify-center {
      display: flex;
      justify-content: center;
      .apply-now-button {
        font-family: "Poppins", sans-serif;
        font-size: 1rem;
        font-weight: 700;
        text-decoration: none;
        width: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        margin: 2rem 0;
        padding: 1rem 2rem;
        border-radius: ${({ theme }) => theme.primaryBorderRadius};
        background-color: ${({ theme }) => theme.color3};
        color: ${({ theme }) => theme.primaryBackgroundColor};
        border: 1px solid ${({ theme }) => theme.color3};
        white-space: nowrap;
        cursor: pointer;
        transition: 0.1s linear;
        &:hover {
          color: ${({ theme }) => theme.color3};
          background-color: ${({ theme }) => theme.primaryBackgroundColor};
        }
      }
      .applied-button {
        cursor: default;
        color: ${({ theme }) => theme.primaryBlack};
        background-color: ${({ theme }) => theme.appliedBadge};
        border: none;
        span {
          display: flex;
          align-items: center;
        }
        &:hover {
          color: ${({ theme }) => theme.primaryBlack};
          background-color: ${({ theme }) => theme.appliedBadge};
        }
      }
    }
    .close-modal-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 50px;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color3};
      background: transparent;
      cursor: pointer;
      transition: 0.2s linear;
      &:hover {
        color: ${({ theme }) => theme.color3};
        background: ${({ theme }) => theme.primaryBackgroundColor};
      }
    }
    .job-description {
      height: 100%;
      max-height: calc(100vh - 200px);
      font-family: "Poppins", sans-serif;
    }
  }
  /* Fixes weird indentation in the html */
  li {
    margin-left: 1rem;
  }
  .grow {
    transform: scale(0.85) translateY(0);
    opacity: 1;
  }
  @media (min-width: 480px) {
    .show {
      margin: 2.5rem;
      padding: 2.5rem;
    }
  }
  @media (min-width: 768px) {
    .grow {
      transform: scale(1) translateY(0);
    }
  }
`;
