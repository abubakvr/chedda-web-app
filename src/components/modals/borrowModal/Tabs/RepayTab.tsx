import React, { useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { BorrowTabInfo } from "../TabInfo";
import { IToken } from "@/utils/types";
import { useTransaction } from "@/hooks";
import { BigNumber, ethers } from "ethers";
import { Toast } from "@/components/ui";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { displayProjectedHealthFactor } from "@/utils/helpers";

export interface RepayTabProps {
  asset: IToken;
  isLoading: Record<string, boolean>;
  accountCollateralAmount: BigNumber | undefined;
  totalCollateralValue: number;
  healthFactor: BigNumber | undefined;
  tokenValue: number | undefined;
  tokenBalance: BigNumber | undefined;
  availableLiquidity: BigNumber | undefined;
  totalBorrowed: number;
  assetPrice: number;
  allowance: BigNumber | undefined;
  tokenCollateralValue: BigNumber | undefined;
  fetchAllowance: (showLoading?: boolean) => void;
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
  const [showToast, setShowToast] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [txLoading, setTxLoading] = useState(false);
  const { address: tokenAddress, decimals, symbol } = asset;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
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
      setShowToast(false);
      const parsedAmount = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals
      );
      if (inputAmount <= parsedAllowance) {
        repayAsset(parsedAmount)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully repaid ${formatNumber(
                  inputAmount
                )} ${symbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setInputAmount(0);
                setClearInputField(true);
                setShowToast(true);
                refreshModal();
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
          .catch((error) => {
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
        approveAsset(parsedAmount)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully approved ${formatNumber(
                  inputAmount
                )} ${symbol}`;
                setTxDetails({
                  txMessage,
                  copyText: null,
                  txHash: res.hash,
                  txStatus: "success",
                });
                setShowToast(true);
                fetchAllowance(false);
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
          .catch((error) => {
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

  return (
    <>
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
      />
      <div data-testid="repay-tab-content" className="mt-6">
        <div className="text-xl font-bold flex justify-between">
          <div>Repay your borrowed asset</div>
        </div>
        <div className="flex justify-between mt-6 items-center text-xs">
          <div data-testid="amount-label" className="text-[#DEDEDE]">
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
          className="mt-6 h-7"
          size="large"
          isLoading={txLoading}
          disabled={accountCollateralLoading}
        >
          {buttonTitle} {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
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
