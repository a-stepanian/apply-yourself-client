import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LineDesign from "./LineDesign";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";

const Dashboard = () => {
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

  // Fetch all apps from DB
  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch(
        "https://server-apply-yourself.herokuapp.com/applications"
      );
      // const response = await fetch("http://localhost:5000/applications/");
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const data = await response.json();
      setAllApps(data);
    };
    fetchApps();
    return;
  }, []);

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
    calcMonthlySubmissions();
    calculateTotals();
  }, [allApps]);

  return (
    <Wrapper>
      <header className="title">
        <h2>DASHBOARD</h2>
      </header>
      <LineDesign />
      <div className="dashboard-wrapper">
        <LineChart monthlyCount={monthlyCount} />
        <DonutChart totals={totals} />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 10rem;
    background: url("https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Josefin Slab", serif;
    font-size: 2rem;
  }
  .dashboard-wrapper {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 990px) {
    .title {
      height: 20rem;
      font-size: 4rem;
    }
  }

  @media (min-width: 990px) {
    .dashboard-wrapper {
      margin: 5rem 0;
      align-self: center;
      width: 90%;
      flex-direction: row;
    }
  }

  @media (min-width: 1200px) {
    .dashboard-wrapper {
      width: 80%;
    }
  }
`;

export default Dashboard;
