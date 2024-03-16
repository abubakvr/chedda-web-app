"use client";
import { RouteCard, SummaryCard } from "@/components/cards";
import { SummaryHeader } from "@/components/ui";
import { usePoolStats } from "@/hooks";
import { getPoolSummaryData } from "@/utils/formatResponse";
import React, { useState } from "react";
import PoolTab from "./pool/PoolTab";
import StakeTab from "./stake/StakeTab";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Pool");
  const { data: poolStats, isLoading } = usePoolStats();
  const poolSummary = getPoolSummaryData(poolStats);

  const pageTabs = [
    {
      name: "Pool",
      info: "Supply your assets to earn interest. Liquidity Providers can also stake LP tokens to earn CHEDDA token rewards.",
      tab: <PoolTab poolStats={poolStats} setActivePoolTab={setActiveTab} />,
    },
    {
      name: "Stake",
      info: "Stake your LP tokens to earn CHEDDA token rewards. CHEDDA token emissions are directed by how much CHEDDA is locked in a pools gauge.",
      tab: <StakeTab asset={poolStats?.asset} />,
    },
    {
      name: "Lock",
      info: "Stake your LP tokens to earn CHEDDA token rewards. CHEDDA token emissions are directed by how much CHEDDA is locked in a pools’ gauge.",
    },
  ];

  const routeInfo =
    pageTabs.find((item) => item.name === activeTab)?.info || "";
  return (
    <div>
      <div
        className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto pb-10"
        data-testid="pool-container"
      >
        <div className="my-7">
          <SummaryHeader
            logoSrc={poolStats?.asset.logo}
            assetName={poolStats?.characterization}
          />
        </div>
        <SummaryCard stats={poolSummary} isLoading={!poolStats || isLoading} />
        <RouteCard
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          routeInfo={routeInfo}
        />
        {pageTabs.map((item, index) =>
          activeTab === item.name ? <div key={index}>{item.tab}</div> : null
        )}
      </div>
    </div>
  );
};

export default Page;
