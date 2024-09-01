import styled from "styled-components";
import { FaAngleLeft, FaAnglesLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  isLoading: boolean;
}

export const Pagination = (props: IPaginationProps) => {
  const { currentPage, setCurrentPage, totalPages, isLoading } = props;

  return (
    <Wrapper>
      <p className="animate-in">
        Page {currentPage} / {totalPages}
      </p>
      <section>
        {currentPage > 1 && (
          <>
            <button
              type="button"
              className="pagination-button arrow-button hide-xs"
              disabled={isLoading}
              onClick={() => {
                setCurrentPage(currentPage < 5 ? 1 : currentPage - 5);
                window.scrollTo({ top: 0 });
              }}>
              <FaAnglesLeft />
            </button>
            <button
              type="button"
              className="pagination-button arrow-button"
              disabled={isLoading}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0 });
              }}>
              <FaAngleLeft />
            </button>
          </>
        )}

        {currentPage > 2 && (
          <button
            type="button"
            disabled={isLoading}
            className="pagination-button hide-xs"
            onClick={() => {
              setCurrentPage(currentPage - 2);
              window.scrollTo({ top: 0 });
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
              window.scrollTo({ top: 0 });
            }}>
            {currentPage - 1}
          </button>
        )}
        <button type="button" disabled className="pagination-button">
          {currentPage}
        </button>
        {totalPages > 1 && currentPage < totalPages && (
          <button
            type="button"
            disabled={isLoading}
            className="pagination-button"
            onClick={() => {
              setCurrentPage(currentPage + 1);
              window.scrollTo({ top: 0 });
            }}>
            {currentPage + 1}
          </button>
        )}
        {totalPages > 2 && currentPage + 1 < totalPages && (
          <button
            type="button"
            disabled={isLoading}
            className="pagination-button hide-xs"
            onClick={() => {
              setCurrentPage(currentPage + 2);
              window.scrollTo({ top: 0 });
            }}>
            {currentPage + 2}
          </button>
        )}
        {currentPage < totalPages && (
          <>
            <button
              type="button"
              disabled={isLoading || currentPage >= totalPages}
              className="pagination-button arrow-button"
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0 });
              }}>
              <FaAngleRight />
            </button>
            <button
              type="button"
              disabled={isLoading || currentPage >= totalPages}
              className="pagination-button arrow-button hide-xs"
              onClick={() => {
                if (currentPage + 5 >= totalPages) {
                  setCurrentPage(totalPages);
                } else {
                  setCurrentPage(currentPage + 5);
                }
                window.scrollTo({ top: 0 });
              }}>
              <FaAnglesRight />
            </button>
          </>
        )}
      </section>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  > p {
    margin-bottom: 1rem;
  }
  section {
    display: flex;
  }
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
