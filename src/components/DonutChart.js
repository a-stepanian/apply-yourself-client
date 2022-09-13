import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

const DonutChart = ({ totals }) => {
  return (
    <Wrapper>
      <h1>Application Status</h1>
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
  position: relative;
  z-index: 2;
  .chart-wrapper {
    box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);
  }
`;

export default DonutChart;
