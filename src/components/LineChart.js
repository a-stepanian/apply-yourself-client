import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const LineChart = ({ monthlyCount }) => {
  const [monthlyData, setmonthlyData] = useState([]);

  useEffect(() => {
    setmonthlyData([
      monthlyCount.july,
      monthlyCount.august,
      monthlyCount.september,
      monthlyCount.october,
      monthlyCount.november,
      monthlyCount.december,
    ]);
  }, [monthlyCount]);

  return (
    <Wrapper>
      <div className="chart-wrapper">
        <Chart
          type="line"
          data={{
            labels: [
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Monthly Applications",
                data: monthlyData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 8,
              },
            ],
          }}
          options={{
            animations: {
              tension: {
                duration: 2000,
                easing: "linear",
                from: 0.4,
                to: 0,
                loop: true,
              },
            },
            scales: {
              y: {
                min: 0,
                max: monthlyData.max,
              },
            },
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
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;

  @media (min-width: 480px) {
    width: 70%;
  }
  @media (min-width: 768px) {
    width: 60%;
  }
`;

export default LineChart;
