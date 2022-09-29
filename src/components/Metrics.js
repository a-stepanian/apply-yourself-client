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
        <p>
          {count.time} <span>days</span>
        </p>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .metric {
    font-family: "Josefin Slab", serif;
    font-weight: 900;
    width: calc(50% - 1rem);
    padding-top: 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    animation: grow 0.5s forwards;
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
      background: linear-gradient(
        rgba(215, 210, 255, 0.8),
        rgba(200, 220, 255, 0.8),
        rgba(235, 243, 200, 0.8)
      );
    }
    h4 {
      height: 2.2rem;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      text-align: center;
    }
    .icon {
      font-size: 2rem;
    }
    p {
      font-size: 2rem;
      display: flex;
      align-items: center;
      span {
        margin-left: 0.3rem;
        font-size: 1.5rem;
        transform: translateY(0.05rem);
      }
    }
  }

  //--------------
  // Media queries
  //--------------
  @media (min-width: 480px) {
    .metric {
      width: 21%;
    }
  }
  @media (min-width: 768px) {
    flex-direction: column;
    .metric {
      width: 100%;
    }
  }

  //--------------
  // Animations
  //--------------
  @keyframes grow {
    0% {
      height: 0;
      margin: 0 0.5rem;
    }
    100% {
      height: 7rem;
      margin: 0.5rem;
    }
  }
`;

export default Metrics;
