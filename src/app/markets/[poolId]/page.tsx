"use client";
import { RouteCard, SummaryCard } from "@/components/cards";
import { SummaryHeader } from "@/components/ui";
import {
  useAccountInfo,
  useCheddaBalance,
  useLpTokenBalance,
  usePoolStats,
} from "@/hooks";
import { getPoolSummaryData } from "@/utils/formatResponse";
import React, { useState } from "react";
import LockTab from "./lock/LockTab";
import PoolTab from "./pool/PoolTab";
import StakeTab from "./stake/StakeTab";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Pool");
  const {
    data: poolStats,
    isLoading,
    fetchData: fetchPoolStats,
  } = usePoolStats();
  const {
    data: accountInfo,
    fetchData: fetchAccountInfo,
    isLoading: accountInfoLoading,
  } = useAccountInfo();
  const poolSummary = getPoolSummaryData(poolStats);
  const { data: lpTokenBalance, fetchData: fetchLpTokenBalance } =
    useLpTokenBalance();
  const { data: CheddaTokenBalance, fetchData: fetchCheddaTokenBalance } =
    useCheddaBalance();

  const routePaths = ["Pool", "Stake", "Lock"];

  const pageTabs = [
    {
      name: "Pool",
      info: "Supply your assets to earn interest. Liquidity Providers can also stake LP tokens to earn CHEDDA token rewards.",
      tab: (
        <PoolTab
          poolStats={poolStats}
          setActivePoolTab={setActiveTab}
          fetchPoolStats={fetchPoolStats}
          accountInfo={accountInfo}
          fetchAccountInfo={fetchAccountInfo}
          accountInfoLoading={accountInfoLoading}
          fetchLpTokenBalance={fetchLpTokenBalance}
        />
      ),
    },
    {
      name: "Stake",
      info: "Stake your LP tokens to earn CHEDDA token rewards. CHEDDA token emissions are directed by how much CHEDDA is locked in a pools gauge.",
      tab: (
        <StakeTab
          asset={poolStats?.asset}
          setActiveTab={setActiveTab}
          fetchPoolStats={fetchPoolStats}
          lpTokenBalance={lpTokenBalance}
          fetchLpTokenBalance={fetchLpTokenBalance}
          fetchAccountInfo={fetchAccountInfo}
          fetchCheddaTokenBalance={fetchCheddaTokenBalance}
        />
      ),
    },
    {
      name: "Lock",
      info: "Lock CHEDDA to direct token emissions and earn locking rewards. Locked tokens are susceptible to slashing in case of a shortfall event in the associated pool.",
      tab: (
        <LockTab
          asset={poolStats?.asset}
          fetchPoolStats={fetchPoolStats}
          CheddaTokenBalance={CheddaTokenBalance}
          fetchCheddaTokenBalance={fetchCheddaTokenBalance}
        />
      ),
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
          routhPaths={routePaths}
        />
        {pageTabs.map((item, index) =>
          activeTab === item.name ? <div key={index}>{item.tab}</div> : null
        )}
      </div>
    </div>
  );
};

export default Page;
