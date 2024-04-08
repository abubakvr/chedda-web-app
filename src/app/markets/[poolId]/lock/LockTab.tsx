"use client";
import React, { useState } from "react";
import {
  ClaimRewardsCard,
  LockCheddaCard,
  LockingInfoCard,
} from "@/components/cards";
import {
  useCheddaAllowance,
  useCheddaBalance,
  useClaimableLockRewards,
  useEnvironment,
  useTotalWeightSum,
  useLockedChedda,
  useTokenValue,
  useTotalAmountLocked,
  useTotalWeight,
} from "@/hooks";
import { IToken } from "@/utils/types";
import { InfoCardSkeleton, SwitchTabSkeleton } from "@/components/ui";
import { ManageLockCard } from "@/components/modals/manageLockModal/ManageLockModal";

const LockTab = ({ asset }: { asset: IToken | undefined }) => {
  const [openManageLockModal, setOpenManageLockModal] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { data: CheddaTokenBalance, fetchData: fetchCheddaTokenBalance } =
    useCheddaBalance();
  const {
    data: cheddaAllowance,
    fetchData: fetchCheddaAllowance,
    isLoading: cheddaAllowanceLoading,
  } = useCheddaAllowance();
  const { data: cheddaPrice, isLoading: cheddaPriceLoading } = useTokenValue(
    currentEnvironment?.contracts.Chedda || ""
  );
  const {
    data: lockedChedda,
    isLoading: lockedCheddaLoading,
    fetchData: fetchLockedChedaa,
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

  const updateCard = () => {
    fetchCheddaTokenBalance(false);
    fetchCheddaAllowance(false);
    fetchLockedChedaa(false);
    fetchClaimableRewards(false);
    fetchTotalWeight(false);
    fetchTotalWeightSum(false);
    fetchTotalAmountLocked(false);
  };

  const isLoading =
    cheddaPriceLoading ||
    lockedCheddaLoading ||
    claimableRewardsLoading ||
    totalAmountLockedLoading ||
    totalWeightLoading ||
    totalWeightSumLoading;

  if (isLoading) {
    return (
      <div className="mt-8 w-full flex space-x-5" data-testid="lock-container">
        <div
          className="pool-card rounded-lg h-fit w-full"
          data-testid="lock-information-card"
        >
          <InfoCardSkeleton title="Lock Information" itemCount={3} />
        </div>
        <div className="pool-card rounded-lg w-full" data-testid="lock-card">
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
    <>
      <div
        className="mt-8 w-full flex space-x-5"
        data-testid="lock-chedda-container"
      >
        <div
          className="pool-card rounded-lg h-72 w-full"
          data-testid="lock-information-card"
        >
          <LockingInfoCard
            assetSymbol={"CHEDDA"}
            totalWeight={totalWeight}
            totalWeightSum={totalWeightSum}
            totalAmountLocked={totalAmountLocked}
          />
        </div>
        <div
          className="pool-card rounded-lg w-full"
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
          className="pool-card rounded-lg h-fit w-full"
          data-testid="lock-rewards-card"
        >
          <ClaimRewardsCard
            claimableRewards={claimableRewards}
            fetchClaimableRewards={fetchClaimableRewards}
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
