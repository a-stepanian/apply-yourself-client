import styled from "styled-components";
import { FaAngleLeft, FaAnglesLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

export const Pagination = (props: IPaginationProps) => {
  const { currentPage, setCurrentPage, isLoading } = props;

  return (
    <Wrapper>
      <button
        type="button"
        className="pagination-button arrow-button hide-xs"
        disabled={currentPage <= 1 || isLoading}
        onClick={() => {
          setCurrentPage(currentPage < 5 ? 1 : currentPage - 5);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
        <FaAnglesLeft />
      </button>

      <button
        type="button"
        className="pagination-button arrow-button"
        disabled={currentPage <= 1 || isLoading}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
        <FaAngleLeft />
      </button>
      {currentPage > 2 && (
        <button
          type="button"
          disabled={isLoading}
          className="pagination-button hide-xs"
          onClick={() => {
            setCurrentPage(currentPage - 2);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
          {currentPage - 2}
        </button>
      )}
      {currentPage > 1 && (
        <button
          type="button"
          disabled={isLoading}
          className="pagination-button"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>
          {currentPage - 1}
        </button>
      )}
      <button type="button" disabled className="pagination-button">
        {currentPage}
      </button>
      <button
        type="button"
        disabled={isLoading}
        className="pagination-button"
        onClick={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
        {currentPage + 1}
      </button>
      <button
        type="button"
        disabled={isLoading}
        className="pagination-button hide-xs"
        onClick={() => {
          setCurrentPage(currentPage + 2);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
        {currentPage + 2}
      </button>
      <button
        type="button"
        disabled={isLoading}
        className="pagination-button arrow-button"
        onClick={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
        <FaAngleRight />
      </button>
      <button
        type="button"
        disabled={isLoading}
        className="pagination-button arrow-button hide-xs"
        onClick={() => {
          setCurrentPage(currentPage + 5);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}>
        <FaAnglesRight />
      </button>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  display: flex;
  .pagination-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 32px;
    color: ${({ theme }) => theme.primaryBackgroundColor};
    background-color: ${({ theme }) => theme.color1};
    border: 1px solid ${({ theme }) => theme.color1};
    border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "16px")};
    margin: 0 0.5rem 1rem;
    transition: 0.1s linear;
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color1};
      background-color: ${({ theme }) => theme.primaryBackgroundColor};
    }
    &:disabled {
      cursor: default;
      color: ${({ theme }) => theme.primaryBackgroundColor};
      background-color: ${({ theme }) => theme.color1};
      opacity: 0.5;
    }
  }
  .hide-xs {
    display: none;
  }
  .arrow-button {
    border: 1px solid ${({ theme }) => theme.color1};
  }
  @media (min-width: 480px) {
    .hide-xs {
      display: flex;
    }
  }
`;
