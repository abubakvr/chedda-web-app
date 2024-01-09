"use client";
import React from "react";
import { VaultCard, SummaryCard } from "@/components/cards";
import { useAggregateStats } from "@/hooks";

const Page = () => {
  const { data: aggregateStats, isLoading } = useAggregateStats();

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
      <SummaryCard
        stats={aggregateStats}
        isLoading={isLoading}
        data-testid="market-info-card"
      />
      <div className="mt-8" data-testid="vault-card-container">
        <VaultCard data-testid="vault-card" />
      </div>
    </div>
  );
};

export default Page;
