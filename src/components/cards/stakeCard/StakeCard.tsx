"use client";
import React, { FC, useState } from "react";
import { ethers } from "ethers";
import { StakeCardContent } from "./StakeCardContent";
import { formatNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { TabInfo } from "./TabInfo";
import { useToast, useTransaction } from "@/hooks";

interface StakeModalProps {
  assetSymbol: string | undefined;
  lpSymbol: string | undefined;
  lpDecimals: number | undefined;
  lpAssetValue: bigint | undefined;
  lpAllowance: bigint | undefined;
  lpStakingBalance: bigint | undefined;
  lpTokenBalance: bigint | undefined;
  assetValue: number | undefined;
  defaultTab: string | null;
  lpAllowanceLoading: boolean;
  updateCard: () => void;
  fetchLpAllowance: (showLoading: boolean) => void;
}

const Tab: FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  testId: string;
}> = ({ label, isActive, onClick, testId }) => (
  <button
    data-testid={testId}
    className={`text-[10px] lg:text-sm font-bold px-4 py-2 focus:outline-none relative w-full hover:bg-[#4c37a740] ${
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
  lpAllowanceLoading,
  updateCard,
  fetchLpAllowance,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || "Stake");
  const [txLoading, setTxLoading] = useState(false);
  const [clearInputField, setClearInputField] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [unStakeAmount, setUnstakeAmount] = useState<number>(0);
  const { stakeLpToken, unStakeLpToken, approveLpToken } = useTransaction("");
  const { addToast } = useToast();

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
    try {
      if (!stakeAmount || stakeAmount > parsedAssetBalance) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      const parsedAmount = ethers.parseUnits(
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
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "success",
                });
                setStakeAmount(0);
                setClearInputField(true);
                updateCard();
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "error",
                });
              }
            }
            setTxLoading(false);
          })
          .catch((error: any) => {
            const errorObject = JSON.parse(error.message);
            addToast({
              message: errorObject.errorMessage,
              copyText: errorObject.fullText,
              type: "error",
            });
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
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "success",
                });
                fetchLpAllowance(true);
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "error",
                });
              }
            }
            setTxLoading(false);
          })
          .catch((error: any) => {
            const errorObject = JSON.parse(error.message);
            addToast({
              message: errorObject.errorMessage,
              copyText: errorObject.fullText,
              type: "error",
            });
            setTxLoading(false);
          });
      }
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
      setTxLoading(false);
    }
  };

  const handleUnStake = async () => {
    try {
      if (!unStakeAmount || unStakeAmount > parsedStakingBalance) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      const parsedAmount = ethers.parseUnits(
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
              addToast({
                message: txMessage,
                txHash: res.hash,
                type: "success",
              });
              setStakeAmount(0);
              setClearInputField(true);
              updateCard();
            } else {
              const txMessage = `An error occurred while proccessing your transaction`;
              addToast({
                message: txMessage,
                txHash: res.hash,
                type: "error",
              });
            }
          }
          setTxLoading(false);
        })
        .catch((error: any) => {
          const errorObject = JSON.parse(error.message);
          addToast({
            message: errorObject.errorMessage,
            copyText: errorObject.fullText,
            type: "error",
          });
          setTxLoading(false);
        });
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
      setTxLoading(false);
    }
  };

  return (
    <>
      <div
        className="lg:min-w-[400px] xl:min-w-[460px] text-white px-4 py-4 md:px-6 md:py-5 xl:px-8 xl:py-6"
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
              isTransactionLoading={txLoading || lpAllowanceLoading}
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
              isTransactionLoading={txLoading || lpAllowanceLoading}
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
