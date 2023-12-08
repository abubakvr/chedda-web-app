import React from "react";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IMarketInfo } from "@/chedda-sdk";
import { IToken } from "@/utils/types";
import { InfoCardSkeleton } from "@/components/ui";
import { BigNumber } from "ethers";

interface MarketInfoCardProps {
  asset: IToken | undefined;
  marketInfo: IMarketInfo | undefined;
  isLoading: boolean;
}

export const MarketInfoCard: React.FC<MarketInfoCardProps> = ({
  asset,
  marketInfo,
  isLoading,
}) => {
  if (isLoading || !marketInfo) {
    return <InfoCardSkeleton title="Market Information" />;
  }

  const formatValue = (value: BigNumber | undefined, decimals?: BigNumber) => {
    const decimalValue = parseBigNumberToFloat(decimals);
    return value !== undefined && decimals !== undefined
      ? formatCurrency(parseBigNumberToFloat(value, parseInt(decimalValue)))
      : "";
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center uppercase font-bold">
        <div className="text-white text-opacity-50 font-bold text-lg">
          Market Information
        </div>
      </div>
      <div className="p-8">
        {[
          {
            label: "Oracle Price",
            value: formatValue(
              marketInfo?.oraclePrice,
              marketInfo?.oraclePriceDecimals
            ),
          },
          {
            label: "Interest Fee",
            value: formatAsPercentage(
              parseBigNumberToFloat(marketInfo?.interestFee, 18, 5)
            ),
          },
          {
            label: "Supply Cap",
            value: `${formatLargeNumber(
              parseBigNumberToFloat(marketInfo?.supplyCap)
            )} ${asset?.symbol}`,
          },
          {
            label: "Liquidation Threshold",
            value: formatAsPercentage(
              parseBigNumberToFloat(marketInfo?.liquidationThreshold)
            ),
          },
          {
            label: "Liquidation Penalty",
            value: formatAsPercentage(
              parseBigNumberToFloat(marketInfo?.liquidationPenalty)
            ),
          },
        ].map(({ label, value }, index) => (
          <div key={index} className="flex justify-between pb-4">
            <div className="opacity-50 text-sm">{label}</div>
            <div className="text-sm font-bold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
