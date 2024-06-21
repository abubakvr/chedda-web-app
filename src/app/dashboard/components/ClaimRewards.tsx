import { Card } from "@/components/common";
import React from "react";
import { ConnectWalletBox } from "./ConnectWalletBox";

interface ClaimRewardsProps {
  isWalletConnected: boolean;
}

export const ClaimRewards = ({ isWalletConnected }: ClaimRewardsProps) => {
  return (
    <Card title="CHEDDA INFO">
      {isWalletConnected ? (
        <>
          <div className="hazy-bg flex justif-between gap-x-2">
            <div className="flex flex-col items-center p-4 w-full space-y-1">
              <p className="text-sm text-[#FFFFFF70] font-semibold">
                Lock Rewards
              </p>
              <p className="text-3xl font-bold card-gradient-text">0.758</p>
              <p className="text-sm font-bold card-gradient-text">CHEDDA</p>
              <p className="text-sm text-[#FFFFFF70]">$14.23</p>
            </div>
            <div className="border-0.5 border-l border-[#7F56D9] h-10/12 my-3 opacity-70"></div>
            <div className="flex flex-col items-center p-4 w-full space-y-1">
              <p className="text-sm text-[#FFFFFF70] font-semibold">
                Stake Rewards
              </p>
              <p className="text-3xl font-bold card-gradient-text">1.282</p>
              <p className="text-sm font-bold card-gradient-text">CHEDDA</p>
              <p className="text-sm text-[#FFFFFF70]">$26.35</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-[#FFFFFF70]">
              Claim all your rewards on the protocol in one place
            </div>
            <button className="modal-button text-white rounded-lg p-2.5 px-6 text-sm font-bold">
              Claim all
            </button>
          </div>
        </>
      ) : (
        <ConnectWalletBox title="rewards" />
      )}
    </Card>
  );
};
