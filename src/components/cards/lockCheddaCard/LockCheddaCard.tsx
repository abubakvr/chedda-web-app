"use client";
import React, { FC, useState } from "react";
import { ethers } from "ethers";
import { LockTab } from "./tabs/LockTab";
import { formatNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { TabInfo } from "./TabInfo";
import { useToast, useTransaction } from "@/hooks";
import { formatDate, formatProjectedDate } from "@/utils/helpers";
import { Lock } from "chedda-sdk";
import { WithdrawTab } from "./tabs/WithdrawTab";

interface LockCardProps {
  assetSymbol: string | undefined;
  cheddaSymbol: string | undefined;
  cheddaAllowance: bigint | undefined;
  cheddaTokenBalance: bigint | undefined;
  cheddaPrice: number | undefined;
  defaultTab: string | null;
  lockedChedda: Lock | undefined;
  isAllowanceLoading: boolean;
  openManageLockModal: () => void;
  updateCard: () => void;
  fetchCheddaAllowance: (showLoading: boolean) => void;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}> = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-2xs lg:text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-haze-purple ${
      isActive && "modal-button rounded"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const LockCheddaCard: FC<LockCardProps> = ({
  cheddaSymbol,
  cheddaAllowance,
  cheddaTokenBalance,
  cheddaPrice,
  defaultTab,
  lockedChedda,
  isAllowanceLoading,
  openManageLockModal,
  updateCard,
  fetchCheddaAllowance,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "Lock");
  const [txLoading, setTxLoading] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
  const [lockAmount, setLockAmount] = useState<number>(0);
  const [lockTime, setLockTime] = useState<{
    value: number | undefined;
    days: number | undefined;
  }>({
    value: undefined,
    days: undefined,
  });
  const {
    lockCheddaToken,
    approveCheddaToken,
    withdrawCheddaToken,
    relockCheddaToken,
  } = useTransaction("");
  const { addToast } = useToast();

  const parsedAllowance = parseBigNumberToFloat(cheddaAllowance);
  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance);
  const parsedLockedCheddaAmount = parseBigNumberToFloat(lockedChedda?.amount);
  const parsedLockedCheddaExpiry = new Date(
    parseBigNumberToFloat(lockedChedda?.expiry, 0, 0) * 1000
  );

  const parsedAssetPrice = Number(cheddaPrice);

  async function handleTransaction(
    promise: Promise<any>,
    successMessage: string,
    isApprove: boolean = false
  ) {
    try {
      setTxLoading(true);

      const res = await promise;
      if (res) {
        const result = await res.wait();
        const txMessage =
          result.status === 1
            ? successMessage
            : "An error occurred while processing your transaction";
        const txStatus = result.status === 1 ? "success" : "error";

        if (result.status === 1) {
          addToast({
            message: txMessage,
            txHash: res.hash,
            type: txStatus,
          });
          if (isApprove) {
            fetchCheddaAllowance(true);
          } else {
            updateCard();
            setLockAmount(0);
            setClearInputField(true);
          }
        } else {
          addToast({
            message: txMessage,
            txHash: res.hash,
            type: txStatus,
          });
        }
      }

      setTxLoading(false);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
      setTxLoading(false);
    }
  }

  const handleLockChedda = async () => {
    try {
      if (
        !lockAmount ||
        lockTime.value === undefined ||
        lockAmount > parsedCheddaBalance
      ) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.parseUnits(lockAmount.toString(), 18);

      if (lockAmount <= parsedAllowance) {
        handleTransaction(
          lockCheddaToken(parsedAmount, lockTime.value),
          `You've successfully locked ${formatNumber(lockAmount)} ${cheddaSymbol}`
        );
      } else {
        handleTransaction(
          approveCheddaToken(parsedAmount),
          `You've successfully approved ${formatNumber(lockAmount)} ${cheddaSymbol}`,
          true
        );
      }
    } catch (error) {
      handleTransaction(Promise.reject(error), "");
    }
  };

  const handleWithdrawChedda = async () => {
    try {
      if (!parsedLockedCheddaAmount) {
        return alert(`You do not have have any ${cheddaSymbol} locked`);
      }

      handleTransaction(
        withdrawCheddaToken(),
        `You've successfully withdrawn ${formatNumber(parsedLockedCheddaAmount)} ${cheddaSymbol}`
      );
    } catch (error) {
      handleTransaction(Promise.reject(error), "");
    }
  };

  const handleRelockChedda = async () => {
    try {
      if (!parsedLockedCheddaAmount || !lockedChedda) {
        return alert(`You do not have have any locked ${cheddaSymbol}`);
      }

      handleTransaction(
        relockCheddaToken(lockedChedda?.lockTime),
        `You've successfully relocked ${parsedLockedCheddaAmount} ${cheddaSymbol}`
      );
    } catch (error) {
      handleTransaction(Promise.reject(error), "");
    }
  };

  return (
    <>
      <div
        className="lg:min-w-[400px] xl:min-w-[460px] text-white px-6 py-5 xl:px-8 xl:py-6"
        data-testid="lock-card-container"
      >
        <div className="flex bg-[#201D47] rounded-lg justify-between p-2">
          <Tab
            label="Lock"
            isActive={activeTab === "Lock"}
            onClick={() => {
              setActiveTab("Lock");
              setLockAmount(0);
            }}
            testId="lock-tab"
          />
          <Tab
            label="Withdraw"
            isActive={activeTab === "Withdraw"}
            onClick={() => {
              setActiveTab("Withdraw");
            }}
            testId="withdraw-tab"
          />
        </div>
        {activeTab === "Lock" && (
          <div data-testid="lock-content">
            <LockTab
              title="Lock"
              subTitle="Earn more CHEDDA while staking"
              maxAmount={parsedCheddaBalance.toString()}
              cheddaSymbol={cheddaSymbol}
              cheddaPrice={parsedAssetPrice}
              setClearInputField={setClearInputField}
              clearInputField={clearInputField}
              allowance={parsedAllowance}
              lockCheddaToken={handleLockChedda}
              isTransactionLoading={txLoading || isAllowanceLoading}
              setAmount={setLockAmount}
              amount={lockAmount}
              lockedChedda={parsedLockedCheddaAmount}
              lockTime={lockTime.value}
              setLockTime={setLockTime}
              openManageLockModal={openManageLockModal}
              modalInfo={
                <TabInfo
                  allowance={parsedAllowance.toString()}
                  amountToLock={`${lockAmount || 0} ${cheddaSymbol}`}
                  projectedMaturityDate={formatProjectedDate(
                    lockTime?.days || 0
                  )}
                  lockedAmount={`${formatNumber(parsedLockedCheddaAmount)} ${cheddaSymbol}`}
                  maturityDate={formatDate(parsedLockedCheddaExpiry)}
                  isCheddaLocked={Number(parsedLockedCheddaAmount) > 0}
                />
              }
            />
          </div>
        )}
        {activeTab === "Withdraw" && (
          <div data-testid="withdraw-content">
            <WithdrawTab
              title="Withdraw"
              subTitle="Or relock your unlocked CHEDDA"
              cheddaSymbol={cheddaSymbol}
              cheddaPrice={parsedAssetPrice}
              withdrawChedda={handleWithdrawChedda}
              relockChedda={handleRelockChedda}
              isTransactionLoading={txLoading}
              lockedChedda={parsedLockedCheddaAmount}
              cheddaExpiry={parsedLockedCheddaExpiry}
              modalInfo={
                <TabInfo
                  lockedAmount={`${formatNumber(parsedLockedCheddaAmount)} ${cheddaSymbol}`}
                  maturityDate={formatDate(parsedLockedCheddaExpiry)}
                  isCheddaLocked={true}
                />
              }
            />
          </div>
        )}
      </div>
    </>
  );
};
