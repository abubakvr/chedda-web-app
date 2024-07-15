import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { BigNumber } from "ethers";
import { useTokenPrice, useTransaction } from "@/hooks";
import {
  formatCurrency,
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { Button } from "@/components/common";
import { Toast } from "@/components/ui";
import { currentEnvironment } from "@/data/environments";

interface ClaimRewardsCardProps {
  claimableRewards: BigNumber | undefined;
  rewardType: "Stake" | "Lock";
  setActiveTab?: Dispatch<SetStateAction<string>>;
  fetchClaimableRewards: () => void;
  fetchCheddaTokenBalance: () => void;
}

export const ClaimRewardsCard = ({
  claimableRewards,
  rewardType,
  setActiveTab,
  fetchClaimableRewards,
  fetchCheddaTokenBalance,
}: ClaimRewardsCardProps) => {
  const [showToast, setShowToast] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [{ txMessage, txHash, txStatus, copyText }, setTxDetails] = useState<{
    txMessage: string;
    txHash: string | null;
    copyText: string | null;
    txStatus: "success" | "failed";
  }>({
    copyText: "",
    txMessage: "",
    txHash: "",
    txStatus: "success",
  });
  const { claimStakeRewards, claimLockRewards } = useTransaction("");
  const cheddaContract = currentEnvironment?.contracts.CheddaToken;
  const { data: assetPrice } = useTokenPrice(cheddaContract);

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
          setTxDetails({
            txMessage,
            copyText: null,
            txHash: res.hash,
            txStatus: "success",
          });
          setShowToast(true);
          fetchClaimableRewards();
          fetchCheddaTokenBalance();
        } else {
          const txMessage = `An error occurred while processing your transaction`;
          setTxDetails({
            txMessage,
            copyText: null,
            txHash: res.hash,
            txStatus: "failed",
          });
          setShowToast(true);
        }
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      setTxDetails({
        txMessage: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: null,
        txStatus: "failed",
      });
      setShowToast(true);
    } finally {
      setTxLoading(false);
    }
  };

  return (
    <>
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
      />
      <div className="w-full">
        <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
          <div className="text-white text-opacity-50 font-bold text-sm uppercase">
            CLAIM REWARDS
          </div>
        </div>
        <div className="px-8 py-6 text-5xl text-white relative">
          <div className="text-xl text-white  border-[#ffffff19] bg-[#ffffff02] border rounded-lg p-3">
            <div className="text-sm font-bold text-[#ffffff70]">
              Claimable Rewards
            </div>
            <div className="mt-2 text-2xl card-gradient-text font-bold">
              {formatLargeNumber(parsedRewardsValue)} CHEDDA
            </div>
            <div className="text-xs  text-[#ffffff70] mt-2">
              {rewardValue ? formatCurrency(rewardValue) : "$0.00"}
            </div>
          </div>
          <Button
            size="small"
            type="secondary"
            onClick={() => handleClaimRewards()}
            className="secondary-button py-3 mt-6 w-full border-red-400"
            isLoading={txLoading}
            disabled={!parsedRewardsValue || parsedRewardsValue === 0}
          >
            Claim
          </Button>
          {setActiveTab && (
            <div className="text-xs text-[#ffffff70] flex gap-x-1 mt-6 justify-between items-center">
              Lock CHEDDA to maximise your rewards
              <button
                onClick={() => setActiveTab("Lock")}
                className="button-gradient-text px-3 font-bold py-3 bg-red-500 border border-[#ffffff19] rounded  hover:opacity-80"
              >
                LOCK CHEDDA
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
