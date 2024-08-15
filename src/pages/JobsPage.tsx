import { useEffect, useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import { JobListing } from "../components/JobListing";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { LuFilter, LuSearch } from "react-icons/lu";
import { IJobPageResults, IJobResult } from "../interfaces/interfaces";

export const JobsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [companyName, setCompanyName] = useState<string>("");

  const { currentJobPageResults, setCurrentJobPageResults } = useAppContext();

  const getSingleJobPage = async (urlToUse: string = url): Promise<IJobPageResults> => {
    try {
      const response = await fetch(urlToUse);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = (await response.json()) as IJobPageResults;
      return data;
    } catch (error) {
      console.error("Error fetching job page:", error);
      throw error;
    }
  };

  const getJobs = async () => {
    setIsLoading(true);
    try {
      let data = await getSingleJobPage(`${url}/job-pages/${currentPage.toString()}`); // first try to get the record from local DB
      if (data) {
        setCurrentJobPageResults(data);
      } else {
        data = await getSingleJobPage("https://www.themuse.com/api/public/jobs"); // second try the API

        if (data?.results?.length > 0) {
          const jobPromises = data.results.map(async (x: IJobResult) => {
            const response = await fetch(`${url}/job/new`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(x),
              credentials: "include"
            });
            const { id } = await response.json();
            return { ...x, _id: id };
          });

          const jobs = await Promise.all(jobPromises);

          await fetch(`${url}/job-pages/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data, results: jobs }),
            credentials: "include"
          });

          setCurrentJobPageResults(data);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getJobs();
  };

  useEffect(() => {
    getJobs();
  }, [currentPage]);

  return (
    <Wrapper>
      <section className="container">
        <div className="search-and-filter-wrapper">
          <label style={{ display: "none" }} htmlFor="company">
            Filter by Company
          </label>
          <div className="search-wrapper">
            <form action="#" onSubmit={e => handleSubmit(e)}>
              <div className="input-wrapper">
                <input
                  className="search-input"
                  type="text"
                  name="company"
                  value={companyName}
                  placeholder="industrial engineer"
                  disabled={isLoading}
                  onChange={e => setCompanyName(e.target.value)}
                />
                <LuSearch className="search-icon" />
              </div>
            </form>
            <button className="filter-button" type="button">
              <div className="button-text-wrapper">
                <span>Filters</span>
                <LuFilter className="filter-icon" />
              </div>
            </button>
          </div>
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {isLoading ? (
          <Loading />
        ) : currentJobPageResults?.results?.length > 0 ? (
          <p>
            {currentJobPageResults.results.map(x => (
              <JobListing key={x._id} job={x} />
            ))}
          </p>
        ) : (
          <p>No results found.</p>
        )}
        <div className="pagination-wrapper">
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    min-height: calc(200vh + 50px);
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
        form {
          width: 75%;
        }
        .search-input {
          width: 100%;
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
          transition: border-radius 0.4s linear;
          &:hover {
            cursor: text;
            border-right: 1px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
            border-left: 1px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
          }
          &:focus-visible {
            outline: none;
            background-color: rgba(150, 150, 150, 0.5);
            color: #111;
          }
        }
        .search-icon {
          font-size: 1.2rem;
          position: absolute;
          top: 9px;
          left: 8px;
        }
        .filter-button {
          transition: border-radius 0.4s linear;
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
            color: ${({ theme }) => (theme.name === "darkMode" ? theme.color3 : theme.primaryPink)};
            border: 2px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color3 : theme.primaryPink)};
            border-right: 2px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color3 : theme.primaryPink)};
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
          .input-wrapper {
            .search-input {
              transition: border-radius 0.4s linear, border 0.1s linear, font-size 0.1s linear, padding 0.1s linear;
              width: calc(100% - 8px);
              box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
              border: none;
              border: 3px solid ${({ theme }) => theme.color1};
              border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "2.9rem")};
              font-weight: bold;
              font-size: 1rem;
              line-height: 3rem;
              padding: 0.18rem 0 0.22rem 46px;
              &:hover {
                font-size: 1.1rem;
                border: 3px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
                padding: 0.16rem 0 0.24rem 50px;
              }
              &:focus-visible {
                transition: border-radius 0.4s linear, border 0.1s linear, font-size 0.2s linear, padding 0.1s linear;
                font-size: 1.1rem;
                border: 3px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
                padding: 0.2rem 0 0.2rem 50px;
              }
            }
            .search-icon {
              transition: 0.1s linear;
              font-size: 1.6rem;
              position: absolute;
              top: 16px;
              left: 10px;
            }
            &:hover {
              .search-icon {
                color: ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
                font-size: 1.9rem;
                top: 13px;
              }
            }
            &:focus-visible {
              .search-icon {
                font-size: 1.6rem;
              }
            }
          }
          .filter-button {
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
            font-size: 1rem;
            border: 3px solid ${({ theme }) => theme.color1};
            border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "2.9rem")};
            transition: border-radius 0.4s linear font-size 0.1s linear;
            .button-text-wrapper {
              width: 18rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .filter-icon {
              font-size: 1.4rem;
              margin-right: 0;
              transition: 0.1s linear;
            }
            &:hover {
              font-size: 1.1rem;
              border-width: 3px;
              .filter-icon {
                font-size: 2rem;
              }
            }
          }
        }
      }
      .pagination-wrapper {
        padding: 4rem 0 12rem;
      }
    }
  }
  @media (min-width: 990px) {
    .container {
      max-width: 790px;
    }
  }
`;
