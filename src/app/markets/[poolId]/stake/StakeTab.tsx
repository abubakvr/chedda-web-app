"use client";
import React, { Dispatch, SetStateAction } from "react";
import { StakeCard, StakingInfoCard } from "@/components/cards";
import {
  useClaimableStakeRewards,
  useLpAllowance,
  useLpAssetValue,
  useLpDecimals,
  useLpStakers,
  useLpSymbol,
  useLpTokenBalance,
  useStakingBalance,
  useTokenValue,
  useTotalStaked,
  useTotalSupply,
} from "@/hooks";
import { IToken } from "@/utils/types";
import { ClaimRewardsCard } from "@/components/cards";
import { InfoCardSkeleton, SwitchTabSkeleton } from "@/components/ui";

const StakeTab = ({
  asset,
  setActiveTab,
  fetchPoolStats,
}: {
  asset: IToken | undefined;
  setActiveTab: Dispatch<SetStateAction<string>>;
  fetchPoolStats: (showLoading: false) => void;
}) => {
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
  const {
    data: totalStaked,
    isLoading: totalStakedLoading,
    fetchData: fetchTotalStaked,
  } = useTotalStaked();
  const {
    data: claimableRewards,
    isLoading: claimableRewardsLoading,
    fetchData: fetchClaimableRewards,
  } = useClaimableStakeRewards();
  const {
    data: lpStakers,
    isLoading: lpStakersLoading,
    fetchData: fetchLpStakers,
  } = useLpStakers();
  const {
    data: totalSupply,
    isLoading: totalSupplyLoading,
    fetchData: fetchTotalSupply,
  } = useTotalSupply();

  const updateCard = () => {
    fetchStakingBalance(false);
    fetchLpTokenBalance(false);
    fetchLpAllowance(false);
    fetchTotalSupply(false);
    fetchLpStakers(false);
    fetchTotalStaked(false);
    fetchClaimableRewards(false);
    fetchPoolStats(false);
  };

  const isLoading =
    lpAllowanceLoading ||
    lpSymbolLoading ||
    lpAssetLoading ||
    lpDecimalsLoading ||
    tokenValueLoading ||
    lpStakersLoading ||
    totalStakedLoading ||
    claimableRewardsLoading ||
    totalSupplyLoading;

  if (isLoading) {
    return (
      <div className="mt-8 w-full flex space-x-5" data-testid="stake-container">
        <div
          className="pool-card rounded-lg h-fit w-full"
          data-testid="stake-information-card"
        >
          <InfoCardSkeleton title="Stake Information" itemCount={3} />
        </div>
        <div className="pool-card rounded-lg w-full" data-testid="stake-card">
          <SwitchTabSkeleton />
        </div>
        <div
          className="pool-card rounded-lg h-fit w-full"
          data-testid="rewards-card"
        >
          <InfoCardSkeleton title="Claim Rewards" itemCount={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full flex space-x-5" data-testid="stake-container">
      <div
        className="pool-card rounded-lg h-72 w-full"
        data-testid="stake-information-card"
      >
        <StakingInfoCard
          assetSymbol={asset?.symbol}
          assetDecimals={asset?.decimals}
          totalStaked={totalStaked}
          lpStakers={lpStakers}
          lpDecimals={lpDecimals}
          lpSymbol={lpSymbol}
          lpAssetValue={lpAssetValue}
          totalSupply={totalSupply}
        />
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
        className="pool-card rounded-lg h-fit w-full"
        data-testid="rewards-card"
      >
        <ClaimRewardsCard
          claimableRewards={claimableRewards}
          setActiveTab={setActiveTab}
          fetchClaimableRewards={fetchClaimableRewards}
          rewardType="Stake"
        />
      </div>
    </div>
  );
};

export default StakeTab;
