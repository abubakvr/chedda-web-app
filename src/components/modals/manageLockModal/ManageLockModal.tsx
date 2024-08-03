"use client";
import React, { FC, useState } from "react";
import { Lock } from "chedda-sdk";
import { Toast } from "@/components/ui";
import { ethers } from "ethers";
import { LockTab } from "./tabs/LockTab";
import { formatNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { TabInfo } from "./TabInfo";
import { useTransaction } from "@/hooks";
import { formatDate, formatProjectedDate } from "@/utils/helpers";

interface ManageLockCardProps {
  isOpen: boolean;
  cheddaSymbol: string | undefined;
  cheddaAllowance: bigint | undefined;
  cheddaTokenBalance: bigint | undefined;
  cheddaPrice: number | undefined;
  defaultTab: string | null;
  lockedChedda: Lock | undefined;
  isAllowanceLoading: boolean;
  onClose: () => void;
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
    className={`text-[10px] md:text-xs lg:text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-[#4c37a740] ${
      isActive && "modal-button rounded"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const ManageLockCard: FC<ManageLockCardProps> = ({
  isOpen,
  cheddaSymbol,
  cheddaAllowance,
  cheddaTokenBalance,
  cheddaPrice,
  defaultTab,
  lockedChedda,
  isAllowanceLoading,
  onClose,
  updateCard,
  fetchCheddaAllowance,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "ExtendLock");
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
  const { lockMoreCheddaToken, approveCheddaToken, relockCheddaToken } =
    useTransaction("");

  const parsedAllowance = parseBigNumberToFloat(cheddaAllowance);
  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance);
  const parsedLockedCheddaAmount = parseBigNumberToFloat(lockedChedda?.amount);
  const parsedLockedCheddaExpiry = new Date(
    parseBigNumberToFloat(lockedChedda?.expiry, 0, 0) * 1000
  );

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
            setLockTime({
              value: undefined,
              days: undefined,
            });
            setLockAmount(0);
            setClearInputField(true);
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

  const handleAddMoreChedda = async () => {
    try {
      if (!lockAmount || lockAmount > parsedCheddaBalance) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.parseUnits(lockAmount.toString(), 18);

      if (lockAmount <= parsedAllowance) {
        handleTransaction(
          lockMoreCheddaToken(parsedAmount),
          `You've successfully added ${formatNumber(lockAmount)} ${cheddaSymbol}`
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

  const handleExtendLock = async () => {
    try {
      if (!parsedLockedCheddaAmount || !lockedChedda) {
        return alert(`You do not have any locked ${cheddaSymbol}`);
      }

      if (lockTime.value === undefined) {
        return alert(`You have not selected a lock period`);
      }

      handleTransaction(
        relockCheddaToken(lockTime?.value),
        `You've successfully extended your lock date`
      );
    } catch (error) {
      handleTransaction(Promise.reject(error), "");
    }
  };

  const handleCloseModal = () => {
    onClose();
    setLockTime({
      value: undefined,
      days: undefined,
    });
    setLockAmount(0);
    setClearInputField(true);
    setActiveTab("ExtendLock");
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
        data-testid="modal-container"
        className={`fixed inset-0 ${
          isOpen ? "block" : "hidden"
        } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="app-modal p-4 md:p-6 lg:p-8 rounded shadow-lg w-11/12 max-w-[370px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[550px] text-white">
            <div className="flex justify-between items-center">
              <h2
                className="text-lg md:text-2xl lg:text-3xl font-bold"
                data-testid="supply-modal-title"
              >
                Manage Lock
              </h2>
              <button
                className="text-2xl md:text-3xl lg:text-4xl cursor-pointer font-bold text-white relative"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <div className="flex mt-3 md:mt-4 lg:mt-6 bg-[#201D47] rounded-lg justify-between p-2">
              <Tab
                label="Extend Lock"
                isActive={activeTab === "ExtendLock"}
                onClick={() => {
                  setActiveTab("ExtendLock");
                  setLockAmount(0);
                }}
                testId="extend-lock-tab"
              />
              <Tab
                label="Add More Chedda"
                isActive={activeTab === "AddMore"}
                onClick={() => {
                  setActiveTab("AddMore");
                  setLockTime({
                    value: undefined,
                    days: undefined,
                  });
                }}
                testId="add-more-tab"
              />
            </div>
            {activeTab === "ExtendLock" && (
              <div data-testid="extend-lock-content">
                <LockTab
                  isExtendTab={true}
                  title="Extend the lock time of your CHEDDA to boost reward earnings."
                  info="You can Extend lock/or Add more CHEDDA"
                  maxAmount={parsedCheddaBalance}
                  cheddaSymbol={cheddaSymbol}
                  cheddaPrice={cheddaPrice}
                  setClearInputField={setClearInputField}
                  clearInputField={clearInputField}
                  allowance={parsedAllowance}
                  buttonAction={handleExtendLock}
                  isTransactionLoading={txLoading || isAllowanceLoading}
                  setAmount={setLockAmount}
                  amount={lockAmount}
                  lockExpiry={parsedLockedCheddaExpiry}
                  lockTime={lockTime}
                  setLockTime={setLockTime}
                  modalInfo={
                    <TabInfo
                      lockTime={lockTime}
                      allowance={parsedAllowance.toString()}
                      projectedMaturityDate={formatProjectedDate(
                        lockTime?.days || 0
                      )}
                      lockedAmount={`${formatNumber(parsedLockedCheddaAmount)} ${cheddaSymbol}`}
                      maturityDate={formatDate(parsedLockedCheddaExpiry)}
                      projectedLockAmount={`${formatNumber(lockAmount + parsedLockedCheddaAmount)} ${cheddaSymbol}`}
                    />
                  }
                />
              </div>
            )}
            {activeTab === "AddMore" && (
              <div data-testid="add-more-content">
                <LockTab
                  isExtendTab={false}
                  title="Lock more CHEDDA to earn more rewards."
                  info="You can Extend lock/or Add more CHEDDA"
                  maxAmount={parsedCheddaBalance}
                  cheddaSymbol={cheddaSymbol}
                  cheddaPrice={cheddaPrice}
                  setClearInputField={setClearInputField}
                  clearInputField={clearInputField}
                  allowance={parsedAllowance}
                  buttonAction={handleAddMoreChedda}
                  isTransactionLoading={txLoading || isAllowanceLoading}
                  setAmount={setLockAmount}
                  amount={lockAmount}
                  lockTime={lockTime}
                  setLockTime={setLockTime}
                  lockExpiry={parsedLockedCheddaExpiry}
                  modalInfo={
                    <TabInfo
                      lockTime={lockTime}
                      allowance={parsedAllowance.toString()}
                      projectedMaturityDate={formatProjectedDate(
                        lockTime?.days || 0
                      )}
                      lockedAmount={`${formatNumber(parsedLockedCheddaAmount)} ${cheddaSymbol}`}
                      projectedLockAmount={`${formatNumber(lockAmount + parsedLockedCheddaAmount) || parsedLockedCheddaAmount} ${cheddaSymbol}`}
                      maturityDate={formatDate(parsedLockedCheddaExpiry)}
                    />
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
