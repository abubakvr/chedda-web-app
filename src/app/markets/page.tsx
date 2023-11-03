"use client";

import React from "react";
import { VaultCard, MarketInfoCard } from "@/components/cards";
import { useAggregateStats } from "@/hooks/useAggregateStats";
import { BigNumber, ethers } from "ethers";

function parseBigNumber(bigNumberValue: any) {
  return bigNumberValue
    ? ethers.BigNumber.from(bigNumberValue._hex).toString()
    : 0;
}

const Page = () => {
  const { aggregateStats } = useAggregateStats();

  const marketInfoData = [
    {
      title: "Total Supplied",
      value: parseBigNumber(aggregateStats?.totalSuppliedValue),
    },
    {
      title: "Total Borrowed",
      value: parseBigNumber(aggregateStats?.totalBorrowedValue),
    },
    {
      title: "Total Available",
      value: parseBigNumber(aggregateStats?.totalAvailableValue),
    },
    {
      title: "No. Of Vaults",
      value: parseBigNumber(aggregateStats?.numberOfVaults),
    },
    {
      title: "Total Earned",
      value: parseBigNumber(aggregateStats?.totalFeesPaid),
    },
    {
      title: "TVL",
      value: parseBigNumber(aggregateStats?.tvl),
    },
  ];

  return (
    <div className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto">
      <div className="text-white mt-5 font-open-sans text-2xl xl:text-3xl font-semibold tracking-normal uppercase">
        MARKETS
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 lg:flex lg:gap-x-0 mt-5 lg:space-x-3 xl:space-x-5 flex-wrap lg:flex-nowrap">
        {marketInfoData.map((data, index) => (
          <MarketInfoCard
            key={index}
            index={index}
            title={data.title}
            value={data.value}
          />
        ))}
      </div>
      <div className="mt-8">
        <VaultCard />
      </div>
    </div>
  );
};

export default Page;
