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
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [lockTime, setLockTime] = useState<{
    value: number | undefined;
    days: number | undefined;
  }>({
    value: undefined,
    days: undefined,
  });
  const { lockCheddaToken, approveCheddaToken } = useTransaction("");

  const parsedAllowance = parseFloat(parseBigNumberToFloat(cheddaAllowance));
  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance);
  const parsedLockedCheddaAmount = parseBigNumberToFloat(lockedChedda?.amount);
  const parsedLockedCheddaExpiry = new Date(
    parseFloat(parseBigNumberToFloat(lockedChedda?.expiry, 0, 0)) * 1000
  );

  const parsedAssetPrice = Number(cheddaPrice);
  const handleLock = async () => {
    try {
      if (
        !lockAmount ||
        lockTime.value === undefined ||
        lockAmount > parseFloat(parsedCheddaBalance)
      ) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      setShowToast(false);
      const parsedAmount = ethers.utils.parseUnits(lockAmount.toString(), 18);

      if (lockAmount <= parsedAllowance) {
        lockCheddaToken(parsedAmount, lockTime.value)
          .then(async (res: any) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully locked ${formatNumber(
                  lockAmount
                )} ${cheddaSymbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setLockAmount(0);
                setClearInputField(true);
                setShowToast(true);
                updateCard();
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
      } else {
        approveCheddaToken(parsedAmount)
          .then(async (res: any) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully approved ${formatNumber(
                  lockAmount
                )} ${cheddaSymbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setShowToast(true);
                fetchCheddaAllowance();
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
      setTxLoading(false);
    }
  };

  const handleWithdraw = async () => {};

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
              setWithdrawAmount(0);
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
              buttonAction={handleLock}
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
      </div>
    </>
  );
};
