import React, { useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { ethers } from "ethers";
import { BorrowTabInfo } from "../TabInfo";
import { IToken } from "@/utils/types";
import { useToast, useTransaction } from "@/hooks";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { displayProjectedHealthFactor } from "@/utils/helpers";

export interface RepayTabProps {
  asset: IToken;
  isLoading: Record<string, boolean>;
  accountCollateralAmount: bigint | undefined;
  totalCollateralValue: number;
  healthFactor: bigint | undefined;
  tokenValue: number | undefined;
  tokenBalance: bigint | undefined;
  availableLiquidity: bigint | undefined;
  totalBorrowed: number;
  assetPrice: number;
  allowance: bigint | undefined;
  tokenCollateralValue: bigint | undefined;
  fetchAllowance: (showLoading: boolean) => void;
  refreshModal: () => void;
}

export const RepayTab = ({
  isLoading,
  asset,
  totalCollateralValue,
  healthFactor,
  tokenValue,
  allowance,
  tokenBalance,
  assetPrice,
  totalBorrowed,
  availableLiquidity,
  fetchAllowance,
  refreshModal,
}: RepayTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [txLoading, setTxLoading] = useState(false);
  const { address: tokenAddress, decimals, symbol } = asset;
  const { accountCollateralLoading, healthFactorLoading, allowanceLoading } =
    isLoading;
  const { addToast } = useToast();
  const { repayAsset, approveAsset } = useTransaction(tokenAddress);

  const parsedTotalAccountCollateralValue = totalCollateralValue;
  const parsedAvailableLiquidity = parseBigNumberToFloat(
    availableLiquidity,
    decimals
  );
  const parsedAssetBalance = parseBigNumberToFloat(tokenBalance, decimals);

  const valueOfAssetsBorrowed = totalBorrowed * assetPrice;

  const valueOfNewCollateral = inputAmount * Number(tokenValue);

  const parsedHealthFactor = parseBigNumberToFloat(healthFactor);

  const maxInputValue = Math.min(totalBorrowed, parsedAssetBalance);
  const parsedAllowance = parseBigNumberToFloat(allowance, decimals);
  const projectedHealthFactor =
    parsedTotalAccountCollateralValue /
    (valueOfAssetsBorrowed - valueOfNewCollateral);

  const buttonTitle = parsedAllowance < inputAmount ? "Approve" : "Repay";

  const handleWithdrawCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > maxInputValue) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      const parsedAmount = ethers.parseUnits(inputAmount.toString(), decimals);
      if (inputAmount <= parsedAllowance) {
        repayAsset(parsedAmount)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully repaid ${formatNumber(
                  inputAmount
                )} ${symbol}`;
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "success",
                });
                setInputAmount(0);
                setClearInputField(true);
                refreshModal();
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
          .catch((error) => {
            const errorObject = JSON.parse(error.message);
            addToast({
              message: errorObject.errorMessage,
              copyText: errorObject.fullText,
              type: "error",
            });
            setTxLoading(false);
          });
      } else {
        approveAsset(parsedAmount)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully approved ${formatNumber(
                  inputAmount
                )} ${symbol}`;
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "success",
                });
                fetchAllowance(true);
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
          .catch((error) => {
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

  return (
    <>
      <div data-testid="repay-tab-content" className="mt-4 lg:mt-6">
        <div className="text-xs md:text-sm lg:text-xl font-bold flex justify-between">
          <div>Repay your borrowed asset</div>
        </div>
        <div className="flex justify-between mt-3 lg:mt-4 md:mt-6 items-center text-2xs md:text-xs">
          <div data-testid="amount-label" className="text-mist">
            Enter amount to Repay
          </div>
          <div
            data-testid="max-amount"
            className="font-bold flex items-center gap-x-1"
          >
            <RefreshSpinner isOpen={isLoading.accountCollateralLoading} />
            <div data-testid="max-amount">
              Max:{" "}
              {isLoading.accountCollateralLoading
                ? "_"
                : `${formatLargeNumber(maxInputValue)} ${symbol}`}
            </div>
          </div>
        </div>
        <AmountField
          onChange={(value) => {
            setInputAmount(parseFloat(value));
          }}
          clearInputField={clearInputField}
          setClearInputField={setClearInputField}
          maxValue={maxInputValue.toString()}
          assetPrice={Number(tokenValue) || 0}
        />
        <Button
          type="primary"
          onClick={handleWithdrawCollateral}
          className="mt-3 md:mt-4 lg:mt-6 h-7"
          size="large"
          isLoading={txLoading || allowanceLoading}
          disabled={accountCollateralLoading}
        >
          {buttonTitle} {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-3 md:mt-4 lg:mt-6">
          <BorrowTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            totalBorrowed={`${formatNumber(totalBorrowed)} ${symbol}`}
            projectedTotalBorrowed={`${formatNumber(
              totalBorrowed - (inputAmount || 0)
            )} ${symbol}`}
            collateralValue={`$${formatNumber(totalCollateralValue)} `}
            healthFactor={`${formatNumber(parsedHealthFactor)}`}
            projectedHealthFactor={displayProjectedHealthFactor(
              totalBorrowed,
              projectedHealthFactor,
              parsedHealthFactor
            )}
            liquidity={`${formatNumber(parsedAvailableLiquidity)}  ${symbol}`}
            projectedLiquidity={`${formatNumber(
              parsedAvailableLiquidity + (inputAmount || 0)
            )} ${symbol}`}
          />
        </div>
      </div>
    </>
  );
};
