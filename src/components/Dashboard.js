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
      <LineDesign />
      <section className="data">
        <h1>Dashboard</h1>
        <h2>Total: {totals.total}</h2>
        <h2>Total interview: {totals.totalInterview}</h2>
        <h2>Total waiting: {totals.totalWaiting}</h2>
        <h2>Total declined: {totals.totalDeclined}</h2>
      </section>
      <DonutChart totals={totals} />
      <LineChart monthlyCount={monthlyCount} />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .data {
    position: relative;
    z-index: 1;
  }
`;

export default Dashboard;
