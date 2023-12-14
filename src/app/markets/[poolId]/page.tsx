"use client";
import React from "react";
import { MarketInfoCard, SummaryCard } from "@/components/cards";
import { getPoolSummaryData } from "@/utils/formatResponse";
import { useParams, useRouter } from "next/navigation";
import { usePoolStats, useAccountInfo, useMarketInfo } from "@/hooks";
import { SummaryHeader } from "@/components/ui";
import { MyInformationCard } from "@/components/cards";

const Page = () => {
  const { poolId } = useParams();
  const { poolStats, isLoading } = usePoolStats(poolId.toString());
  const { accountInfo, isLoading: accountInfoLoading } = useAccountInfo(
    poolId.toString()
  );
  const { marketInfo, isLoading: marketInfoLoading } = useMarketInfo(
    poolId.toString()
  );
  const router = useRouter();

  const navigateToMarkets = () => {
    router.push("/markets");
  };

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
      <div className="mt-8 h-auto w-full flex space-x-5">
        <div className="w-[67%] pool-card rounded-lg"></div>
        <div className="w-[33%] pool-card rounded-lg text-white">
          <MyInformationCard
            poolStats={poolStats}
            accountInfo={accountInfo}
            isLoading={accountInfoLoading}
            onBorrowClick={() => {}}
            onSupplyClick={() => {}}
          />
        </div>
      </div>
      <div className="mt-8 h-auto w-full flex space-x-5">
        <div className="w-[67%] pool-card rounded-lg"></div>
        <div className="w-[33%] pool-card rounded-lg text-white">
          <MarketInfoCard
            asset={poolStats?.asset}
            marketInfo={marketInfo}
            isLoading={marketInfoLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
