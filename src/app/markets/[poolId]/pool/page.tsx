"use client";
import React from "react";
import { MarketInfoCard } from "@/components/cards";
import {
  calculateAssetPrice,
  formatCollateralInfo,
} from "@/utils/formatResponse";
import {
  usePoolStats,
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useEnvironment,
  useAvailableLiquidity,
} from "@/hooks";
import { MyInformationCard, CollateralInfoCard } from "@/components/cards";
import { InterestRatesChart, SuppyAndBorrowChart } from "@/components/charts";

const Page = () => {
  const { currentEnvironment } = useEnvironment();
  const { data: poolStats } = usePoolStats();
  const {
    data: accountInfo,
    fetchData: fetchAccountInfo,
    isLoading: accountInfoLoading,
  } = useAccountInfo();
  const { data: marketInfo, isLoading: marketInfoLoading } = useMarketInfo();
  const { data: collateralData, isLoading: collateralInfoLoading } =
    useCollateralInfo();
  const { data: available, isLoading: availableLoading } =
    useAvailableLiquidity();

  const collateralInfo = formatCollateralInfo(
    collateralData,
    currentEnvironment?.tokens ?? {},
    accountInfo?.collateralDeposited
  );

  const assetPrice = calculateAssetPrice(marketInfo);

  return (
    <div className="mt-8 w-full flex space-x-5">
      <div className="w-[67%] h-fit flex flex-col gap-y-6">
        <div className="pool-card rounded-lg">
          <CollateralInfoCard
            collateralInfo={collateralInfo}
            accountInfo={accountInfo}
            marketInfo={marketInfo}
            isLoading={
              collateralInfoLoading || marketInfoLoading || accountInfoLoading
            }
          />
        </div>
        <div className="pool-card rounded-lg">
          <SuppyAndBorrowChart decimals={poolStats?.asset.decimals} />
        </div>
        <div className="pool-card rounded-lg">
          <InterestRatesChart />
        </div>
      </div>
      <div className="w-[33%] text-white flex flex-col gap-y-6">
        <div className="pool-card rounded-lg">
          <MyInformationCard
            poolStats={poolStats}
            accountInfo={accountInfo}
            assetPrice={assetPrice}
            isLoading={accountInfoLoading}
            available={available}
            fetchAccountInfo={fetchAccountInfo}
          />
        </div>
        <div className="pool-card rounded-lg">
          <MarketInfoCard
            available={available}
            poolStats={poolStats}
            marketInfo={marketInfo}
            isLoading={marketInfoLoading || availableLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
