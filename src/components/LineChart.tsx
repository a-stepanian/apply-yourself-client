import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { IMonthlyCount } from "../pages/DashboardPage";

interface ILineChartProps {
  monthlyCount: IMonthlyCount;
}

export const LineChart = (props: ILineChartProps) => {
  const { monthlyCount } = props;

  const [monthlyData, setmonthlyData] = useState<number[]>([]);

  useEffect(() => {
    setmonthlyData([
      monthlyCount.july,
      monthlyCount.august,
      monthlyCount.september,
      monthlyCount.october,
      monthlyCount.november,
      monthlyCount.december
    ]);
  }, [monthlyCount]);

  return (
    <Wrapper>
      <div className="chart-wrapper">
        <h3>Monthly Applications</h3>
        <Chart
          type="line"
          data={{
            labels: ["July", "August", "September", "October", "November", "December"],
            datasets: [
              {
                label: "Monthly Applications",
                data: monthlyData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 8
              }
            ]
          }}
          options={{
            animations: {
              tension: {
                duration: 2000,
                easing: "linear",
                from: 0.4,
                to: 0,
                loop: true
              }
            },
            scales: {
              y: {
                min: 0,
                max: Math.max(...monthlyData)
              }
            },
            layout: {
              padding: 0
            },
            plugins: {
              title: {
                text: "Application Status"
              },
              legend: {
                display: false
              }
            }
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
  max-width: 22rem;
  h3 {
    font-size: 0.8rem;
    font-weight: 900;
    margin: 1rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 480px) {
    width: 60%;
  }
  @media (min-width: 990px) {
    width: 100%;
  }
`;
