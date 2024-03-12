"use client";
import { RouteCard, SummaryCard } from "@/components/cards";
import { SummaryHeader } from "@/components/ui";
import { usePoolStats } from "@/hooks";
import { getPoolSummaryData } from "@/utils/formatResponse";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { data: poolStats, isLoading } = usePoolStats();
  const poolSummary = getPoolSummaryData(poolStats);
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
        <RouteCard />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
