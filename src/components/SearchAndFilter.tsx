import styled from "styled-components";
import { LuFilter, LuSearch } from "react-icons/lu";
import { IAppliedFilter, IFilter } from "../pages/CompaniesPage";
import { useState } from "react";

interface ISearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filters?: IFilter[];
  setFilters?: React.Dispatch<React.SetStateAction<[]>>;
  appliedFilters: IAppliedFilter;
  setAppliedFilters: React.Dispatch<React.SetStateAction<IAppliedFilter>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchFunction: () => Promise<void>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  placeholder?: string;
}

export const SearchAndFilter = (props: ISearchAndFilterProps) => {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    searchFunction,
    currentPage,
    setCurrentPage,
    placeholder,
    filters,
    appliedFilters,
    setAppliedFilters
  } = props;
  const [showFilters, setShowFilters] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    if (currentPage === 1) {
      searchFunction();
    }
    setCurrentPage(1);
  }

  return (
    <Wrapper>
      <div className="search-wrapper">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="input-wrapper">
            <label style={{ display: "none" }} htmlFor="company">
              Filter by Company
            </label>
            <input
              className="search-input"
              type="text"
              name="company"
              value={searchTerm}
              placeholder={placeholder ?? "Search"}
              disabled={isLoading}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button" onSubmit={e => handleSubmit(e)}>
              <LuSearch className="search-icon" />
            </button>
          </div>
        </form>
        <button className="filter-button" type="button" onClick={() => setShowFilters(prev => !prev)}>
          <div className="button-text-wrapper">
            <span>Filters</span>
            <LuFilter className="filter-icon" />
          </div>
        </button>
      </div>
      <div className="filters">
        {filters &&
          showFilters &&
          filters.map(x => {
            return (
              <>
                <label>{x.filterName}</label>
                <select
                  key={x.filterName}
                  value={
                    x.filterName.toLowerCase() === "industry" ? appliedFilters?.industry : appliedFilters?.location
                  }
                  onChange={e => {
                    setAppliedFilters(prev => {
                      return {
                        ...prev,
                        [x.filterName.toLowerCase()]: e.target.value
                      };
                    });
                  }}>
                  {x.filterValues.length > 0 &&
                    x.filterValues.map(y => {
                      return <option key={y}>{y}</option>;
                    })}
                  <option value={""} disabled></option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedFilters(prev => {
                      return {
                        ...prev,
                        [x.filterName.toLowerCase()]: ""
                      };
                    });
                  }}>
                  clear
                </button>
              </>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    .search-button {
      cursor: pointer;
      .search-icon {
        color: ${({ theme }) => theme.color1};
        font-size: 1.2rem;
        position: absolute;
        top: 9px;
        left: 8px;
      }
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

  @media (min-width: 768px) {
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
          &:hover,
          &:focus-visible {
            font-size: 1.1rem;
            border: 3px solid ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
            padding: 0.16rem 0 0.24rem 50px;
          }
        }
        .search-button {
          .search-icon {
            color: ${({ theme }) => theme.color1};
            transition: 0.1s linear;
            font-size: 1.6rem;
            position: absolute;
            top: 16px;
            left: 10px;
          }
        }
        &:hover {
          .search-button {
            .search-icon {
              color: ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
              font-size: 1.9rem;
              top: 13px;
            }
          }
        }
        .search-input:focus-visible + .search-button .search-icon {
          color: ${({ theme }) => (theme.name === "darkMode" ? theme.color1 : theme.primaryBlue)};
          font-size: 1.9rem;
          top: 13px;
        }
      }
      .filter-button {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        font-size: 1rem;
        border: 3px solid ${({ theme }) => theme.color1};
        border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "2.9rem")};
        transition: border-radius 0.4s linear, font-size 0.1s linear;
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
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;
