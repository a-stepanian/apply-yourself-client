import { useEffect, useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import { JobListing } from "../components/JobListing";
import { JobDescriptionModal } from "../components/JobDescriptionModal";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";

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
        <input type="text" name="company" placeholder="company" disabled={isLoading} />
        {isLoading ? (
          <Loading />
        ) : currentJobPageResults?.results?.length > 0 ? (
          <>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {currentJobPageResults.results.map(x => (
              <JobListing key={x.id} job={x} setShowModal={setShowModal} />
            ))}
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
        ) : (
          <p>No results found.</p>
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
  }
  @media (min-width: 768px) {
    .container {
      max-width: 80vw;
    }
  }
  @media (min-width: 990px) {
    .container {
      max-width: 790px;
    }
  }
`;
