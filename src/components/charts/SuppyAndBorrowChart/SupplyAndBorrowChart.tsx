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
import { useEventHistory } from "@/hooks";
import { BigNumber, ethers, utils } from "ethers";
import { formatAsPercentage, formatLargeNumber } from "@/utils/formatters";

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

const CustomTooltip = (props: any) => {
  const firstDataPoint = props?.payload?.[0];

  const formattedDate = (() => {
    if (firstDataPoint) {
      const date = new Date(firstDataPoint?.payload?.timePoint * 1000);
      const monthName = date.toLocaleString("en-US", { month: "short" });
      const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      return `${monthName} ${date.getDate()}, ${time}`;
    }
    return "";
  })();

  return (
    <div className="tooltip-bg rounded-lg p-4 w-44">
      <div className="text-[#ffffff50] text-xs pb-4 font-bold">
        {formattedDate && <div>{formattedDate}</div>}
      </div>
      <div className="flex justify-between mb-2 text-xs font-bold">
        <div className="text-[#ffffff60] ">Supplied:</div>
        <div className="supply-gradient-text">
          {formatLargeNumber(
            parseBigNumberToFloat(
              firstDataPoint?.payload.supplied,
              props.decimals
            )
          )}
        </div>
      </div>
      <div className="flex justify-between mb-2 text-xs font-bold">
        <div className="text-[#ffffff60] ">Supply APR:</div>
        <div className="supply-gradient-text">
          {formatAsPercentage(
            parseBigNumberToFloat(firstDataPoint?.payload.supplyRate, 18)
          )}
        </div>
      </div>
      <div className="flex justify-between mb-2 text-xs font-bold">
        <div className="text-[#ffffff60] ">Borrowed:</div>
        <div className="borrow-gradient-text">
          {formatLargeNumber(
            parseBigNumberToFloat(
              firstDataPoint?.payload.borrowed,
              props.decimals
            )
          )}
        </div>
      </div>
      <div className="flex justify-between mb-2 text-xs font-bold">
        <div className="text-[#ffffff60] ">Borrow APR:</div>
        <div className="borrow-gradient-text">
          {formatAsPercentage(
            parseBigNumberToFloat(firstDataPoint?.payload.borrowRate, 18)
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
  const { eventsToGraph } = useEventHistory(poolId);

  return (
    <div>
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          Total Supply and Borrow
        </div>
      </div>
      <div className="mt-5 pr-5" style={{ height: "170px" }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ marginLeft: -30, padding: 0 }}
        >
          <LineChart data={eventsToGraph}>
            <YAxis
              tickFormatter={(value) => `${value * 100}%`}
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
      <div className="mt-2" style={{ height: "140px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={eventsToGraph}
            margin={{ left: 30, right: -20, top: 0, bottom: 0 }}
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
                parseBigNumberToFloat(value?.supplied, decimals) -
                parseBigNumberToFloat(value?.borrowed, decimals)
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

export default SuppyAndBorrowChart;
