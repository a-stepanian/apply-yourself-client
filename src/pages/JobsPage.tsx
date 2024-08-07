import { useEffect, useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import { JobListing } from "../components/JobListing";
import { JobDescriptionModal } from "../components/JobDescriptionModal";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { LuFilter, LuSearch } from "react-icons/lu";

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
        <div className="search-and-filter-wrapper">
          <label style={{ display: "none" }} htmlFor="company">
            Filter by Company
          </label>
          <div className="search-wrapper">
            <input
              className="search-input"
              type="text"
              name="company"
              placeholder="industrial engineer"
              disabled={isLoading}
            />
            <LuSearch className="search-icon" />
            <button className="filter-button" type="button">
              Filters
              <LuFilter className="filter-icon" />
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : currentJobPageResults?.results?.length > 0 ? (
          <>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {currentJobPageResults.results.map(x => (
              <JobListing key={x.id} job={x} setShowModal={setShowModal} />
            ))}
            <div className="pagination-wrapper">
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
          </>
        ) : (
          <p>No results found.</p>
        )}
      </section>
      <img className="astronaut" src="green-astonaut.svg" alt="Astronaut landing on the footer of the page" />
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
    .search-and-filter-wrapper {
      margin-bottom: 6rem;
      .search-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        border-bottom: 1px solid ${({ theme }) => theme.color1};
        .search-input {
          width: 75%;
          background-color: ${({ theme }) => theme.primaryBackgroundColor};
          font-family: "Poppins", sans-serif;
          font-weight: 400;
          font-size: 0.9rem;
          line-height: 2rem;
          color: ${({ theme }) => theme.color3};
          border: none;
          border-right: 1px solid ${({ theme }) => theme.color1};
          border-left: 1px solid ${({ theme }) => theme.color1};
          padding: 0.2rem 0 0.2rem 30px;
          transition: 0.3s linear;
          &:focus-visible {
            outline: none;
          }
        }
        .search-icon {
          font-size: 1.2rem;
          position: absolute;
          top: 9px;
          /* right: calc(25% + 5px); */
          left: 8px;
        }
        .filter-button {
          transition: 0.3s linear;
          flex: 1;
          background-color: ${({ theme }) => theme.primaryBackgroundColor};
          color: ${({ theme }) => theme.color1};
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          border-right: 1px solid ${({ theme }) => theme.color1};
          width: 25%;
          &:hover {
            color: ${({ theme }) => theme.color3};
            border: 1px solid ${({ theme }) => theme.color3};
            border-right: 2px solid ${({ theme }) => theme.color3};
            cursor: pointer;
          }
          &:disabled {
            color: ${({ theme }) => theme.primaryBackgroundColor};
            background: ${({ theme }) => theme.color3};
          }
          .filter-icon {
            margin-right: 4px;
            margin-left: 4px;
          }
        }
      }
    }
    .pagination-wrapper {
      padding: 4rem 0 10rem;
    }
  }
  .astronaut {
    position: absolute;
    bottom: 0;
    width: 80px;
    height: 80px;
  }
  @media (min-width: 768px) {
    .container {
      max-width: 80vw;
      .search-and-filter-wrapper {
        margin-top: 8rem;
        width: 100%;
        .search-wrapper {
          position: relative;
          width: 100%;
          border: none;
          .search-input {
            width: 80%;
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
            margin-right: 8px;
            border: none;
            border: 2px solid ${({ theme }) => theme.color1};
            border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "2.9rem")};
            font-weight: 400;
            font-size: 1rem;
            line-height: 3rem;
            padding: 0.2rem 0 0.2rem 46px;
          }
          .search-icon {
            font-size: 1.8rem;
            position: absolute;
            top: 13px;
            /* right: calc(25% + 5px); */
            left: 8px;
          }
          .filter-button {
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
            font-size: 1rem;
            border: 2px solid ${({ theme }) => theme.color1};
            border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "2.9rem")};
            &:hover {
              color: ${({ theme }) => theme.color3};
              border: 2px solid ${({ theme }) => theme.color3};
            }
            .filter-icon {
              font-size: 1.4rem;
              margin-right: 0;
            }
          }
        }
      }
      .pagination-wrapper {
        padding: 4rem 0 12rem;
      }
    }
    .astronaut {
      width: 100px;
      height: 100px;
    }
  }
  @media (min-width: 990px) {
    .container {
      max-width: 790px;
    }
  }
`;
