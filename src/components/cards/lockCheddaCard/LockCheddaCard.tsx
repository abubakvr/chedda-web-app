"use client";
import React, { FC, useState } from "react";
import { Toast } from "@/components/ui";
import { BigNumber, ethers } from "ethers";
import { LockTab } from "./tabs/LockTab";
import { formatNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { TabInfo } from "./TabInfo";
import { useTransaction } from "@/hooks";
import { formatDate, projectDateTime } from "@/utils/helpers";
import { Lock } from "chedda-sdk";
import { WithdrawTab } from "./tabs/WithdrawTab";

interface LockCardProps {
  assetSymbol: string | undefined;
  cheddaSymbol: string | undefined;
  cheddaAllowance: BigNumber | undefined;
  cheddaTokenBalance: BigNumber | undefined;
  cheddaPrice: string | undefined;
  defaultTab: string | null;
  lockedChedda: Lock | undefined;
  isAllowanceLoading: boolean;
  updateCard: () => void;
  fetchCheddaAllowance: () => void;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}> = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-[#4c37a740] ${
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
  updateCard,
  fetchCheddaAllowance,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "Lock");
  const [showToast, setShowToast] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
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

  const parsedAllowance = parseFloat(parseBigNumberToFloat(cheddaAllowance));
  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance);
  const parsedLockedCheddaAmount = parseBigNumberToFloat(lockedChedda?.amount);
  const parsedLockedCheddaExpiry = new Date(
    parseFloat(parseBigNumberToFloat(lockedChedda?.expiry, 0, 0)) * 1000
  );

  const parsedAssetPrice = Number(cheddaPrice);
  async function handleTransaction(
    promise: Promise<any>,
    successMessage: string,
    isApprove: boolean = false
  ) {
    try {
      setTxLoading(true);
      setShowToast(false);

      const res = await promise;
      if (res) {
        const result = await res.wait();
        const txMessage =
          result.status === 1
            ? successMessage
            : "An error occurred while processing your transaction";
        const txStatus = result.status === 1 ? "success" : "failed";

        setTxDetails({
          txMessage,
          copyText: null,
          txHash: res.hash,
          txStatus,
        });

        if (result.status === 1) {
          setShowToast(true);
          if (isApprove) {
            fetchCheddaAllowance();
          } else {
            updateCard();
          }
        } else {
          setShowToast(true);
        }
      }

      setTxLoading(false);
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
  }

  const handleLockChedda = async () => {
    try {
      if (
        !lockAmount ||
        lockTime.value === undefined ||
        lockAmount > parseFloat(parsedCheddaBalance)
      ) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.utils.parseUnits(lockAmount.toString(), 18);

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
        `You've successfully withdrawn ${formatNumber(parseFloat(parsedLockedCheddaAmount))} ${cheddaSymbol}`
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
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
      />
      <div
        className="w-[470px] text-white px-8 py-6"
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
              maxAmount={parsedCheddaBalance}
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
              modalInfo={
                <TabInfo
                  allowance={parsedAllowance.toString()}
                  amountToLock={`${lockAmount || 0} ${cheddaSymbol}`}
                  projectedMaturityDate={projectDateTime(lockTime?.days || 0)}
                  lockedAmount={`${parsedLockedCheddaAmount} ${cheddaSymbol}`}
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
                  lockedAmount={`${parsedLockedCheddaAmount} ${cheddaSymbol}`}
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
