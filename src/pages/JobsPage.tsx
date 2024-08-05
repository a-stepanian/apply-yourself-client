import { useEffect, useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import { JobListing } from "../components/JobListing";
import { Loading } from "../components/Loading";
import { JobDescriptionModal } from "../components/JobDescriptionModal";
import { OutsideClickDetector } from "../components/OutsideClickDetector";

export const JobsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { currentJobPageResults, setCurrentJobPageResults } = useAppContext();

  // Fetch Jobs
  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
      try {
        // first try to get the record from local DB
        let response = await fetch(`${url}/job-pages/${currentPage}`);
        let data = await response?.json();
        // if it doesn't exist, fetch it from the API and create a new record in the local DB
        if (!data) {
          response = await fetch(`https://www.themuse.com/api/public/jobs?page=${currentPage}`);
          data = await response.json();
          // create new job page record
          await fetch(`${url}/job-pages/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
          });
        }
        setCurrentJobPageResults(data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getJobs();
  }, [currentPage]);

  return (
    <Wrapper style={{ position: "relative", zIndex: `${showModal ? "999" : ""}` }}>
      <section className="container">
        <label htmlFor="company">Filter by Company</label>
        <input type="text" name="company" placeholder="company" />
        <div className="flex">
          {currentPage > 1 && (
            <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>
              {currentPage - 1}
            </button>
          )}
          <button className="pagination-button" disabled>
            {currentPage}
          </button>
          <button className="pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {currentJobPageResults?.results?.length > 0 &&
              currentJobPageResults?.results.map(x => <JobListing key={x.id} job={x} setShowModal={setShowModal} />)}
          </>
        )}
      </section>
      {showModal && <JobDescriptionModal showModal={showModal} setShowModal={setShowModal} />}
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    max-width: 600px;
    position: relative;
    padding: 0 1rem;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1,
    input {
      margin-bottom: 1rem;
    }
    .pagination-button {
      padding: 0.5rem 1rem;
      background-color: var(--purple2);
      border-radius: 3px;
      margin: 0 0.5rem 1rem;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
      &:disabled {
        cursor: default;
        opacity: 1;
      }
    }
  }
`;
