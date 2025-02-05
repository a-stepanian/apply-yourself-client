import { useEffect, useState } from "react";
import styled from "styled-components";
import { url, useAppContext } from "../context/AppContext";
import { JobListing } from "../components/JobListing";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { IAppliedFilter } from "./CompaniesPage";

export const JobsPage = () => {
  const { applications } = useAppContext();
  const [appliedFilters, setAppliedFilters] = useState<IAppliedFilter>({ industry: "", location: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageData, setPageData] = useState<any>({});

  let jobIds: string[] = [];
  if (applications?.length > 0) {
    jobIds = applications.map(x => x.job);
  }

  useEffect(() => {
    searchJobs();
  }, [currentPage]);

  async function searchJobs(): Promise<void> {
    setIsLoading(true);
    const pageQuery = `?page=${currentPage.toString()}`;
    const searchQuery = searchTerm.length > 0 ? `&search=${searchTerm}` : "";
    try {
      const response = await fetch(`${url}/jobs${pageQuery}${searchQuery}`);
      const data = await response.json();
      setPageData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <section className="container">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          searchFunction={() => searchJobs()}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          placeholder="Industrial Engineer"
          appliedFilters={{ industry: "", location: "" }}
          setAppliedFilters={setAppliedFilters}
        />
        <Pagination
          totalPages={parseInt(pageData?.pages ?? 0)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
        />
        {isLoading ? (
          <div className="loading-wrapper">
            <Loading />
          </div>
        ) : pageData?.data?.length > 0 ? (
          <>
            {pageData.data.map((x: any, index: number) => (
              <JobListing key={x._id ?? index} job={x} applied={jobIds.includes(x._id)} />
            ))}
            <div className="pagination-wrapper">
              <Pagination
                totalPages={parseInt(pageData?.pages ?? 0)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoading={isLoading}
              />
            </div>
          </>
        ) : (
          <p>No results found.</p>
        )}
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
    .pagination-wrapper {
      padding: 4rem 0 10rem;
    }
    .loading-wrapper {
      min-height: calc(100vh - 150px);
    }
  }

  @media (min-width: 768px) {
    .container {
      max-width: 80vw;
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
