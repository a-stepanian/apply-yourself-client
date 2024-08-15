import React, { useEffect, useState } from "react";
import { CgGhostCharacter } from "react-icons/cg";
import { MdTimer } from "react-icons/md";
import { RiReplyLine, RiStackLine } from "react-icons/ri";
import styled from "styled-components";
import { IApplicationModel } from "../interfaces/interfaces";
import { IResponseTime, IWaitTime } from "../pages/DashboardPage";

interface IMetricsProps {
  allApps: IApplicationModel[];
  respTime: IResponseTime[];
  waitTime: IWaitTime[];
}

export const Metrics = (props: IMetricsProps) => {
  const { allApps, respTime, waitTime } = props;

  const [count, setCount] = useState({
    totalApplications: 0,
    responses: 0,
    noresponse: 0,
    time: 0
  });

  const avgRespTime = respTime?.reduce((total: number, next: any) => total + next.difference, 0) / respTime.length;

  const countSpeed = 70;

  // counting effect for the metrics
  useEffect(() => {
    for (let i = 0; i <= allApps.length; i++) {
      setTimeout(() => {
        setCount(prev => {
          return { ...prev, totalApplications: i };
        });
      }, countSpeed * i + 500);
    }
  }, [allApps]);

  useEffect(() => {
    for (let i = 0; i <= respTime.length; i++) {
      setTimeout(() => {
        setCount(prev => {
          return { ...prev, responses: i };
        });
      }, countSpeed * i + 500);
    }
  }, [respTime]);

  useEffect(() => {
    for (let i = 0; i <= waitTime.length; i++) {
      setTimeout(() => {
        setCount(prev => {
          return { ...prev, noresponse: i };
        });
      }, countSpeed * i + 500);
    }
  }, [waitTime]);

  useEffect(() => {
    for (let i = 0; i <= avgRespTime; i++) {
      setTimeout(() => {
        setCount(prev => {
          return { ...prev, time: i };
        });
      }, countSpeed * i + 500);
    }
  }, [avgRespTime]);

  return (
    <Wrapper>
      <article className="metric">
        <RiStackLine className="icon" />
        <p>{count.totalApplications}</p>
        <h4>Total Applications</h4>
      </article>

      <article className="metric">
        <MdTimer className="icon" />
        <p>{count.time}</p>
        <h4>Avg Response Time</h4>
      </article>

      <article className="metric">
        <RiReplyLine className="icon" />
        <p>{count.responses}</p>
        <h4>Responses</h4>
      </article>

      <article className="metric">
        <CgGhostCharacter className="icon" />
        <p>{count.noresponse}</p>
        <h4>No Response</h4>
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
    position: relative;
    height: 5rem;
    width: calc(50% - 1.2rem);
    margin: 0.2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:nth-of-type(1) {
      background-color: rgba(200, 220, 255, 0.8);
    }
    &:nth-of-type(2) {
      background: linear-gradient(rgba(215, 210, 255, 0.8), rgba(200, 220, 255, 0.8), rgba(235, 243, 200, 0.8));
    }
    &:nth-of-type(3) {
      background-color: rgba(235, 243, 200, 0.8);
    }

    &:nth-of-type(4) {
      background-color: rgba(215, 210, 255, 0.8);
    }
    h4 {
      font-size: 0.9rem;
    }
    .icon {
      color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      font-size: 1.2rem;
    }

    p {
      font-weight: 900;
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
      width: 6.5rem;
      h4 {
        text-align: center;
      }
    }
  }
  @media (min-width: 990px) {
    .metric {
      width: calc(50% - 1rem);
    }
  }

  //--------------
  // Animations
  //--------------
  @keyframes grow {
    0% {
      border-radius: 50%;
    }
    100% {
      border-radius: 0;
    }
  }
`;
