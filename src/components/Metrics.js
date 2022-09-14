import React, { useEffect, useState } from "react";
import { CgGhostCharacter } from "react-icons/cg";
import { MdTimer } from "react-icons/md";
import { RiReplyLine, RiStackLine } from "react-icons/ri";
import styled from "styled-components";

const Metrics = ({ allApps, respTime, waitTime }) => {
  const [count, setCount] = useState({
    totalApplications: 0,
    responses: 0,
    noresponse: 0,
    time: 0,
  });

  const avgRespTime =
    respTime.reduce((total, next) => total + next.difference, 0) /
    respTime.length;

  const countSpeed = 30;

  // counting effect for the metrics
  useEffect(() => {
    for (let i = 0; i <= allApps.length; i++) {
      setTimeout(() => {
        setCount((prev) => {
          return { ...prev, totalApplications: i };
        });
      }, countSpeed * i + 500);
    }
  }, [allApps]);

  useEffect(() => {
    for (let i = 0; i <= respTime.length; i++) {
      setTimeout(() => {
        setCount((prev) => {
          return { ...prev, responses: i };
        });
      }, countSpeed * i + 500);
    }
  }, [respTime]);

  useEffect(() => {
    for (let i = 0; i <= waitTime.length; i++) {
      setTimeout(() => {
        setCount((prev) => {
          return { ...prev, noresponse: i };
        });
      }, countSpeed * i + 500);
    }
  }, [waitTime]);

  useEffect(() => {
    for (let i = 0; i <= avgRespTime; i++) {
      setTimeout(() => {
        setCount((prev) => {
          return { ...prev, time: i };
        });
      }, countSpeed * i + 500);
    }
  }, [avgRespTime]);

  return (
    <Wrapper>
      <h3>Application Insights</h3>
      <div className="row">
        <article className="metric">
          <h4>Total Applications</h4>
          <RiStackLine className="icon" />
          <p>{count.totalApplications}</p>
        </article>
        <article className="metric">
          <h4>Responses</h4>
          <RiReplyLine className="icon" />
          <p>{count.responses}</p>
        </article>
        <article className="metric">
          <h4>No Response</h4>
          <CgGhostCharacter className="icon" />
          <p>{count.noresponse}</p>
        </article>
        <article className="metric">
          <h4>Avg Response Time</h4>
          <MdTimer className="icon" />
          <p>{count.time} days</p>
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  margin: 2rem 0;
  padding: 1rem;
  position: relative;

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
    width: 80%;
    height: 0;
    overflow: hidden;
    display: flex;
    margin: 0 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    animation: grow 0.5s forwards;
    @keyframes grow {
      0% {
        height: 0;
        margin: 0 1rem;
      }
      100% {
        height: 10rem;
        margin: 1rem;
      }
    }
    &:nth-of-type(1) {
      background-color: rgba(200, 220, 255, 0.8);
    }
    &:nth-of-type(2) {
      background-color: rgba(215, 210, 255, 0.8);
    }
    &:nth-of-type(3) {
      background-color: rgba(235, 243, 200, 0.8);
    }
    &:nth-of-type(4) {
      position: relative;
      background: linear-gradient(
        rgba(215, 210, 255, 0.8),
        rgba(200, 220, 255, 0.8),
        rgba(235, 243, 200, 0.8)
      );
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
  @media (min-width: 768px) {
    .row {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .metric {
      width: 45%;
    }
  }
  @media (min-width: 990px) {
    align-self: center;
  }
  @media (min-width: 1200px) {
    .metric {
      margin: 0;
      width: 20%;
    }
  }
`;

export default Metrics;
