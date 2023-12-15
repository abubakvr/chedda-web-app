import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { IFormattedCollateral } from "@/utils/types";

export const CollateralInfoChart = ({
  collateralInfo,
}: {
  collateralInfo: IFormattedCollateral[];
}) => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const chartData = {
      datasets: [
        {
          labels: collateralInfo?.map(
            (item: IFormattedCollateral) => item.asset.name
          ),
          data: collateralInfo?.map((item: IFormattedCollateral) =>
            parseInt(item.value)
          ),
          borderWidth: 0,
          backgroundColor: collateralInfo?.map(
            (item: IFormattedCollateral) => item.asset.color
          ),
          hoverBackgroundColor: ["#FFCE56", "#FF6384", "#FFCE43"],
        },
      ],
    };

    // Chart options can be customized here if needed
    const chartOptions = {};

    if (chartContainer.current) {
      new Chart(chartContainer.current, {
        type: "doughnut",
        data: chartData,
        options: chartOptions,
      });
    }
  }, []);

  return (
    <div className="w-36 h-36">
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};
