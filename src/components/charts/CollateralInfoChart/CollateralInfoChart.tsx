import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { IFormattedCollateral } from "@/utils/types";

export const CollateralInfoChart = ({
  collateralInfo,
}: {
  collateralInfo: IFormattedCollateral[];
}) => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any | null>(null);

  useEffect(() => {
    if (chartContainer.current && collateralInfo.length > 0) {
      // Destroy the existing chart instance before creating a new one
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const chartData = {
        labels: collateralInfo.map(
          (item: IFormattedCollateral) => item.asset.name
        ),
        datasets: [
          {
            data: collateralInfo.map(
              (item: IFormattedCollateral) => item.value
            ),
            borderWidth: 0,
            backgroundColor: collateralInfo.map(
              (item: IFormattedCollateral) => item.asset.color
            ),
          },
        ],
      };

      // Chart options can be customized here if needed
      const chartOptions = {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
        animation: {
          duration: 0, // Disable animations
        },
      };

      chartInstance.current = new Chart(chartContainer.current, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
      });
    }
  }, [collateralInfo]);

  return (
    <div
      className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 relative"
      data-testid="chart-container"
    >
      <canvas ref={chartContainer} data-testid="collateral-info-chart"></canvas>
    </div>
  );
};
