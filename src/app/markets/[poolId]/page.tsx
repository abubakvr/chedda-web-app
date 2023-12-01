"use client";
import React from "react";
import { SummaryCard } from "@/components/cards";
import { getPoolSummaryData } from "@/utils/formatResponse";
import { useParams, useRouter } from "next/navigation";
import { usePoolStats } from "@/hooks";
import { SummaryHeader } from "@/components/ui";

const Page = () => {
  const { poolId } = useParams();
  const { poolStats, isLoading } = usePoolStats(poolId.toString());
  const router = useRouter();

  const navigateToMarkets = () => {
    router.push("/markets");
  };

  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto"
      data-testid="pool-container"
    >
      {poolStats ? (
        <SummaryHeader
          navigateBack={navigateToMarkets}
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
    </div>
  );
};

export default Page;
