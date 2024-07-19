import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import { formatAsPercentage, parseBigNumberToFloat } from "@/utils/formatters";
import { useRatesProjector } from "@/hooks";
import { IInterestRatesProjection } from "chedda-sdk";
import { CustomTooltipProps } from "@/utils/types";
import { currentEnvironment } from "@/data/environments";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

interface Payload {
  payload: IInterestRatesProjection;
}

const CustomTooltip: React.FC<CustomTooltipProps<Payload>> = (props) => {
  const dataPoint = props?.payload?.[0];

  return (
    <div
      data-testid="custom-tooltip"
      className="tooltip-bg rounded-lg p-4 pb-2 auto"
    >
      <div className="grid grid-cols-3 justify-between gap-y-2 gap-x-2 mb-2 text-xs">
        <div className="text-[#ffffff60] col-span-2 ">Utilization:</div>
        <div className="text-white col-span-1 font-bold">
          {formatAsPercentage(
            parseBigNumberToFloat(dataPoint?.payload.utilization, 18)
          )}
        </div>
        <div className="text-[#ffffff60] col-span-2">Supply APR:</div>
        <div className="supply-gradient-text col-span-1 font-bold">
          {formatAsPercentage(
            parseBigNumberToFloat(dataPoint?.payload.supplyRate, 18, 5)
          )}
        </div>
        <div className="text-[#ffffff60] col-span-2">Borrow APR:</div>
        <div className="borrow-gradient-text col-span-1 font-bold">
          {formatAsPercentage(
            parseBigNumberToFloat(dataPoint?.payload.borrowRate, 18, 5)
          )}
        </div>
      </div>
    </div>
  );
};

export const InterestRatesChart = () => {
  const { data: interestRates, isLoading } = useRatesProjector();

  if (isLoading) {
    return (
      <div
        data-testid="loading-container"
        className="w-full h-72 items-center justify-center"
      >
        <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
          <div className="text-white text-opacity-50 font-bold text-sm uppercase">
            Interest Rate Model
          </div>
        </div>
        <div
          data-testid="loading-spinner"
          className="flex justify-center items-center h-full"
        >
          <div className="border-t-4 border-blue-500 border-solid h-16 w-16 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="interest-rates-chart">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          Interest Rate Model
        </div>
        <div className="flex gap-x-6 text-white text-opacity-50 text-xs uppercase font-bold">
          <div className="flex items-center gap-x-2">
            <div className="rounded-full bg-[#6FBFF7] w-[10px] h-[10px]"></div>
            <div className="">Supply APR</div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="rounded-full bg-[#D058F5] w-[10px] h-[10px]"></div>
            <div className="">Borrow APR</div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="rounded-full bg-[#fff] w-[10px] h-[10px]"></div>
            <div className="">Utilization</div>
          </div>
        </div>
        <a
          href={`${currentEnvironment?.contractPrefix}/${currentEnvironment.contracts.InterestRatesProjector}`}
          target="_blank"
          rel="noreferrer"
          className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70"
        >
          <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
            Contract
          </div>
          <Image src={LinkOut} alt="link out" />
        </a>
      </div>
      <div className="mt-8 px-7 pb-4" style={{ height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={interestRates}>
            <YAxis
              tick={{ fontSize: 8, fill: "#FFFFFF50" }}
              tickFormatter={(data) => `${data * 100}%`}
              tickCount={4}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <XAxis
              interval={9}
              dataKey={(value) => parseBigNumberToFloat(value?.utilization, 18)}
              tick={{
                fontSize: 8,
                fill: "#FFFFFF50",
                width: 50,
              }}
              tickFormatter={(data) => `${data * 100}%`}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              padding={{ right: 6 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeWidth={0.4}
            />
            <Line
              name="Supply rate"
              type="monotone"
              dataKey={(value) =>
                parseBigNumberToFloat(value?.supplyRate, 18, 10)
              }
              stroke="#6FBFF7"
              strokeWidth={4}
              radius={8}
              dot={false}
              activeDot={{ r: 2 }}
            />
            <Line
              name="Borrow rate"
              type="monotone"
              dataKey={(value) =>
                parseBigNumberToFloat(value?.borrowRate, 18, 10)
              }
              stroke="#D058F5"
              strokeWidth={4}
              radius={8}
              dot={false}
              activeDot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
