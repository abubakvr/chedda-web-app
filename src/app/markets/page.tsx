"use client";
import React from "react";
import { VaultCard, SummaryCard } from "@/components/cards";
import { useAggregateStats } from "@/hooks/useAggregateStats";
import { getMarketInfoData } from "@/utils/formatResponse";

const Page = () => {
  const { aggregateStats, isLoading } = useAggregateStats();
  const aggregateStatsInfo = getMarketInfoData(aggregateStats);

  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto"
      data-testid="page-container"
    >
      <div
        className="text-white py-8 font-open-sans text-2xl xl:text-3xl font-bold tracking-normal uppercase"
        data-testid="markets-heading"
      >
        MARKETS
      </div>
      <div
        className="grid grid-cols-2 gap-x-2 gap-y-2 lg:flex lg:gap-x-0 lg:space-x-3 xl:space-x-5 flex-wrap lg:flex-nowrap"
        data-testid="market-info-container"
      >
        {aggregateStatsInfo?.map((data, index) => (
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
      <div className="mt-8" data-testid="vault-card-container">
        <VaultCard data-testid="vault-card" />
      </div>
    </div>
  );
};

export default Page;
