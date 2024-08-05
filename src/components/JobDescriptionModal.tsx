import React, { useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import DOMPurify from "dompurify";
import { LoadingSpinner } from "./LoadingSpinner";
import { IoCloseOutline } from "react-icons/io5";
import { OutsideClickDetector } from "./OutsideClickDetector";

interface IJobDescriptionModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const JobDescriptionModal = (props: IJobDescriptionModalProps) => {
  const { showModal, setShowModal } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { selectedJob } = useAppContext();

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
            <button className="apply-now-button" type="button" onClick={applyToJob} disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Apply Now"}
            </button>
            <button
              className="close-modal-button"
              type="button"
              onClick={() => setShowModal(false)}
              disabled={isLoading}>
              <IoCloseOutline />
            </button>
          </div>
          {selectedJob && <div dangerouslySetInnerHTML={{ __html: jobDescription }}></div>}
        </div>
      </OutsideClickDetector>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.main`
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
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
  }
  .show {
    position: relative;
    z-index: 999;
    display: block;
    background-color: ${({ theme }) => theme.primaryBackgroundColor};
    height: calc(100% - 2rem);
    max-height: 100vh;
    margin: 1rem;
    overflow-y: scroll;
    padding: 1rem;
    max-width: 800px;
    .flex {
      display: flex;
      justify-content: space-between;
      .apply-now-button {
        width: 100px;
        padding: 0.5rem 0;
        border-radius: 3px;
        color: ${({ theme }) => theme.color1};
        background: ${({ theme }) => theme.primaryBackgroundColor};
        border: 1px solid ${({ theme }) => theme.color1};
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
      }
      .close-modal-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
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
      }
    }
  }
  /* Fixes weird indentation in the html */
  li {
    margin-left: 1rem;
  }
  @media (min-width: 480px) {
    .show {
      margin: 2.5rem;
      padding: 2.5rem;
    }
  }
`;
