import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { IFormattedCollateral } from "@/utils/types";
import { usePoolState } from "@/hooks";
import {
  formatAsPercentage,
  formatLargeNumber,
  parseBigNumberToFloat,
  toFixedTrunc,
} from "@/utils/formatters";

const CustomTooltip = (props: any) => {
  const dataPoint = props?.payload?.[0];

  const formattedDate = () => {
    if (dataPoint) {
      const date = new Date(dataPoint?.payload?.timePoint * 1000);
      const monthName = date.toLocaleString("en-US", { month: "short" });
      const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${monthName} ${date.getDate()}, ${time}`;
    }
    return "";
  };

  return (
    <div
      data-testid="custom-tooltip"
      className="tooltip-bg rounded-lg p-4 pb-2 auto"
    >
      <div className="text-[#ffffff50] text-xs pb-3 font-bold">
        {formattedDate && <div>{formattedDate()}</div>}
      </div>
      <div className="grid grid-cols-3 justify-between gap-y-2 gap-x-2 mb-2 text-xs font-bold">
        <div className="text-[#ffffff60] col-span-2">Supply APR:</div>
        <div className="supply-gradient-text col-span-1">
          {formatAsPercentage(
            parseBigNumberToFloat(dataPoint?.payload.supplyRate, 18, 3)
          )}
        </div>
        <div className="text-[#ffffff60] col-span-2">Borrow APR:</div>
        <div className="borrow-gradient-text col-span-1">
          {formatAsPercentage(
            parseBigNumberToFloat(dataPoint?.payload.borrowRate, 18, 3)
          )}
        </div>

        <div className="text-[#ffffff60] col-span-2 ">Supplied:</div>
        <div className="supply-gradient-text col-span-1">
          {formatLargeNumber(
            parseBigNumberToFloat(dataPoint?.payload.supplied, props.decimals)
          )}
        </div>
        <div className="text-[#ffffff60] col-span-2">Borrowed:</div>
        <div className="borrow-gradient-text col-span-1">
          {formatLargeNumber(
            parseBigNumberToFloat(dataPoint?.payload.borrowed, props.decimals)
          )}
        </div>
      </div>
    </div>
  );
};

export const SuppyAndBorrowChart = ({
  poolId,
  decimals,
}: {
  collateralInfo: IFormattedCollateral[];
  poolId: string;
  decimals?: number;
}) => {
  const { isLoading, poolStateEvents } = usePoolState(poolId);

  if (isLoading) {
    return (
      <div
        data-testid="loading-container"
        className="w-full h-72 items-center justify-center"
      >
        <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
          <div className="text-white text-opacity-50 font-bold text-sm uppercase">
            Total Supply and Borrow
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
    <div data-testid="supply-borrow-chart">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          Total Supply and Borrow
        </div>
      </div>
      <div className="mt-5 pr-5" style={{ height: "170px" }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ marginLeft: -20, padding: 0 }}
        >
          <LineChart data={poolStateEvents}>
            <YAxis
              tickFormatter={(value) => `${toFixedTrunc(value * 100, 2)}%`}
              interval={0}
              tick={{ fontSize: 8 }}
              tickCount={3}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip decimals={decimals} />} />
            <Line
              name="Supply rate"
              type="monotone"
              dataKey={(value) => parseBigNumberToFloat(value?.supplyRate, 18)}
              stroke="#6FBFF7"
              strokeWidth={4}
              radius={8}
              dot={false}
              activeDot={{ r: 2 }}
            />
            <Line
              name="Borrow rate"
              type="monotone"
              dataKey={(value) => parseBigNumberToFloat(value?.borrowRate, 18)}
              stroke="#D058F5"
              strokeWidth={4}
              radius={8}
              dot={false}
              activeDot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3" style={{ height: "140px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={poolStateEvents}
            margin={{ left: 40, right: -20, top: 0, bottom: 0 }}
          >
            <XAxis
              interval={3}
              dataKey="timePoint"
              tickFormatter={(data) => {
                const date = new Date(data * 1000);
                return `${date.getDate()} / ${date.getMonth() + 1}`;
              }}
              tick={{ fontSize: 8 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => formatLargeNumber(value, false)}
              interval="preserveStartEnd"
              tick={{ fontSize: 8 }}
              orientation="right"
              tickCount={4}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip decimals={decimals} />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey={(value) =>
                parseBigNumberToFloat(value?.borrowed, decimals)
              }
              name="Borrow"
              fill="#D058F5"
              radius={[0, 0, 8, 8]}
              stackId="stack"
            />
            <Bar
              dataKey={(value) =>
                parseFloat(parseBigNumberToFloat(value?.supplied, decimals)) -
                parseFloat(parseBigNumberToFloat(value?.borrowed, decimals))
              }
              name="Supply"
              fill="#6FBFF7"
              radius={[8, 8, 0, 0]}
              stackId="stack"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
