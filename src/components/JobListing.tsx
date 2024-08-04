import styled from "styled-components";
import DOMPurify from "dompurify";
import { useState } from "react";
import { url } from "../context/AppContext";
import { IJobResult } from "../interfaces/interfaces";
import { LoadingSpinner } from "./LoadingSpinner";

interface IJobListingProps {
  job: IJobResult;
}

export const JobListing = (props: IJobListingProps) => {
  const { job } = props;
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let jobDescription = job?.contents ? job.contents : "";
  if (jobDescription.length > 0) {
    jobDescription = DOMPurify.sanitize(jobDescription);
  }

  const applyToJob = async () => {
    setIsLoading(true);
    try {
      const newApplication = {
        company: job?.company?.name ?? "N/A",
        position: job?.name ?? "N/A",
        website: job?.refs?.landing_page ?? "N/A",
        location: job?.locations?.[0]?.name ?? "N/A",
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
      <div className="card">
        <div className="title">
          <h2>{job.name}</h2>
          <h3>{job.company.name}</h3>
        </div>
        <div className="button-group">
          <button
            type="button"
            className="view-details-button"
            title={`${showMore ? "Hide" : "View"} Job Description`}
            onClick={() => setShowMore(prev => !prev)}>{`${showMore ? "Hide" : "View"} Details`}</button>
          <button className="apply-now-button" type="button" onClick={applyToJob} disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Apply Now"}
          </button>
        </div>
      </div>
      {showMore && <div dangerouslySetInnerHTML={{ __html: jobDescription }}></div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color1};
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 5px ${({ theme }) => theme.color2};
  background-color: #222;
  .card {
    display: flex;
    justify-content: space-between;
    .title {
      max-width: 67%;
      h2 {
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "0.9rem" : "1rem")};
        font-weight: ${({ theme }) => (theme.name === "darkMode" ? "500" : "700")};
        /* color: ${({ theme }) => theme.color2}; */
        color: #eee;
        margin-bottom: 1rem;
      }
      h3 {
        font-size: ${({ theme }) => (theme.name === "darkMode" ? "1.2rem" : "1.4rem")};
        font-weight: ${({ theme }) => (theme.name === "darkMode" ? "700" : "900")};
        color: ${({ theme }) => theme.color2};
      }
    }
    .button-group {
      display: flex;
      flex-direction: column;
      button {
        width: 100px;
        padding: 0.5rem 0;
        border-radius: 3px;
        color: ${({ theme }) => theme.bodyBackground};
        background-color: ${({ theme }) => theme.color3};
        border: 1px solid ${({ theme }) => theme.color3};
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.color3};
          background-color: ${({ theme }) => theme.bodyBackground};
        }
        &:disabled {
          color: ${({ theme }) => theme.bodyBackground};
          background-color: ${({ theme }) => theme.color3};
        }
        &:first-of-type {
          margin-bottom: 1rem;
          color: ${({ theme }) => theme.color1};
          background-color: ${({ theme }) => theme.bodyBackground};
          border: 1px solid ${({ theme }) => theme.color1};
        }
      }
    }
  }
  li {
    margin-left: 1rem;
  }
`;
