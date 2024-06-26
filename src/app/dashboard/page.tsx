"use client";
import React from "react";
import { PageTitle, PageContainer } from "@/components/common";
import { MyPositions } from "./components/MyPositions";
import { BridgeAssets } from "./components/BridgeAssetInfo";
import { ClaimRewards } from "./components/ClaimRewards";
import { CheddaInfo } from "./components/CheddaInfo";
import { useWeb3React } from "@web3-react/core";
import { PositionSummary } from "./components/PositionSummary";
import { useAllPositions, useTokenValue } from "@/hooks";
import { currentEnvironment } from "@/data/environments";

const Page = () => {
  const { account } = useWeb3React();
  const isWalletConnected = account !== undefined;

  const { data: allPositions, isLoading: allPositionsLoading } =
    useAllPositions();

  const { data: cheddaTokenPrice, isLoading: cheddaTokenPriceLoading } =
    useTokenValue(currentEnvironment?.contracts.CheddaToken || "");

  return (
    <PageContainer>
      <PageTitle title="DASHBOARD">
        Track all your positions in one place.
      </PageTitle>
      <div className="mt-6 flex justify-between w-full space-x-6">
        <div className="w-[62%]">
          <CheddaInfo
            isWalletConnected={isWalletConnected}
            cheddaTokenPrice={cheddaTokenPrice}
            cheddaTokenPriceLoading={cheddaTokenPriceLoading}
          />
        </div>
        <div className="w-[38%]">
          <ClaimRewards
            isWalletConnected={isWalletConnected}
            cheddaTokenPrice={cheddaTokenPrice}
            cheddaTokenPriceLoading={cheddaTokenPriceLoading}
          />
        </div>
      </div>
      <div className="mt-6">
        <PositionSummary
          isWalletConnected={isWalletConnected}
          allPositions={allPositions}
          allPositionsLoading={allPositionsLoading}
        />
      </div>
      <div className="mt-6">
        <MyPositions
          isWalletConnected={isWalletConnected}
          allPositions={allPositions}
          allPositionsLoading={allPositionsLoading}
          cheddaTokenPrice={cheddaTokenPrice}
          cheddaTokenPriceLoading={cheddaTokenPriceLoading}
        />
      </div>
      <div className="mt-6">
        <BridgeAssets />
      </div>
    </PageContainer>
  );
};

export default Page;
