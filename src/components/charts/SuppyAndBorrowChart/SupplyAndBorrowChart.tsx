import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { IFormattedCollateral } from "@/utils/types";
import { useEventHistory } from "@/hooks";
import { BigNumber, ethers, utils } from "ethers";
import { formatLargeNumber } from "@/utils/formatters";

export const parseBigNumberToFloat = (
  val: BigNumber | undefined,
  decimals?: number
): number => {
  if (!val || !ethers.BigNumber.isBigNumber(val)) {
    return 0;
  }

  const formatted = utils.formatUnits(val._hex, decimals ?? "ether");
  return parseFloat(formatted);
};

export const SuppyAndBorrowChart = ({
  collateralInfo,
  poolId,
  decimals,
}: {
  collateralInfo: IFormattedCollateral[];
  poolId: string;
  decimals?: number;
}) => {
  const lineChartContainer = useRef<HTMLCanvasElement | null>(null);
  const barChartContainer = useRef<HTMLCanvasElement | null>(null);
  const lineChartInstance = useRef<any | null>(null);
  const barChartInstance = useRef<any | null>(null);
  const { graphTimes, eventsToGraph } = useEventHistory(poolId);

  useEffect(() => {
    if (
      lineChartContainer.current &&
      barChartContainer.current &&
      collateralInfo.length > 0
    ) {
      // Destroy the existing chart instances before creating new ones
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      // Line chart data
      const lineChartData = {
        labels: graphTimes.map((item) => {
          const date = new Date(item * 1000);
          return date.getFullYear();
        }),
        datasets: [
          {
            label: "Supply Rate",
            data: eventsToGraph.map(
              (value) => parseBigNumberToFloat(value?.supplyRate, 18) * 100
            ),
            borderColor: "#75CAFF",
            borderCapStyle: "round" as "round",
            backgroundColor: "transparent",
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
          {
            label: "Borrow Rate",
            data: eventsToGraph.map(
              (value) => parseBigNumberToFloat(value?.borrowRate, 18) * 100
            ),
            borderColor: "#C142F0",
            borderWidth: 4,
            borderCapStyle: "round" as "round",
            backgroundColor: "transparent",
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      };

      // Bar chart data
      const barChartData = {
        labels: graphTimes.map((item) => {
          const date = new Date(item * 1000);
          return `${date.getDate()} / ${date.getMonth()}`;
        }),
        datasets: [
          {
            label: "Borrow",
            data: eventsToGraph.map((value) =>
              parseBigNumberToFloat(value?.borrowed, decimals)
            ),
            backgroundColor: "#C142F0",
            borderRadius: 8,
            borderWidth: 0,
            stack: "Stack 1",
          },
          {
            label: "Supply",
            data: eventsToGraph.map(
              (value) =>
                parseBigNumberToFloat(value?.supplied, decimals) -
                parseBigNumberToFloat(value?.borrowed, decimals)
            ),
            backgroundColor: "#75CAFF",
            borderRadius: 8,
            borderWidth: 0,
            stack: "Stack 1",
          },
        ],
      };

      // Chart options can be customized here if needed
      const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
          grid: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value: any) {
                return `${value}%`;
              },
              maxTicksLimit: 4,
              font: {
                size: 8,
              },
            },
          },
        },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (tooltipItem: any) {
              return `${tooltipItem.yLabel}%`;
            },
          },
        },
      };

      // Chart options can be customized here if needed
      const barChartOptions = {
        maintainAspectRatio: false,
        barPercentage: 1.05,
        plugins: {
          grid: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            custom: function (tooltipModel: any) {
              // Tooltip content customization logic
              const datasetIndex = tooltipModel.datasetIndex;
              const dataIndex = tooltipModel.dataIndex;
              const datasetLabel =
                barChartData.datasets[datasetIndex].label || "";
              const value = barChartData.datasets[datasetIndex].data[dataIndex];

              // Customize the tooltip content based on your data
              return `ffff: ${value}`;
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              stepSize: 2,
              callback: function (value: any, index: any, values: any) {
                return index % 3 === 0 ? barChartData.labels[index] : "";
              },
              font: {
                size: 8,
              },
            },
          },
          y: {
            beginAtZero: true,
            position: "right" as "right",
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value: any) {
                return `${formatLargeNumber(value, false)}`;
              },
              maxTicksLimit: 5,
              font: {
                size: 8,
              },
            },
          },
        },
      };

      // Create line chart
      lineChartInstance.current = new Chart(lineChartContainer.current, {
        type: "line",
        data: lineChartData,
        options: chartOptions,
      });

      // Create bar chart
      barChartInstance.current = new Chart(barChartContainer.current, {
        type: "bar",
        data: barChartData,
        options: barChartOptions,
      });
    }

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [collateralInfo]);

  return (
    <div>
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          Total Supply and Borrow
        </div>
      </div>
      <div
        className="w-full h-fit relative pl-2 pt-7 pr-10"
        data-testid="chart-container"
        style={{ height: "170px" }}
      >
        <canvas
          ref={lineChartContainer}
          data-testid="line-chart"
          height="200px"
        ></canvas>
      </div>
      <div
        className="relative pl-10 pt-1 pr-3 pb-4"
        data-testid="chart-container"
        style={{ height: "170px" }}
      >
        <canvas
          ref={barChartContainer}
          data-testid="bar-chart"
          className="mt-3"
        ></canvas>
      </div>
    </div>
  );
};
