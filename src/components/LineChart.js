import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

const LineChart = ({ monthlyCount }) => {
  return (
    <Wrapper>
      <h3>Monthly Submissions</h3>
      <div className="chart-wrapper">
        <Chart
          type="line"
          data={{
            labels: [
              "january",
              "february",
              "march",
              "april",
              "may",
              "june",
              "july",
              "august",
              "september",
              "october",
              "november",
              "december",
            ],
            datasets: [
              {
                label: "Number of Applications Submitted",
                data: [
                  monthlyCount.january,
                  monthlyCount.february,
                  monthlyCount.march,
                  monthlyCount.april,
                  monthlyCount.may,
                  monthlyCount.june,
                  monthlyCount.july,
                  monthlyCount.august,
                  monthlyCount.september,
                  monthlyCount.october,
                  monthlyCount.november,
                  monthlyCount.december,
                ],
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
                duration: 1500,
                easing: "linear",
                from: 0.4,
                to: 0.2,
                loop: true,
              },
            },
            scales: {
              y: {
                min: 0,
                max: 10,
              },
            },
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
  @media (min-width: 700px) {
    width: 80%;
  }
  @media (min-width: 990px) {
    width: 66%;
  }
`;

export default LineChart;
