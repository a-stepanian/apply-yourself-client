import { useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import DOMPurify from "dompurify";
import { LoadingSpinner } from "./LoadingSpinner";
import { IoCloseOutline } from "react-icons/io5";
import { OutsideClickDetector } from "./OutsideClickDetector";
import { Link } from "react-router-dom";

export const JobDescriptionModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loggedIn, selectedJob, showModal, setShowModal } = useAppContext();

  let jobDescription = selectedJob?.contents ? selectedJob.contents : "";
  if (jobDescription.length > 0) {
    jobDescription = DOMPurify.sanitize(jobDescription);
  }

  const applyToJob = async () => {
    setIsLoading(true);
    try {
      const newApplication = {
        company: selectedJob?.company?.name ?? "N/A",
        position: selectedJob?.name ?? "N/A",
        website: selectedJob?.refs?.landing_page ?? "N/A",
        location: selectedJob?.locations?.[0]?.name ?? "N/A",
        applied: true,
        response: "",
        comments: "",
        status: "Applied"
      };
      // send post request to server
      await fetch(`${url}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newApplication),
        credentials: "include"
      }).catch(error => {
        console.log(error);
        return;
      });
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Wrapper>
      <OutsideClickDetector onOutsideClick={() => setShowModal(false)} activated={showModal}>
        <div className={`modal ${showModal ? "show" : ""}`}>
          <div className="flex">
            <div>
              <h2>{selectedJob?.name}</h2>
              <h3>{selectedJob?.company.name}</h3>
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
              <button className="apply-now-button" type="button" onClick={applyToJob} disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Apply Now"}
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
        text-decoration: none;
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
        &:disabled {
          color: ${({ theme }) => theme.primaryBackgroundColor};
          background: ${({ theme }) => theme.color3};
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
