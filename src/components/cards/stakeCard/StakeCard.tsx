"use client";
import React, { FC, useState } from "react";
import { Toast } from "@/components/ui";
import { BigNumber, ethers } from "ethers";
import { StakeCardContent } from "./StakeCardContent";
import { formatNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { TabInfo } from "./TabInfo";
import { useTransaction } from "@/hooks";

interface StakeModalProps {
  assetSymbol: string | undefined;
  lpSymbol: string | undefined;
  lpDecimals: number | undefined;
  lpAssetValue: BigNumber | undefined;
  lpAllowance: BigNumber | undefined;
  lpStakingBalance: BigNumber | undefined;
  lpTokenBalance: BigNumber | undefined;
  assetValue: number | undefined;
  defaultTab: string | null;
  updateCard: () => void;
  fetchLpAllowance: () => void;
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

export const StakeCard: FC<StakeModalProps> = ({
  assetSymbol,
  lpSymbol,
  lpDecimals,
  lpAssetValue,
  lpAllowance,
  lpStakingBalance,
  lpTokenBalance,
  assetValue,
  defaultTab,
  updateCard,
  fetchLpAllowance,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "Stake");
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
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [unStakeAmount, setUnstakeAmount] = useState<number>(0);
  const { stakeLpToken, unStakeLpToken, approveLpToken } = useTransaction("");

  const parsedAllowance = parseBigNumberToFloat(lpAllowance, lpDecimals);

  const parsedAssetBalance = parseBigNumberToFloat(lpTokenBalance, lpDecimals);
  const parsedStakingBalance = parseBigNumberToFloat(
    lpStakingBalance,
    lpDecimals
  );
  const parsedAssetValue = parseBigNumberToFloat(lpAssetValue, lpDecimals);

  const parsedAssetPrice = Number(assetValue);

  const lpTokenPrice = parsedAssetPrice * parsedAssetValue;

  const handleStake = async () => {
    console.log("lpDecimals", lpDecimals);
    try {
      if (!stakeAmount || stakeAmount > parsedAssetBalance) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      setShowToast(false);
      const parsedAmount = ethers.utils.parseUnits(
        stakeAmount.toString(),
        lpDecimals
      );

      if (stakeAmount <= parsedAllowance) {
        stakeLpToken(parsedAmount)
          .then(async (res: any) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully staked ${formatNumber(
                  stakeAmount
                )} ${lpSymbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setStakeAmount(0);
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
        approveLpToken(parsedAmount)
          .then(async (res: any) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully approved ${formatNumber(
                  stakeAmount
                )} ${lpSymbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setShowToast(true);
                fetchLpAllowance();
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

  const handleUnStake = async () => {
    console.log("lpDecimals", lpDecimals);
    try {
      if (!unStakeAmount || unStakeAmount > parsedStakingBalance) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      setShowToast(false);
      const parsedAmount = ethers.utils.parseUnits(
        unStakeAmount.toString(),
        lpDecimals
      );

      unStakeLpToken(parsedAmount)
        .then(async (res: any) => {
          if (res) {
            const result = await res.wait();
            if (result.status === 1) {
              const txMessage = `You've successfully Unstaked ${formatNumber(
                unStakeAmount
              )} ${lpSymbol}`;
              setTxDetails({
                txMessage,
                copyText: null,
                txHash: res.hash,
                txStatus: "success",
              });
              setStakeAmount(0);
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
      <div
        className="min-w-[470px] text-white px-8 py-6"
        data-testid="stake-card-container"
      >
        <div className="flex bg-[#201D47] rounded-lg justify-between p-2">
          <Tab
            label="Stake"
            isActive={activeTab === "Stake"}
            onClick={() => {
              setActiveTab("Stake");
              setStakeAmount(0);
            }}
            testId="stake-tab"
          />
          <Tab
            label="Unstake"
            isActive={activeTab === "Unstake"}
            onClick={() => {
              setActiveTab("Unstake");
              setUnstakeAmount(0);
            }}
            testId="unstake-tab"
          />
        </div>
        {activeTab === "Stake" && (
          <div data-testid="stake-content">
            <StakeCardContent
              title="Stake"
              subTitle="Earn $CHEDDA while staking"
              maxAmount={parsedAssetBalance.toString()}
              lpSymbol={lpSymbol}
              assetValue={lpTokenPrice}
              setClearInputField={setClearInputField}
              clearInputField={clearInputField}
              allowance={parsedAllowance}
              modalInfo={
                <TabInfo
                  allowance={parsedAllowance.toString()}
                  myStake={`${parsedStakingBalance} ${lpSymbol}`}
                  exchangeRate={`1 ${lpSymbol} = ${parsedAssetValue} ${assetSymbol}`}
                />
              }
              buttonAction={handleStake}
              isTransactionLoading={txLoading}
              isLoading={false}
              setAmount={setStakeAmount}
              amount={stakeAmount}
            />
          </div>
        )}
        {activeTab === "Unstake" && (
          <div data-testid="unstake-content">
            <StakeCardContent
              title="Unstake"
              subTitle="You will no longer receive staking rewards if you unstake."
              lpSymbol={lpSymbol}
              assetValue={lpTokenPrice}
              allowance={parsedAllowance}
              modalInfo={
                <TabInfo
                  allowance={parsedAllowance.toString()}
                  myStake={`${parsedStakingBalance} ${lpSymbol}`}
                  exchangeRate={`1 ${lpSymbol} = ${parsedAssetValue} ${assetSymbol}`}
                />
              }
              maxAmount={parsedStakingBalance.toString()}
              setClearInputField={setClearInputField}
              clearInputField={clearInputField}
              buttonAction={handleUnStake}
              isTransactionLoading={txLoading}
              isLoading={false}
              setAmount={setUnstakeAmount}
              amount={unStakeAmount}
            />
          </div>
        )}
      </div>
    </>
  );
};
