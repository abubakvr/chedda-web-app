"use client";
import React from "react";
import { MarketInfoCard, SummaryCard } from "@/components/cards";
import { useParams } from "next/navigation";
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
} from "@/hooks";
import { SummaryHeader } from "@/components/ui";
import { MyInformationCard, CollateralInfoCard } from "@/components/cards";
import { InterestRatesChart, SuppyAndBorrowChart } from "@/components/charts";

const Page = () => {
  const { poolId } = useParams();
  const { currentEnvironment } = useEnvironment();
  const strPoolId = poolId.toString();
  const { poolStats, isLoading } = usePoolStats(strPoolId);
  const { data: accountInfo, isLoading: accountInfoLoading } =
    useAccountInfo(strPoolId);
  const { data: marketInfo, isLoading: marketInfoLoading } =
    useMarketInfo(strPoolId);
  const { data, isLoading: collateralInfoLoading } =
    useCollateralInfo(strPoolId);

  const collateralInfo = formatCollateralInfo(
    data,
    currentEnvironment?.tokens ?? {},
    accountInfo?.collateralDeposited
  );

  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto pb-10"
      data-testid="pool-container"
    >
      <SummaryHeader
        logoSrc={poolStats?.asset.logo}
        assetName={poolStats?.asset.name}
      />
      <div
        className="grid grid-cols-2 gap-x-2 gap-y-2 lg:flex lg:gap-x-0 mt-5 lg:space-x-3 xl:space-x-5 flex-wrap lg:flex-nowrap"
        data-testid="summary-card-container"
      >
        {getPoolSummaryData(poolStats).map((data, index) => (
          <SummaryCard
            key={index}
            index={index}
            title={data.title}
            value={data.value}
            isLoading={isLoading}
            data-testid={`market-info-card-${index}`}
          />
        ))}
      </div>
      <div className="mt-8 w-full flex space-x-5">
        <div className="w-[67%] h-fit flex flex-col gap-y-6">
          <div className="pool-card rounded-lg">
            <CollateralInfoCard
              collateralInfo={collateralInfo ?? []}
              accountInfo={accountInfo}
              marketInfo={marketInfo}
              isLoading={
                collateralInfoLoading || marketInfoLoading || accountInfoLoading
              }
            />
          </div>
          <div className="pool-card rounded-lg">
            <SuppyAndBorrowChart
              collateralInfo={collateralInfo ?? []}
              poolId={strPoolId}
              decimals={poolStats?.asset.decimals}
            />
          </div>
          <div className="pool-card rounded-lg">
            <InterestRatesChart poolId={strPoolId} />
          </div>
        </div>
        <div className="w-[33%] text-white flex flex-col gap-y-6">
          <div className="pool-card rounded-lg">
            <MyInformationCard
              poolStats={poolStats}
              accountInfo={accountInfo}
              isLoading={accountInfoLoading}
              onBorrowClick={() => {}}
              onSupplyClick={() => {}}
            />
          </div>
          <div className="pool-card rounded-lg">
            <MarketInfoCard
              asset={poolStats?.asset}
              marketInfo={marketInfo}
              isLoading={marketInfoLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
