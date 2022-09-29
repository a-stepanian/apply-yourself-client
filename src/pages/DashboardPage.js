import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import LineDesign from "../components/LineDesign";
import DonutChart from "../components/DonutChart";
import LineChart from "../components/LineChart";
import Metrics from "../components/Metrics";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ApplicationSection from "../components/ApplicationSection";

const DashboardPage = () => {
  const [allApps, setAllApps] = useState([]);
  const [totals, setTotals] = useState({
    total: 0,
    totalWaiting: 0,
    totalDeclined: 0,
    totalInterview: 0,
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
    december: 0,
  });
  const [respTime, setRespTime] = useState([]);
  const [waitTime, setWaitTime] = useState([]);
  const navigate = useNavigate();

  const { applications, loggedIn } = useContext(AuthContext);

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
      const totalWaiting = allApps.filter(
        (app) => app.status === "Applied"
      ).length;
      const totalDeclined = allApps.filter(
        (app) => app.status === "Declined"
      ).length;
      const totalInterview = allApps.filter(
        (app) => app.status === "Interview"
      ).length;
      setTotals({
        total,
        totalWaiting,
        totalDeclined,
        totalInterview,
      });
    };
    const calcMonthlySubmissions = () => {
      const thisYearApps = allApps.filter(
        (app) => app.applied.slice(0, 4) === "2022"
      );
      const januaryApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "01"
      ).length;
      const februaryApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "02"
      ).length;
      const marchApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "03"
      ).length;
      const aprilApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "04"
      ).length;
      const mayApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "05"
      ).length;
      const juneApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "06"
      ).length;
      const julyApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "07"
      ).length;
      const augustApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "08"
      ).length;
      const septemberApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "09"
      ).length;
      const octoberApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "10"
      ).length;
      const novemberApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "11"
      ).length;
      const decemberApps = thisYearApps.filter(
        (app) => app.applied.slice(5, 7) === "12"
      ).length;
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
        december: decemberApps,
      });
    };

    const calcAvgResponseTime = () => {
      // turn string date into date object
      const parseDate = (str) => {
        let ymd = str.split("-");
        let mdy = [ymd[1], ymd[2], ymd[0]];
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
      };
      // find difference in days
      const dateDiff = (responseDate, appliedDate) => {
        return Math.round((responseDate - appliedDate) / (1000 * 60 * 60 * 24));
      };
      const responseTimes = allApps.map((app) => {
        if (app.response) {
          const responseDate = parseDate(app.response);
          const appliedDate = parseDate(app.applied);
          const difference = dateDiff(responseDate, appliedDate);
          return {
            company: app.company,
            responded: true,
            difference,
          };
        } else {
          const todaysDate = new Date();
          const appliedDate = parseDate(app.applied);
          const waitTime = dateDiff(todaysDate, appliedDate);
          return {
            company: app.company,
            responded: false,
            waitTime,
          };
        }
      });
      setRespTime(responseTimes.filter((app) => app.responded === true));
      setWaitTime(responseTimes.filter((app) => app.responded === false));
    };
    calcMonthlySubmissions();
    calculateTotals();
    calcAvgResponseTime();
  }, [allApps]);

  return (
    <Wrapper>
      <LineDesign />
      <div className="metrics-section">
        <Metrics allApps={allApps} respTime={respTime} waitTime={waitTime} />
      </div>

      <div className="chart-section">
        <LineChart monthlyCount={monthlyCount} />
        <DonutChart totals={totals} />
      </div>
      <div className="application-section">
        <ApplicationSection />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  overflow-x: hidden;
  .chart-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 480px) {
    .chart-section {
      margin: 1rem;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: auto;
    .chart-section {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .application-section {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .metrics-section {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }
`;

export default DashboardPage;
