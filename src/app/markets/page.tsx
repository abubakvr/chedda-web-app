import React from "react";
import { PageContainer, PageHeader, PageTitle } from "@/components/common";
import { ErrorCard } from "@/components/cards/errorCard/ErrorCard";
import { VaultCard, SummaryCard, MobileSummaryCard } from "@/components/cards";
import { getAggregateStats, getPoolStatsList } from "./services";

const Page = async () => {
  const aggregateStats = await getAggregateStats();
  const poolStatsList = await getPoolStatsList();

  return (
    <PageContainer>
      <PageHeader>Markets</PageHeader>
      <PageTitle>Supply assets to earn interest and token rewards.</PageTitle>
      <div className="hidden md:flex mt-3 md:mt-4">
        <SummaryCard
          stats={aggregateStats}
          isLoading={false}
          data-testid="market-info-card"
        />
      </div>
      <div className="flex md:hidden mt-3 md:mt-6  rounded-lg">
        <MobileSummaryCard aggregateStats={aggregateStats} />
      </div>
      <div className="mt-4 md:mt-4" data-testid="vault-card-container">
        {poolStatsList ? (
          <VaultCard data-testid="vault-card" poolStatsList={poolStatsList} />
        ) : (
          <ErrorCard>An error occurred while loading pools.</ErrorCard>
        )}
      </div>
    </PageContainer>
  );
};

export default Page;
