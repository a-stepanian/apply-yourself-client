import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { DonutChart } from "../components/DonutChart.tsx";
import { LineChart } from "../components/LineChart.tsx";
import { Metrics } from "../components/Metrics.tsx";
import { useAuthContext } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { ApplicationSection } from "../components/ApplicationSection.tsx";
import { IApplicationModel } from "../models/models";

export const DashboardPage = () => {
  const [allApps, setAllApps] = useState([]);
  const [totals, setTotals] = useState({
    total: 0,
    totalWaiting: 0,
    totalDeclined: 0,
    totalInterview: 0
  });
  const [monthlyCount, setMonthlyCount] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  });
  const [respTime, setRespTime] = useState([]);
  const [waitTime, setWaitTime] = useState([]);
  const navigate = useNavigate();

  const { applications, loggedIn } = useAuthContext();

  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  useEffect(() => {
    setAllApps(applications);
  }, [applications]);

  // calculations for dashboard
  useEffect(() => {
    const calculateTotals = () => {
      const total = allApps.length;
      const totalWaiting = allApps.filter((app: IApplicationModel) => app?.status === "Applied").length;
      const totalDeclined = allApps.filter((app: IApplicationModel) => app?.status === "Declined").length;
      const totalInterview = allApps.filter((app: IApplicationModel) => app?.status === "Interview").length;
      setTotals({
        total,
        totalWaiting,
        totalDeclined,
        totalInterview
      });
    };
    const calcMonthlySubmissions = () => {
      const thisYearApps = allApps.filter((app: IApplicationModel) => app?.applied?.slice(0, 4) === "2022");
      const januaryApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "01").length;
      const februaryApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "02").length;
      const marchApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "03").length;
      const aprilApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "04").length;
      const mayApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "05").length;
      const juneApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "06").length;
      const julyApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "07").length;
      const augustApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "08").length;
      const septemberApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "09").length;
      const octoberApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "10").length;
      const novemberApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "11").length;
      const decemberApps = thisYearApps.filter((app: IApplicationModel) => app?.applied?.slice(5, 7) === "12").length;
      setMonthlyCount({
        january: januaryApps,
        february: februaryApps,
        march: marchApps,
        april: aprilApps,
        may: mayApps,
        june: juneApps,
        july: julyApps,
        august: augustApps,
        september: septemberApps,
        october: octoberApps,
        november: novemberApps,
        december: decemberApps
      });
    };

    const calcAvgResponseTime = () => {
      // turn string date into date object
      const parseDate = str => {
        let ymd = str.split("-");
        let mdy = [ymd[1], ymd[2], ymd[0]];
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
      };
      // find difference in days
      const dateDiff = (responseDate, appliedDate) => {
        return Math.round((responseDate - appliedDate) / (1000 * 60 * 60 * 24));
      };
      const responseTimes = allApps.map((app: IApplicationModel) => {
        if (app.response) {
          const responseDate = parseDate(app.response);
          const appliedDate = parseDate(app?.applied);
          const difference = dateDiff(responseDate, appliedDate);
          return {
            company: app.company,
            responded: true,
            difference
          };
        } else {
          const todaysDate = new Date();
          const appliedDate = parseDate(app?.applied);
          const waitTime = dateDiff(todaysDate, appliedDate);
          return {
            company: app.company,
            responded: false,
            waitTime
          };
        }
      });
      // setRespTime(responseTimes?.filter((app) => app?.responded === true));
      // setWaitTime(responseTimes?.filter((app) => app?.responded === false));
    };
    calcMonthlySubmissions();
    calculateTotals();
    calcAvgResponseTime();
  }, [allApps]);

  if (totals.total === 0) {
    return <ApplicationSection />;
  }

  return (
    <Wrapper>
      <section className="dashboard-section">
        <div className="metrics-section">
          <Metrics allApps={allApps} respTime={respTime} waitTime={waitTime} />
        </div>

        <div className="chart-section">
          <LineChart monthlyCount={monthlyCount} />
          <DonutChart totals={totals} />
        </div>
      </section>

      <section className="application-section">
        <ApplicationSection />
      </section>
    </Wrapper>
  );
};

// @ts-ignore
const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dashboard-section {
    background-color: var(--white);
    margin: 1rem;
    width: 100%;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 40rem;
    h2 {
      text-align: center;
    }
    .chart-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .application-section {
    width: 100%;
  }

  @media (min-width: 480px) {
    .dashboard-section {
      .chart-section {
        margin: 0 1rem 1rem;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
      }
    }
  }

  @media (min-width: 990px) {
    flex-direction: row;
    align-items: flex-start;

    .dashboard-section {
      margin: 0;
      padding-top: 1rem;
      height: 100vh;
      width: 20rem;
      position: sticky;
      z-index: 1;
      top: 0;
      box-shadow: 4px -2px 8px rgba(0, 0, 0, 0.1);
      .chart-section {
        flex-direction: column;
      }
    }
  }
`;
