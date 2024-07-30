import React from "react";
import { VaultCard, SummaryCard } from "@/components/cards";
import { PageTitle } from "@/components/common";
import { useMarkets } from "@/hooks/useMarkets";

const Page = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string };
}) => {
  const query = searchParams.q ?? "";
  const filter = searchParams.filter ?? "";

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
      <div className="mt-6">
        <SummaryCard
          stats={aggregateStats}
          isLoading={false}
          data-testid="market-info-card"
        />
      </div>
      <div className="mt-6" data-testid="vault-card-container">
        <VaultCard
          data-testid="vault-card"
          poolStatsList={poolStatsList}
          query={query}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default Page;
