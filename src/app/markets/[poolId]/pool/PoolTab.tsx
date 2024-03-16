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
  useEnvironment,
  useAvailableLiquidity,
} from "@/hooks";
import { MyInformationCard, CollateralInfoCard } from "@/components/cards";
import { InterestRatesChart, SuppyAndBorrowChart } from "@/components/charts";
import { IPoolStatsResponse } from "@/utils/types";

const PoolTab = ({
  poolStats,
  setActivePoolTab,
}: {
  poolStats: IPoolStatsResponse | undefined;
  setActivePoolTab: Dispatch<SetStateAction<string>>;
}) => {
  const { currentEnvironment } = useEnvironment();
  const {
    data: accountInfo,
    fetchData: fetchAccountInfo,
    isLoading: accountInfoLoading,
  } = useAccountInfo();
  const { data: marketInfo, isLoading: marketInfoLoading } = useMarketInfo();
  const { data: collateralData, isLoading: collateralInfoLoading } =
    useCollateralInfo();
  const { data: available } = useAvailableLiquidity();

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
            fetchAccountInfo={fetchAccountInfo}
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
