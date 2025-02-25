"use client";
import React, { useState } from "react";
import {
  ClaimRewardsCard,
  LockCheddaCard,
  LockingInfoCard,
} from "@/components/cards";
import {
  useCheddaAllowance,
  useClaimableLockRewards,
  useTotalWeightSum,
  useLockedChedda,
  useTotalAmountLocked,
  useTotalWeight,
  useCheddaPrice,
  useGaugeAddress,
} from "@/hooks";
import { IToken } from "@/utils/types";
import { InfoCardSkeleton, SwitchTabSkeleton } from "@/components/ui";
import { ManageLockCard } from "@/components/modals/manageLockModal/ManageLockModal";
import { currentEnvironment } from "@/data/environments";

const LockTab = ({
  asset,
  CheddaTokenBalance,
  fetchPoolStats,
  fetchCheddaTokenBalance,
}: {
  asset: IToken | undefined;
  CheddaTokenBalance: bigint | undefined;
  fetchPoolStats: () => void;
  fetchCheddaTokenBalance: () => void;
}) => {
  const [openManageLockModal, setOpenManageLockModal] = useState(false);
  const {
    data: cheddaAllowance,
    fetchData: fetchCheddaAllowance,
    isLoading: cheddaAllowanceLoading,
  } = useCheddaAllowance();
  const { data: cheddaPrice, isLoading: cheddaPriceLoading } = useCheddaPrice(
    currentEnvironment?.contracts.CheddaToken
  );
  const {
    data: lockedChedda,
    isLoading: lockedCheddaLoading,
    fetchData: fetchLockedChedda,
  } = useLockedChedda();

  const {
    data: totalWeight,
    isLoading: totalWeightLoading,
    fetchData: fetchTotalWeight,
  } = useTotalWeight();

  const {
    data: totalWeightSum,
    isLoading: totalWeightSumLoading,
    fetchData: fetchTotalWeightSum,
  } = useTotalWeightSum();

  const {
    data: totalAmountLocked,
    isLoading: totalAmountLockedLoading,
    fetchData: fetchTotalAmountLocked,
  } = useTotalAmountLocked();

  const {
    data: claimableRewards,
    isLoading: claimableRewardsLoading,
    fetchData: fetchClaimableRewards,
  } = useClaimableLockRewards();

  const { data: CheddaTokenPrice } = useCheddaPrice(
    currentEnvironment?.contracts.CheddaToken
  );

  const { data: lockingGaugeAddress } = useGaugeAddress();

  const updateCard = () => {
    fetchCheddaTokenBalance();
    fetchCheddaAllowance();
    fetchLockedChedda();
    fetchClaimableRewards();
    fetchTotalWeight();
    fetchTotalWeightSum();
    fetchTotalAmountLocked();
    fetchPoolStats();
  };

  const isLoading =
    cheddaPriceLoading ||
    claimableRewardsLoading ||
    lockedCheddaLoading ||
    totalAmountLockedLoading ||
    totalWeightLoading ||
    totalWeightSumLoading;

  if (isLoading) {
    return (
      <div
        className="mt-6 lg:mt-8 custom-grid-card"
        data-testid="lock-container"
      >
        <div
          className="pool-card rounded-lg h-72 w-full order-3 lg:order-1 grid-info-card"
          data-testid="lock-information-card"
        >
          <InfoCardSkeleton title="Lock Info" itemCount={3} />
        </div>
        <div
          className="pool-card rounded-lg h-fit order-1 lg:order-2 grid-action-card w-full"
          data-testid="lock-card"
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
    <>
      <div
        className="mt-6 lg:mt-8 custom-grid-card"
        data-testid="lock-chedda-container"
      >
        <div
          className="pool-card rounded-lg h-fit w-full order-3 lg:order-1 grid-info-card"
          data-testid="lock-information-card"
        >
          <LockingInfoCard
            assetSymbol={"CHEDDA"}
            lockingGaugeAddress={lockingGaugeAddress}
            totalWeight={totalWeight}
            totalWeightSum={totalWeightSum}
            totalAmountLocked={totalAmountLocked}
          />
        </div>
        <div
          className="pool-card rounded-lg h-fit order-1 lg:order-2 grid-action-card w-full"
          data-testid="lock-chedda-card"
        >
          <LockCheddaCard
            openManageLockModal={() => setOpenManageLockModal(true)}
            assetSymbol={asset?.symbol}
            cheddaSymbol="CHEDDA"
            lockedChedda={lockedChedda}
            cheddaAllowance={cheddaAllowance}
            cheddaTokenBalance={CheddaTokenBalance}
            cheddaPrice={cheddaPrice}
            isAllowanceLoading={cheddaAllowanceLoading}
            updateCard={updateCard}
            fetchCheddaAllowance={fetchCheddaAllowance}
            defaultTab={"Lock"}
          />
        </div>
        <div
          className="pool-card rounded-lg h-fit order-2 lg:order-3 grid-claim-card w-full"
          data-testid="lock-rewards-card"
        >
          <ClaimRewardsCard
            claimableRewards={claimableRewards}
            assetPrice={CheddaTokenPrice}
            fetchClaimableRewards={fetchClaimableRewards}
            fetchCheddaTokenBalance={fetchCheddaTokenBalance}
            rewardType="Lock"
          />
        </div>
      </div>
      <ManageLockCard
        isOpen={openManageLockModal}
        onClose={() => setOpenManageLockModal(false)}
        cheddaSymbol="CHEDDA"
        lockedChedda={lockedChedda}
        cheddaAllowance={cheddaAllowance}
        cheddaTokenBalance={CheddaTokenBalance}
        cheddaPrice={cheddaPrice}
        isAllowanceLoading={cheddaAllowanceLoading}
        updateCard={updateCard}
        fetchCheddaAllowance={fetchCheddaAllowance}
        defaultTab={"ExtendLock"}
      />
    </>
  );
};

export default LockTab;
