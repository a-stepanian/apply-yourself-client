import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
// @ts-ignore
import styled from "styled-components";
import { ITotals } from "../pages/DashboardPage";

interface IDonutChartProps {
  totals: ITotals;
}

export const DonutChart = (props: IDonutChartProps) => {
  const { totals } = props;

  return (
    <Wrapper>
      <h3>Application Status</h3>
      <div className="key-and-donut">
        <div className="img-wrapper">
          <img src="donutkey.png" alt="Key for the donut chart" />
        </div>
        <div className="donut-wrapper">
          <Chart
            type="doughnut"
            data={{
              labels: [],
              datasets: [
                {
                  label: "This is the chart",
                  data: [totals.totalWaiting, totals.totalDeclined, totals.totalInterview],
                  backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(50, 235, 86)"],
                  hoverOffset: 10
                }
              ]
            }}
            options={{
              layout: {
                padding: 10
              },
              plugins: {
                title: {
                  text: "Application Status"
                }
              }
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  z-index: 1;
  max-width: 18rem;
  h3 {
    font-size: 0.8rem;
    font-weight: 900;
    margin: 1rem 0 0;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  .key-and-donut {
    display: flex;
    align-items: center;
    position: relative;
  }
  .img-wrapper {
    width: 6rem;
    img {
      width: 100%;
    }
  }
  .donut-wrapper {
    width: calc(100% - 6rem);
  }

  /*---------------*/
  /* Media Queries */
  /*---------------*/

  @media (min-width: 480px) {
    margin-left: 1rem;
    width: 40%;
    height: 10rem;
    max-width: 13rem;
    .key-and-donut {
      margin-top: 1rem;
    }
  }
  @media (min-width: 990px) {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    .key-and-donut {
      margin-left: 10%;
      width: 80%;
      max-width: 80%;
    }
    .img-wrapper {
      width: 10rem;
      img {
        width: 100%;
      }
    }
  }
`;
