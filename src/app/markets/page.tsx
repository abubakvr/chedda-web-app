import React from "react";
import { VaultCard, SummaryCard, MobileSummaryCard } from "@/components/cards";
import { PageTitle } from "@/components/common";
import { useMarkets } from "@/hooks/useMarkets";

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
          <div className="pool-card relative w-full flex gap-x-2 items-center justify-center p-6 md:p-5 text-white text-center text-xs md:text-sm lg:text-lg">
            <p>An error occurred while loading pools.</p>
            <a
              href="javascript:window.top.location.reload(true)"
              className="modal-button relative text-white rounded md:rounded-md py-1 px-3 lg:py-2 lg:px-4 text-[8px] lg:text-xs font-bold flex items-center gap-x-1 lg:gap-x-2 hover:opacity-90"
              data-testid="buy-chedda-link"
            >
              Refresh
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
