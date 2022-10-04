import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { RiFilter3Line, RiCloseLine } from "react-icons/ri";

const Filter = ({ setFilter }) => {
  const [open, setOpen] = useState(false);

  const openFilter = () => {
    if (open) setOpen(false);
    if (!open) setOpen(true);
  };

  return (
    <Wrapper>
      <button className="filter-btn" type="button" onClick={() => openFilter()}>
        Filter{" "}
        {open ? (
          <RiCloseLine className="icon" />
        ) : (
          <RiFilter3Line className="icon" />
        )}
      </button>
      {open && (
        <div className="filter-input">
          <label htmlFor="status">Application Status</label>
          <select
            name="status"
            id="status"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Applied">Waiting</option>
            <option value="Interview">Interview</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 40%;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;

  .filter-input {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding-top: 0.3rem;
    font-size: 0.8rem;
  }
  select {
    width: 6.6rem;
    margin-top: 0.5rem;
  }

  .filter-btn {
    font-family: "Playfair Display", serif;
    position: relative;
    z-index: 1;
    height: 2rem;
    width: 5rem;
    color: black;
    background-color: transparent;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    .icon {
      font-size: 1.3rem;
    }
  }
`;

export default Filter;
