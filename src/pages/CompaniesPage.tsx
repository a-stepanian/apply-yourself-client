import { useEffect, useState } from "react";
import styled from "styled-components";
import { url } from "../context/AppContext";
import { CompanyListing } from "../components/CompanyListing";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { IHasName } from "../interfaces/interfaces";

export interface IFilter {
  filterName: string;
  filterValues: string[];
}

export interface IAppliedFilter {
  industry: string;
  location: string;
}

export const CompaniesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<IAppliedFilter>({ industry: "", location: "" });
  const [pageData, setPageData] = useState<any>({});

  useEffect(() => {
    async function initializeFilters() {
      const res1 = await fetch(`${url}/industries`);
      const response1 = await res1.json();
      const industryFilterTerms = Array.from(new Set(response1.data.map((x: IHasName) => x.name))).sort() as string[];

      const res2 = await fetch(`${url}/locations`);
      const response2 = await res2.json();
      const locationFilterTerms = Array.from(new Set(response2.data.map((x: IHasName) => x.name))).sort() as string[];
      setFilters([
        { filterName: "Industry", filterValues: industryFilterTerms },
        { filterName: "Location", filterValues: locationFilterTerms }
      ]);
    }
    initializeFilters();
  }, []);

  async function searchCompanies(): Promise<void> {
    setIsLoading(true);
    const pageQuery = `?page=${currentPage.toString()}`;
    const searchQuery = searchTerm.length > 0 ? `&search=${searchTerm}` : "";
    const industryQuery = appliedFilters.industry.length > 0 ? `&industry=${appliedFilters.industry}` : "";
    const locationQuery = appliedFilters.location.length > 0 ? `&location=${appliedFilters.location}` : "";
    try {
      const response = await fetch(`${url}/companies${pageQuery}${searchQuery}${industryQuery}${locationQuery}`);
      const data = await response.json();
      setPageData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    searchCompanies();
  }, [currentPage, appliedFilters]);

  return (
    <Wrapper>
      <section className="container">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          filters={filters}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          searchFunction={() => searchCompanies()}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          placeholder="Toyota"
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
            <div className="results-wrapper">
              {pageData.data.map((x: any, index: number) => (
                <CompanyListing key={x._id ?? index} company={x} />
              ))}
            </div>
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
      .results-wrapper {
        display: grid;
        grid-template-columns: 48% 48%;
        grid-column-gap: 6%;
      }
    }
  }
  @media (min-width: 990px) {
    .container {
      max-width: 790px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 992px;
      .results-wrapper {
        grid-template-columns: 32% 32% 32%;
        grid-column-gap: 2%;
      }
    }
  }
`;
