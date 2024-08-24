import React from "react";
import { VaultCard, SummaryCard, MobileSummaryCard } from "@/components/cards";
import { PageTitle } from "@/components/common";
import { useMarkets } from "@/hooks/useMarkets";
import { ErrorCard } from "@/components/cards/errorCard/ErrorCard";

const Page = async () => {
  const { getAggregateStats, getPoolStatsList } = useMarkets();
  const aggregateStats = await getAggregateStats();
  const poolStatsList = await getPoolStatsList();

  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto"
      data-testid="page-container"
    >
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
    </div>
  );
};

export default Page;
