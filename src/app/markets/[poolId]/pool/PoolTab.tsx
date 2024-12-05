"use client";
import React, { Dispatch, SetStateAction } from "react";
import { MarketInfoCard } from "@/components/cards";
import {
  calculateAssetPrice,
  formatCollateralInfo,
} from "@/utils/formatResponse";
import {
  useMarketInfo,
  useCollateralInfo,
  useAvailableLiquidity,
  usePoolState,
} from "@/hooks";
import { MyInformationCard, CollateralInfoCard } from "@/components/cards";
import { InterestRatesChart, SuppyAndBorrowChart } from "@/components/charts";
import { IPoolStatsResponse } from "@/utils/types";
import { currentEnvironment } from "@/data/environments";
import { IAccountInfo } from "chedda-sdk";

const PoolTab = ({
  poolStats,
  accountInfo,
  accountInfoLoading,
  fetchAccountInfo,
  setActivePoolTab,
  fetchPoolStats,
  fetchLpTokenBalance,
}: {
  accountInfo: IAccountInfo | undefined;
  poolStats: IPoolStatsResponse | undefined;
  accountInfoLoading: boolean;
  fetchAccountInfo: () => void;
  setActivePoolTab: Dispatch<SetStateAction<string>>;
  fetchPoolStats: () => void;
  fetchLpTokenBalance: () => void;
}) => {
  const {
    data: marketInfo,
    isLoading: marketInfoLoading,
    fetchData: fetchMarketInfo,
  } = useMarketInfo();
  const {
    data: collateralData,
    isLoading: collateralInfoLoading,
    fetchData: fetchCollateralInfo,
  } = useCollateralInfo();
  const { data: available } = useAvailableLiquidity();
  const {
    isLoading: poolStateLoading,
    data: poolStateData,
    fetchData: fetchPoolStateData,
  } = usePoolState();

  const fetchPoolInfo = () => {
    fetchPoolStats();
    fetchAccountInfo();
    fetchMarketInfo();
    fetchCollateralInfo();
    fetchPoolStateData();
    fetchLpTokenBalance();
  };

  const collateralInfo = formatCollateralInfo(
    collateralData,
    currentEnvironment?.tokens ?? {},
    accountInfo?.collateralDeposited
  );

  const assetPrice = calculateAssetPrice(marketInfo);

  return (
    <div
      className="mt-6 lg:mt-8 w-full flex flex-col-reverse lg:flex-row lg:space-x-5"
      data-testid="pool-tab-container"
    >
      <div className="w-full lg:w-[67%] h-fit flex flex-col gap-y-6 mt-6 lg:mt-0">
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
          <SuppyAndBorrowChart
            decimals={poolStats?.asset.decimals}
            isLoading={poolStateLoading}
            data={poolStateData}
          />
        </div>
        <div className="pool-card rounded-lg">
          <InterestRatesChart utilizationRate={marketInfo?.utilization} />
        </div>
      </div>
      <div className="w-full lg:w-[33%] text-white flex flex-col md:flex-row-reverse justify-between lg:justify-start gap-x-6 lg:md:gap-x-0 lg:flex-col gap-y-6">
        <div className="pool-card rounded-lg w-full">
          <MyInformationCard
            poolStats={poolStats}
            accountInfo={accountInfo}
            assetPrice={assetPrice}
            isLoading={accountInfoLoading}
            available={available}
            fetchPoolInfo={fetchPoolInfo}
            setActivePoolTab={setActivePoolTab}
          />
        </div>
        <div className="pool-card rounded-lg z-5 w-full">
          <MarketInfoCard
            poolStats={poolStats}
            marketInfo={marketInfo}
            isLoading={marketInfoLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default PoolTab;
