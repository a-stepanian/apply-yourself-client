import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";

const LineChart = ({ monthlyCount }) => {
  return (
    <Wrapper>
      <h1>Monthly Submissions</h1>
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
                label: "This is the chart",
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
  z-index: 1;
  .chart-wrapper {
    box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.2);
  }
`;

export default LineChart;
