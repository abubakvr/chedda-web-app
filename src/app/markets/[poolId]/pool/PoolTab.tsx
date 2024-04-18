"use client";
import React, { Dispatch, SetStateAction } from "react";
import { MarketInfoCard } from "@/components/cards";
import {
  calculateAssetPrice,
  formatCollateralInfo,
} from "@/utils/formatResponse";
import {
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useAvailableLiquidity,
} from "@/hooks";
import { MyInformationCard, CollateralInfoCard } from "@/components/cards";
import { InterestRatesChart, SuppyAndBorrowChart } from "@/components/charts";
import { IPoolStatsResponse } from "@/utils/types";
import { currentEnvironment } from "@/data/environments";

const PoolTab = ({
  poolStats,
  setActivePoolTab,
  fetchPoolStats,
}: {
  poolStats: IPoolStatsResponse | undefined;
  setActivePoolTab: Dispatch<SetStateAction<string>>;
  fetchPoolStats: (showLoading: boolean) => void;
}) => {
  const {
    data: accountInfo,
    fetchData: fetchAccountInfo,
    isLoading: accountInfoLoading,
  } = useAccountInfo();
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

  const fetchPoolInfo = () => {
    fetchPoolStats(false);
    fetchAccountInfo(false);
    fetchMarketInfo(false);
    fetchCollateralInfo(false);
  };

  const collateralInfo = formatCollateralInfo(
    collateralData,
    currentEnvironment?.tokens ?? {},
    accountInfo?.collateralDeposited
  );

  const assetPrice = calculateAssetPrice(marketInfo);

  return (
    <div
      className="mt-8 w-full flex space-x-5"
      data-testid="pool-tab-container"
    >
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
            fetchPoolInfo={fetchPoolInfo}
            setActivePoolTab={setActivePoolTab}
          />
        </div>
        <div className="pool-card rounded-lg">
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
