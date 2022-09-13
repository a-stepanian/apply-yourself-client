import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LineDesign from "./LineDesign";

const Dashboard = () => {
  const [allApps, setAllApps] = useState([]);
  const [totals, setTotals] = useState({
    total: 0,
    totalWaiting: 0,
    totalDeclined: 0,
    totalInterview: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

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
      console.log(totalInterview);
      setTotals({
        total,
        totalWaiting,
        totalDeclined,
        totalInterview,
      });
    };
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
    </Wrapper>
  );
};
const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
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
