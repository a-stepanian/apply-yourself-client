import React from "react";
import styled from "styled-components";

const Filter = ({ setFilter }) => {
  return (
    <Wrapper>
      <label htmlFor="status">Application Status</label>
      <select
        name="status"
        id="status"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  select {
    padding: 0.2rem;
  }
`;

export default Filter;
