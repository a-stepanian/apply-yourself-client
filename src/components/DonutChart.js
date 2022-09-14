import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

const DonutChart = ({ totals }) => {
  return (
    <Wrapper>
      <h3>Application Status</h3>
      <div className="chart-wrapper">
        <Chart
          type="doughnut"
          data={{
            labels: ["waiting", "declined", "interview"],
            datasets: [
              {
                label: "This is the chart",
                data: [
                  totals.totalWaiting,
                  totals.totalDeclined,
                  totals.totalInterview,
                ],
                backgroundColor: [
                  "rgb(54, 162, 235)",
                  "rgb(255, 99, 132)",
                  "rgb(50, 235, 86)",
                ],
                hoverOffset: 20,
              },
            ],
          }}
          options={{
            layout: {
              padding: "20",
            },
            plugins: {
              title: {
                text: "Application Status",
              },
            },
          }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
  padding: 1rem;
  position: relative;
  z-index: 1;
  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .chart-wrapper {
    box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);
  }
  @media (min-width: 600px) {
    width: 70%;
  }
  @media (min-width: 700px) {
    width: 50%;
  }
  @media (min-width: 990px) {
    width: 34%;
  }
`;

export default DonutChart;
