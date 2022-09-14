import React from "react";
import { BiCalendarX, BiCalendar } from "react-icons/bi";
import { CgGhostCharacter } from "react-icons/cg";
import { RiReplyLine, RiStackLine } from "react-icons/ri";
import styled from "styled-components";

const Metrics = ({ allApps, respTime, waitTime }) => {
  return (
    <Wrapper>
      <h3>Application Insights</h3>
      <div className="row">
        <article className="metric">
          <h4>Total Applications</h4>
          <RiStackLine className="icon" />
          <p>{allApps.length}</p>
        </article>
        <article className="metric">
          <h4>Responses</h4>
          <RiReplyLine className="icon" />
          <p>{respTime.length}</p>
        </article>
        <article className="metric">
          <h4>No Response</h4>
          <CgGhostCharacter className="icon" />
          <p>{waitTime.length}</p>
        </article>
      </div>

      <div className="misc">
        <h4>
          total responses: <RiReplyLine /> {respTime.length}
        </h4>
        <h4>
          average response time <BiCalendar />: reduce
        </h4>
        <h4>min response time</h4>
        <h4>max response time</h4>
        <h4>
          companies with no response and days since application <BiCalendarX />
        </h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 4rem 2rem;
  padding: 3rem 1rem;
  position: relative;
  z-index: 1;
  box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .metric {
    width: 10rem;
    height: 10rem;
    display: flex;
    margin: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    &:nth-of-type(1) {
      background-color: rgba(200, 220, 255, 0.4);
    }
    &:nth-of-type(2) {
      background-color: rgba(215, 210, 255, 0.4);
    }
    &:nth-of-type(3) {
      background-color: rgba(235, 243, 200, 0.4);
    }
    h4 {
      font-size: 1rem;
      margin-bottom: 0.8rem;
    }
    p {
      font-family: "Josefin Slab", serif;
      font-weight: 900;
      font-size: 3rem;
    }
    .icon {
      font-size: 2.5rem;
      transform: translateY(-0.3rem);
    }
  }
  @media (min-width: 600px) {
    .row {
      flex-direction: row;
      justify-content: space-between;
    }
    .metric {
      margin: 0;
      width: 30%;
    }
  }
  @media (min-width: 768px) {
    .metric {
      h4 {
        font-size: 1.2rem;
      }
    }
  }
  @media (min-width: 990px) {
    .metric {
      h4 {
        font-size: 1.4rem;
      }
    }
  }
`;

export default Metrics;
