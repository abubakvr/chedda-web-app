"use client";
import React from "react";
import { PageTitle, PageContainer } from "@/components/common";
import { MyPositions } from "./components/MyPositions";
import { BridgeSection } from "./components/BridgeSection";
import { ClaimRewards } from "./components/ClaimRewards";
import { CheddaInfo } from "./components/CheddaInfo";
import { useWeb3React } from "@web3-react/core";
import { PositionSummary } from "./components/PositionSummary";
import { useAllPositions, useCheddaBalance, useCheddaPrice } from "@/hooks";
import { currentEnvironment } from "@/data/environments";

const Page = () => {
  const { account } = useWeb3React();
  const isWalletConnected = account !== undefined;

  const { data: allPositions, isLoading: allPositionsLoading } =
    useAllPositions();

  const {
    data: cheddaTokenBalance,
    isLoading: cheddaTokenBalanceLoading,
    fetchData: fetchCheddaBalance,
  } = useCheddaBalance();

  const { data: cheddaTokenPrice, isLoading: cheddaTokenPriceLoading } =
    useCheddaPrice(currentEnvironment?.contracts.CheddaToken);

  return (
    <PageContainer>
      <PageTitle title="DASHBOARD">
        Track all your positions in one place.
      </PageTitle>
      <div className="mt-4 md:mt-6 md:flex justify-between w-full gap-x-6 space-y-4 md:space-y-0">
        <div className="md:w-1/2 lg:w-[59%] xl:w-[62%]">
          <CheddaInfo
            isWalletConnected={isWalletConnected}
            cheddaTokenBalance={cheddaTokenBalance}
            cheddaTokenBalanceLoading={cheddaTokenBalanceLoading}
            cheddaTokenPrice={cheddaTokenPrice}
            cheddaTokenPriceLoading={cheddaTokenPriceLoading}
          />
        </div>
        <div className="md:w-1/2 lg:w-[41%] xl:w-[38%]">
          <ClaimRewards
            isWalletConnected={isWalletConnected}
            cheddaTokenPrice={cheddaTokenPrice}
            cheddaTokenPriceLoading={cheddaTokenPriceLoading}
            fetchCheddaBalance={fetchCheddaBalance}
          />
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <PositionSummary
          isWalletConnected={isWalletConnected}
          allPositions={allPositions}
          allPositionsLoading={allPositionsLoading}
        />
      </div>
      <div className="mt-4 md:mt-6">
        <MyPositions
          isWalletConnected={isWalletConnected}
          allPositions={allPositions}
          allPositionsLoading={allPositionsLoading}
          cheddaTokenPrice={cheddaTokenPrice}
          cheddaTokenPriceLoading={cheddaTokenPriceLoading}
        />
      </div>
      <div className="mt-4 md:mt-6">
        <BridgeSection />
      </div>
    </PageContainer>
  );
};

export default Page;
