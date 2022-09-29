import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

const DonutChart = ({ totals }) => {
  return (
    <Wrapper>
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
            padding: "0",
          },
          plugins: {
            title: {
              text: "Application Status",
            },
          },
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  position: relative;
  z-index: 1;

  @media (min-width: 480px) {
    width: 30%;
  }
`;

export default DonutChart;
