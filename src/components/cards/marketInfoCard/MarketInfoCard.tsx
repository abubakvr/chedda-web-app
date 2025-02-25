"use client";
import React from "react";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IMarketInfo } from "chedda-sdk";
import { IPoolStatsResponse } from "@/utils/types";
import { InfoCardSkeleton } from "@/components/ui";

interface MarketInfoCardProps {
  marketInfo: IMarketInfo | undefined;
  poolStats: IPoolStatsResponse | undefined;
  isLoading: boolean;
}

export const MarketInfoCard: React.FC<MarketInfoCardProps> = ({
  marketInfo,
  poolStats,
  isLoading,
}) => {
  if (isLoading || !marketInfo) {
    return (
      <InfoCardSkeleton
        title="Market Information"
        data-testid="loading-market-info"
      />
    );
  }

  const formatValue = (value: bigint | undefined, decimals?: bigint) => {
    const decimalValue = parseBigNumberToFloat(decimals, 0, 5);
    return value !== undefined && decimals !== undefined
      ? formatCurrency(parseBigNumberToFloat(value, decimalValue, 2), true)
      : "";
  };

  return (
    <div
      className="flex flex-col justify-between z-1"
      data-testid="market-info-card"
    >
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 xl:px-8 h-11 xl:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-2xs lg:text-xs xl:text-sm uppercase">
          Market Information
        </div>
      </div>
      <div className="p-4 md:p-6 xl:p-8 xl:pb-3">
        {[
          {
            label: "Asset Price",
            value: formatValue(
              marketInfo?.oraclePrice,
              marketInfo?.oraclePriceDecimals
            ),
          },
          {
            label: "Interest Fee",
            value: formatAsPercentage(
              parseBigNumberToFloat(marketInfo?.interestFee, 18, 10)
            ),
          },
          {
            label: "Supply Cap",
            value: `${formatLargeNumber(
              parseBigNumberToFloat(
                marketInfo?.supplyCap,
                poolStats?.asset.decimals
              )
            )} ${poolStats?.asset?.symbol}`,
          },
          {
            label: "Liquidity",
            value: `${formatLargeNumber(
              parseBigNumberToFloat(
                marketInfo?.liquidity,
                poolStats?.asset.decimals
              )
            )} ${poolStats?.asset?.symbol}`,
          },
          {
            label: "Utilization Rate",
            value: formatAsPercentage(
              parseBigNumberToFloat(marketInfo?.utilization, 18, 10)
            ),
          },
        ].map(({ label, value }, index) => (
          <div
            key={index}
            className="flex justify-between pb-5"
            data-testid={`market-info-item-${index}`}
          >
            <div
              className="opacity-50 text-sm md:text-xs lg:text-sm"
              data-testid={`market-info-label-${index}`}
            >
              {label}
            </div>
            <div
              className="text-sm md:text-xs lg:text-sm font-bold"
              data-testid={`market-info-value-${index}`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
