"use client";
import React from "react";
import { PageTitle, PageContainer } from "@/components/common";
import { PositionInfo } from "./components/PositionInfo";
import { MyPositions } from "./components/MyPositions";
import { BridgeAssets } from "./components/BridgeAssetInfo";
import { ClaimRewards } from "./components/ClaimRewards";
import { CheddaInfo } from "./components/CheddaInfo";
import { useWeb3React } from "@web3-react/core";

const Page = () => {
  const { account } = useWeb3React();
  const isWalletConnected = account !== undefined;

  return (
    <PageContainer>
      <PageTitle title="DASHBOARD">
        Track all your positions in one place.
      </PageTitle>
      <div className="mt-6 flex justify-between w-full space-x-6">
        <div className="w-[62%]">
          <CheddaInfo isWalletConnected={isWalletConnected} />
        </div>
        <div className="w-[38%]">
          <ClaimRewards isWalletConnected={isWalletConnected} />
        </div>
      </div>
      <div className="">
        <PositionInfo isWalletConnected={isWalletConnected} />
      </div>
      <div className="mt-6">
        <MyPositions isWalletConnected={isWalletConnected} />
      </div>
      <div className="mt-6">
        <BridgeAssets />
      </div>
    </PageContainer>
  );
};

export default Page;
