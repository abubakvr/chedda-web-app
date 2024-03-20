"use client";
import Image from "next/image";
import React from "react";
import LinkOut from "@/assets/icon/link-out.svg";
import { StakeCard, RewardsCard } from "@/components/cards";
import {
  useLpAllowance,
  useLpAssetValue,
  useLpDecimals,
  useLpSymbol,
  useLpTokenBalance,
  useStakingBalance,
  useTokenValue,
} from "@/hooks";
import { IToken } from "@/utils/types";

const StakeTab = ({ asset }: { asset: IToken | undefined }) => {
  const { data: stakingBalance, fetchData: fetchStakingBalance } =
    useStakingBalance();
  const { data: lpTokenBalance, fetchData: fetchLpTokenBalance } =
    useLpTokenBalance();
  const {
    data: lpAllowance,
    fetchData: fetchLpAllowance,
    isLoading: lpAllowanceLoading,
  } = useLpAllowance();
  const { data: lpSymbol, isLoading: lpSymbolLoading } = useLpSymbol();
  const { data: lpAssetValue, isLoading: lpAssetLoading } = useLpAssetValue();
  const { data: lpDecimals, isLoading: lpDecimalsLoading } = useLpDecimals();
  const { data: assetPrice, isLoading: tokenValueLoading } = useTokenValue(
    asset?.address || ""
  );
  const updateCard = () => {
    fetchStakingBalance(false);
    fetchLpTokenBalance(false);
    fetchLpAllowance(false);
  };

  const isLoading =
    lpAllowanceLoading ||
    lpSymbolLoading ||
    lpAssetLoading ||
    lpDecimalsLoading ||
    tokenValueLoading;

  if (isLoading) {
    return (
      <div
        data-testid="loading-spinner"
        className="flex justify-center items-center h-full"
      >
        <div className="border-t-2 border-b-2 border-white border-solid h-12 w-12 rounded-full animate-spin mt-12"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full flex space-x-5" data-testid="stake-container">
      <div
        className="pool-card rounded-lg h-72 w-full"
        data-testid="stake-information-card"
      >
        <RewardsCard />
      </div>
      <div className="pool-card rounded-lg w-full" data-testid="stake-card">
        <StakeCard
          assetSymbol={asset?.symbol}
          lpSymbol={lpSymbol}
          lpDecimals={lpDecimals}
          lpAssetValue={lpAssetValue}
          lpAllowance={lpAllowance}
          lpStakingBalance={stakingBalance}
          lpTokenBalance={lpTokenBalance}
          assetValue={assetPrice}
          updateCard={updateCard}
          fetchLpAllowance={fetchLpAllowance}
          defaultTab={"Stake"}
        />
      </div>
      <div
        className="pool-card rounded-lg h-72 w-full"
        data-testid="rewards-card"
      >
        <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center">
          <div className="text-white text-opacity-50 font-bold text-sm uppercase">
            Claim Rewards
          </div>
          <button className="flex gap-x-1 border-2 rounded-md py-[6px] px-3 border-[#ffffff60] hover:opacity-70">
            <div className="relative opacity-100 text-[#D9D9D9] uppercase font-bold text-[10px]">
              Rewards Gauge
            </div>
            <Image src={LinkOut} alt="link out" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakeTab;
