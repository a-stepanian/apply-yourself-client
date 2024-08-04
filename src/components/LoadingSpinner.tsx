import React from "react";
import styled, { keyframes } from "styled-components";

export const LoadingSpinner: React.FC = () => {
  return (
    <Wrapper>
      <div className="loading-spinner"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.3); /* Light grey border */
    border-radius: 50%;
    border-top: 4px solid ${({ theme }) => theme.bodyBackground};
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
