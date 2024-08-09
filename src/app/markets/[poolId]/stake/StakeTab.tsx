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
  lpTokenBalance,
  setActiveTab,
  fetchPoolStats,
  fetchAccountInfo,
  fetchLpTokenBalance,
  fetchCheddaTokenBalance,
}: {
  asset: IToken | undefined;
  lpTokenBalance: bigint | undefined;
  setActiveTab: Dispatch<SetStateAction<string>>;
  fetchPoolStats: () => void;
  fetchAccountInfo: () => void;
  fetchLpTokenBalance: () => void;
  fetchCheddaTokenBalance: () => void;
}) => {
  const { data: stakingBalance, fetchData: fetchStakingBalance } =
    useStakingBalance();
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
    fetchStakingBalance();
    fetchLpTokenBalance();
    fetchLpAllowance();
    fetchTotalSupply();
    fetchLpStakers();
    fetchTotalStaked();
    fetchClaimableRewards();
    fetchPoolStats();
    fetchAccountInfo();
  };

  const isLoading =
    lpSymbolLoading ||
    lpAssetLoading ||
    claimableRewardsLoading ||
    lpAllowanceLoading ||
    lpDecimalsLoading ||
    tokenValueLoading ||
    lpStakersLoading ||
    totalStakedLoading ||
    totalSupplyLoading;

  if (isLoading) {
    return (
      <div
        className="mt-6 lg:mt-8 custom-grid-card"
        data-testid="stake-container"
      >
        <div
          className="pool-card rounded-lg h-fit w-full order-3 lg:order-1 grid-info-card"
          data-testid="stake-information-card"
        >
          <InfoCardSkeleton title="Stake Info" itemCount={3} />
        </div>
        <div
          className="pool-card rounded-lg w-full h-fit order-0 xl:order-2"
          data-testid="stake-card"
        >
          <SwitchTabSkeleton />
        </div>
        <div
          className="pool-card rounded-lg h-fit order-2 lg:order-3 grid-claim-card w-full"
          data-testid="rewards-card"
        >
          <InfoCardSkeleton title="Claim Rewards" itemCount={3} />
        </div>
        <div className="order-3 xl:hidden"></div>
      </div>
    );
  }

  return (
    <div
      className="mt-6 lg:mt-8 custom-grid-card"
      data-testid="stake-container"
    >
      <div
        className="pool-card rounded-lg h-fit w-full order-3 lg:order-1 grid-info-card"
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
      <div
        className="pool-card rounded-lg order-1 lg:order-2 grid-action-card w-full"
        data-testid="stake-card"
      >
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
          lpAllowanceLoading={lpAllowanceLoading}
        />
      </div>
      <div
        className="pool-card h-fit order-2 lg:order-3 grid-claim-card w-full"
        data-testid="rewards-card"
      >
        <ClaimRewardsCard
          claimableRewards={claimableRewards}
          setActiveTab={setActiveTab}
          fetchClaimableRewards={fetchClaimableRewards}
          fetchCheddaTokenBalance={fetchCheddaTokenBalance}
          rewardType="Stake"
        />
      </div>
    </div>
  );
};

export default StakeTab;
