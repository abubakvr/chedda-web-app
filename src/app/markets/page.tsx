"use client";
import React from "react";
import { VaultCard, SummaryCard } from "@/components/cards";
import { useAggregateStats } from "@/hooks";
import { PageTitle } from "@/components/common";

const Page = () => {
  const { data: aggregateStats, isLoading } = useAggregateStats();

  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto"
      data-testid="page-container"
    >
      <PageTitle title="MARKETS">
        Supply assets to earn interest and token rewards.
      </PageTitle>
      <div className="mt-6">
        <SummaryCard
          stats={aggregateStats}
          isLoading={isLoading}
          data-testid="market-info-card"
        />
      </div>
      <div className="mt-6" data-testid="vault-card-container">
        <VaultCard data-testid="vault-card" />
      </div>
    </div>
  );
};

export default Page;
