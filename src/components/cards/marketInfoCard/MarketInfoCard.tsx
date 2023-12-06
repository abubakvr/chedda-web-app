import React from "react";
import {
  formatCurrency,
  formatLargeNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IPoolStatsResponse } from "@/utils/types";
import { MyInformationSkeleton } from "@/components/ui/skeleton/MyInformationSkeleton";
import { IAccountInfo } from "@/chedda-sdk";

interface MarketInfoCardProps {
  poolStats: IPoolStatsResponse | undefined;
  accountInfo: IAccountInfo | undefined;
  isLoading: boolean;
}

export const MarketInfoCard: React.FC<MarketInfoCardProps> = ({
  poolStats,
  accountInfo,
  isLoading,
}) => {
  if (isLoading || !poolStats) {
    // Render loading placeholder if poolStats is undefined
    return <MyInformationSkeleton />;
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center uppercase font-bold">
        <div className="text-white text-opacity-50 font-bold text-lg">
          Market Information
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Oracle Price</div>
          <div className="text-sm font-bold">
            {formatCurrency(
              parseBigNumberToFloat(accountInfo?.totalCollateralValue)
            )}
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Interest Fee</div>
          <div className="text-sm font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.supplied)
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Supply Cap</div>
          <div className="text-sm font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.borrowed)
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Liquidation Threshold</div>
          <div className="text-sm font-bold">
            {formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.healthFactor)
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="opacity-50 text-sm">Liquidation Penalty</div>
          <div className="text-sm font-bold">
            {formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.healthFactor)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
