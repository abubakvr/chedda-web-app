"use client";
import React, { useEffect } from "react";
import { MarketInfoCard, SummaryCard } from "@/components/cards";
import {
  formatCollateralInfo,
  getPoolSummaryData,
} from "@/utils/formatResponse";
import { useParams, useRouter } from "next/navigation";
import {
  usePoolStats,
  useAccountInfo,
  useMarketInfo,
  useCollateralInfo,
  useEnvironment,
} from "@/hooks";
import { SummaryHeader } from "@/components/ui";
import { MyInformationCard } from "@/components/cards";
import { CollateralInfoCard } from "@/components/cards/collateralInfoCard/CollateralInfoCard";

const Page = () => {
  const { poolId } = useParams();
  const { currentEnvironment } = useEnvironment();
  const { poolStats, isLoading } = usePoolStats(poolId.toString());
  const { accountInfo, isLoading: accountInfoLoading } = useAccountInfo(
    poolId.toString()
  );
  const { marketInfo, isLoading: marketInfoLoading } = useMarketInfo(
    poolId.toString()
  );
  const { data, isLoading: collateralInfoLoading } = useCollateralInfo(
    poolId.toString()
  );
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
      {poolStats ? (
        <SummaryHeader
          logoSrc={poolStats.asset.logo}
          assetName={poolStats.asset.name}
        />
      ) : (
        <div className="mt-5 rounded animate-pulse">
          <div className="h-10 bg-blue-400 rounded-md dark:bg-blue-400 opacity-20 w-40 mb-2.5"></div>
        </div>
      )}
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
        <div className="w-[67%] h-fit pool-card rounded-lg">
          <CollateralInfoCard
            collateralInfo={collateralInfo ?? []}
            accountInfo={accountInfo}
            marketInfo={marketInfo}
            isLoading={
              collateralInfoLoading || marketInfoLoading || accountInfoLoading
            }
          />
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
