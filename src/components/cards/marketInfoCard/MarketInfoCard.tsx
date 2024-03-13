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
import { BigNumber } from "ethers";

interface MarketInfoCardProps {
  available: BigNumber | undefined;
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

  const formatValue = (value: BigNumber | undefined, decimals?: BigNumber) => {
    const decimalValue = parseBigNumberToFloat(decimals, 0, 5);
    return value !== undefined && decimals !== undefined
      ? formatCurrency(
          parseBigNumberToFloat(value, parseInt(decimalValue), 2),
          true
        )
      : "";
  };

  return (
    <div
      className="flex flex-col justify-between"
      data-testid="market-info-card"
    >
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase">
          Market Information
        </div>
      </div>
      <div className="p-8 pb-3">
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
              parseBigNumberToFloat(marketInfo?.supplyCap)
            )} ${poolStats?.asset?.symbol}`,
          },
          {
            label: "Available Liquidity",
            value: `${formatLargeNumber(
              parseBigNumberToFloat(
                marketInfo?.liquidity,
                poolStats?.asset.decimals
              )
            )} ${poolStats?.asset?.symbol}`,
          },
          {
            label: "Utilization",
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
              className="opacity-50 text-sm"
              data-testid={`market-info-label-${index}`}
            >
              {label}
            </div>
            <div
              className="text-sm font-bold"
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
