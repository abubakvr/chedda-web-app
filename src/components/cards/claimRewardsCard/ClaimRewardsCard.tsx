"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useToast, useTransaction } from "@/hooks";
import {
  formatCurrency,
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { Button } from "@/components/common";

interface ClaimRewardsCardProps {
  claimableRewards: bigint | undefined;
  assetPrice: number | undefined;
  rewardType: "Stake" | "Lock";
  setActiveTab?: Dispatch<SetStateAction<string>>;
  fetchClaimableRewards: () => void;
  fetchCheddaTokenBalance: () => void;
}

export const ClaimRewardsCard = ({
  claimableRewards,
  rewardType,
  assetPrice,
  setActiveTab,
  fetchClaimableRewards,
  fetchCheddaTokenBalance,
}: ClaimRewardsCardProps) => {
  const [txLoading, setTxLoading] = useState(false);
  const { addToast } = useToast();

  const { claimStakeRewards, claimLockRewards } = useTransaction("");

  const parsedRewardsValue = parseBigNumberToFloat(claimableRewards, 18, 5);

  const parsedAssetPrice = Number(assetPrice);

  const rewardValue = parsedAssetPrice * parsedRewardsValue;

  const handleClaimRewards = async () => {
    try {
      if (!parsedRewardsValue || parsedRewardsValue === 0) {
        return null;
      }

      setTxLoading(true);
      let res;
      if (rewardType === "Lock") {
        res = await claimLockRewards();
      } else {
        res = await claimStakeRewards();
      }

      if (res) {
        const result = await res.wait();
        if (result.status === 1) {
          const txMessage = `You've successfully Claimed ${formatNumber(parsedRewardsValue)} CHEDDA`;
          addToast({
            message: txMessage,
            txHash: res.hash,
            type: "success",
          });
          fetchClaimableRewards();
          fetchCheddaTokenBalance();
        } else {
          const txMessage = `An error occurred while processing your transaction`;
          addToast({
            message: txMessage,
            txHash: res.hash,
            type: "error",
          });
        }
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
    } finally {
      setTxLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 lg:px-8 h-10 lg:h-[50px] items-center">
          <div className="text-white text-opacity-50 font-bold text-2xs lg:text-sm uppercase">
            CLAIM REWARDS
          </div>
        </div>
        <div className="px-4 md:px-6 py-4 lg:px-8 lg:py-6 text-5xl text-white relative">
          <div className="text-xl text-white  border-frost bg-glass border rounded-lg p-3">
            <div className="text-xs lg:text-sm font-bold text-mist">
              Claimable Rewards
            </div>
            <div className="mt-2 text-lg lg:text-2xl card-gradient-text font-bold">
              {formatLargeNumber(parsedRewardsValue)} CHEDDA
            </div>
            <div className="text-xs  text-mist lg:mt-2">
              {rewardValue ? formatCurrency(rewardValue) : "$0.00"}
            </div>
          </div>
          <Button
            size="small"
            type="secondary"
            onClick={() => handleClaimRewards()}
            className="secondary-button py-3 mt-4 lg:mt-6 w-full border-red-400"
            isLoading={txLoading}
            disabled={!parsedRewardsValue || parsedRewardsValue === 0}
          >
            Claim
          </Button>
          {setActiveTab && (
            <div className="text-3xs md:text-2xs lg:text-xs text-mist flex gap-x-1 mt-4 lg:mt-6 justify-between items-center">
              Lock CHEDDA to maximise your rewards
              <button
                onClick={() => setActiveTab("Lock")}
                className="px-3 font-bold py-3 bg-[#00000030] rounded-sm  hover:opacity-80"
              >
                <div className="button-gradient-text ">LOCK CHEDDA</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
