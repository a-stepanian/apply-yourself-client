import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { ICompanyResult } from "../interfaces/interfaces";
import { FaArrowRight } from "react-icons/fa6";
import { useRef } from "react";

interface ICompanyListingProps {
  company: ICompanyResult;
}

export const CompanyListing = (props: ICompanyListingProps) => {
  const { company } = props;

  const imgRef = useRef<HTMLImageElement>(null);
  const { setSelectedCompany, setShowModal } = useAppContext();

  const handleError = () => {
    if (imgRef.current) {
      imgRef.current.src = "/company-image-fallback-cropped.svg"; // Replace with your fallback image path
      imgRef.current.alt = "Generic Company Image"; // Replace with your fallback image path
      imgRef.current.title = "Generic Company Image"; // Replace with your fallback image path
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <div className="card-header">
          <div className="logo-wrapper">
            {company?.refs?.logo_image?.length > 0 && (
              <img
                ref={imgRef}
                src={company.refs.logo_image}
                alt={company.name}
                className="logo"
                onError={handleError}
              />
            )}
          </div>
        </div>
        <div className="flex">
          <div>
            <h2>{company.name}</h2>
            <h3>{company?.industries[0]?.name}</h3>
          </div>
          <button
            type="button"
            className="jobs-button"
            title={`View All ${company.name} Jobs`}
            onClick={() => {
              setSelectedCompany(company);
              setShowModal(true);
            }}>
            Jobs&nbsp;
            <FaArrowRight />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => (theme.name === "darkMode" ? "transparent" : theme.color1)};
  width: 100%;
  max-width: 500px;
  border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "32px")};
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.secondaryBackgroundColor};
  transition: 0.4s linear;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  .card {
    .card-header {
      color: #eee;
      margin: 1rem;
      border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px 3px 3px 3px" : "16px 16px 3px 3px")};
      transition: 0.4s linear;
      .logo-wrapper {
        padding: 0.5rem;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fafafa;
        border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px 3px 3px 3px" : "14px 14px 3px 3px")};
        transition: 0.4s linear;
        .logo {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .flex {
      padding: 0 1rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: 0.4s linear;
      color: ${({ theme }) => (theme.name === "darkMode" ? "#eee" : theme.color2)};
      h2 {
        font-family: "Poppins", sans-serif;
        font-size: 0.8rem;
        font-weight: 400;
      }
      h3 {
        font-family: "Poppins", sans-serif;
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.2px;
      }
      .jobs-button {
        padding: 0.5rem 1rem;
        border-radius: 3px;
        color: ${({ theme }) => theme.primaryBackgroundColor};
        background: ${({ theme }) => theme.color3};
        border: 1px solid ${({ theme }) => theme.color3};
        border-radius: ${({ theme }) => (theme.name === "darkMode" ? "3px" : "1.5rem")};
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        white-space: nowrap;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.4s linear;
        &:hover {
          color: ${({ theme }) => theme.color3};
          background: transparent;
        }
        &:disabled {
          color: ${({ theme }) => theme.primaryBackgroundColor};
          background: ${({ theme }) => theme.color3};
        }
      }
    }
  }
  @media (min-width: 480px) {
    .company-and-location {
      display: flex;
      align-items: center;
      h3,
      h4 {
        white-space: nowrap;
      }
      h3 {
        margin-right: 1rem;
      }
    }
  }
`;
