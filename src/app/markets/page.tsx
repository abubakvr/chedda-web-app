import React from "react";
import { PageContainer, PageTitle } from "@/components/common";
import { ErrorCard } from "@/components/cards/errorCard/ErrorCard";
import { VaultCard, SummaryCard, MobileSummaryCard } from "@/components/cards";
import { getAggregateStats, getPoolStatsList } from "./services";

const Page = async () => {
  const aggregateStats = await getAggregateStats();
  const poolStatsList = await getPoolStatsList();

  return (
    <PageContainer>
      <PageTitle title="MARKETS">
        Supply assets to earn interest and token rewards.
      </PageTitle>
      <div className="hidden md:flex mt-4 md:mt-6">
        <SummaryCard
          stats={aggregateStats}
          isLoading={false}
          data-testid="market-info-card"
        />
      </div>
      <div className="flex md:hidden mt-4 md:mt-6  rounded-lg">
        <MobileSummaryCard aggregateStats={aggregateStats} />
      </div>
      <div className="mt-4 md:mt-6" data-testid="vault-card-container">
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
