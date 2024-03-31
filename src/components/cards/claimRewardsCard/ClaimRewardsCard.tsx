import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import Image from "next/image";
import { BigNumber } from "ethers";
import { useEnvironment, useTokenPrice, useTransaction } from "@/hooks";
import LinkOut from "@/assets/icon/link-out.svg";
import {
  formatCurrency,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { Button } from "@/components/common";
import { Toast } from "@/components/ui";

interface ClaimRewardsCardProps {
  claimableRewards: BigNumber | undefined;
  decimals: number | undefined;
  setActiveTab: Dispatch<SetStateAction<string>>;
  fetchClaimableRewards: (showLoading: boolean) => void;
}

export const ClaimRewardsCard = ({
  claimableRewards,
  decimals,
  setActiveTab,
  fetchClaimableRewards,
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
  const { currentEnvironment } = useEnvironment();
  const { claimRewards } = useTransaction("");
  const cheddaContract =
    useMemo(() => {
      return currentEnvironment?.contracts.Chedda;
    }, [currentEnvironment]) ?? "";
  const { data: assetPrice } = useTokenPrice(cheddaContract);

  const parsedRewardsValue = parseFloat(
    parseBigNumberToFloat(claimableRewards, 18, 5)
  );

  const parsedAssetPrice = Number(assetPrice);

  const rewardValue = parsedAssetPrice * parsedRewardsValue;

  const handleClaimRewards = () => {
    try {
      if (!parsedRewardsValue || parsedRewardsValue === 0) {
        return null;
      }

      setTxLoading(true);
      claimRewards()
        .then(async (res: any) => {
          if (res) {
            const result = await res.wait();
            if (result.status === 1) {
              const txMessage = `You've successfully Claimed ${formatNumber(
                parsedRewardsValue
              )} CHEDDA`;
              setTxDetails({
                txMessage,
                copyText: null,
                txHash: res.hash,
                txStatus: "success",
              });
              setShowToast(true);
              fetchClaimableRewards(false);
            } else {
              const txMessage = `An error occurred while proccessing your transaction`;
              setTxDetails({
                txMessage,
                copyText: null,
                txHash: res.hash,
                txStatus: "failed",
              });
              setShowToast(true);
            }
          }
          setTxLoading(false);
        })
        .catch((error: any) => {
          const errorObject = JSON.parse(error.message);
          setTxDetails({
            txMessage: errorObject.errorMessage,
            copyText: errorObject.fullText,
            txHash: null,
            txStatus: "failed",
          });
          setShowToast(true);
          setTxLoading(false);
        });
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      setTxDetails({
        txMessage: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: null,
        txStatus: "failed",
      });
      setShowToast(true);
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
          <a
            href={`${currentEnvironment?.contractPrefix}}`}
            target="_blank"
            rel="noreferrer"
            className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70"
          >
            <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
              REWARDS GUAGE
            </div>
            <Image src={LinkOut} alt="link out" />
          </a>
        </div>
        <div className="p-8 text-5xl text-white relative">
          <div className="text-xl text-white  border-[#ffffff19] bg-[#ffffff02] border rounded-lg p-3">
            <div className="text-sm font-bold text-[#ffffff70]">
              Claimable Rewards
            </div>
            <div className="mt-2 text-2xl card-gradient-text font-bold">
              {parsedRewardsValue} CHEDDA
            </div>
            <div className="text-xs  text-[#ffffff70] mt-2">
              {formatCurrency(rewardValue)}
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
          <div className="text-xs text-[#ffffff70] flex gap-x-1 mt-6 justify-between items-center">
            Lock CHEDDA to maximise your rewards
            <button
              onClick={() => setActiveTab("Lock")}
              className="button-gradient-text px-3 font-bold py-3 bg-red-500 border border-[#ffffff19] rounded  hover:opacity-80"
            >
              LOCK CHEDDA
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
