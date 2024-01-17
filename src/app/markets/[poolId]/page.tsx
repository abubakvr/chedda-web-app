"use client";
import React, { useEffect } from "react";
import { MarketInfoCard, SummaryCard } from "@/components/cards";
import {
  formatCollateralInfo,
  getPoolSummaryData,
} from "@/utils/formatResponse";
import {
  usePoolStats,
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useEnvironment,
  useAvailableLiquidity,
  useTransaction,
} from "@/hooks";
import { SummaryHeader } from "@/components/ui";
import { MyInformationCard, CollateralInfoCard } from "@/components/cards";
import { InterestRatesChart, SuppyAndBorrowChart } from "@/components/charts";

const Page = () => {
  const { currentEnvironment } = useEnvironment();
  const { data: poolStats, isLoading } = usePoolStats();
  const { data: accountInfo, fetchData: fetchAccountInfo } = useAccountInfo();
  const { data: marketInfo, isLoading: marketInfoLoading } = useMarketInfo();
  const { data: collateralData, isLoading: collateralInfoLoading } =
    useCollateralInfo();
  const { data: available, isLoading: availableLoading } =
    useAvailableLiquidity();
  const { isSuccess } = useTransaction(poolStats?.asset.address ?? "");

  useEffect(() => {
    fetchAccountInfo();
  }, [isSuccess]);

  const collateralInfo = formatCollateralInfo(
    collateralData,
    currentEnvironment?.tokens ?? {},
    accountInfo?.collateralDeposited
  );

  const poolSummary = getPoolSummaryData(poolStats);

  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto pb-10"
      data-testid="pool-container"
    >
      <div className="my-7">
        <SummaryHeader
          logoSrc={poolStats?.asset.logo}
          assetName={poolStats?.characterization}
        />
      </div>
      <SummaryCard stats={poolSummary} isLoading={!poolStats || isLoading} />
      <div className="mt-8 w-full flex space-x-5">
        <div className="w-[67%] h-fit flex flex-col gap-y-6">
          <div className="pool-card rounded-lg">
            <CollateralInfoCard
              collateralInfo={collateralInfo ?? []}
              accountInfo={accountInfo}
              marketInfo={marketInfo}
              isLoading={collateralInfoLoading || marketInfoLoading}
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
              isLoading={availableLoading}
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
    </div>
  );
};

export default Page;
