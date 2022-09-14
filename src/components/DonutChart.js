import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

const DonutChart = ({ totals }) => {
  return (
    <Wrapper>
      <h2>Application Status</h2>
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
  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 0.5rem;
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
