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
import { ethers } from "ethers";
import { Toast } from "@/components/ui";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { displayProjectedHealthFactor } from "@/utils/helpers";

export interface BorrowTabProps {
  asset: IToken;
  isLoading: Record<string, boolean>;
  accountCollateralAmount: bigint | undefined;
  totalCollateralValue: number;
  healthFactor: bigint | undefined;
  tokenValue: number | undefined;
  availableLiquidity: bigint | undefined;
  totalBorrowed: number;
  assetPrice: number;
  tokenCollateralValue: bigint | undefined;
  fetchAllowance: () => void;
  refreshModal: () => void;
}

export const BorrowTab = ({
  isLoading,
  asset,
  totalCollateralValue,
  healthFactor,
  tokenValue,
  assetPrice,
  totalBorrowed,
  availableLiquidity,
  refreshModal,
}: BorrowTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [{ txMessage, txHash, txStatus }, setTxDetails] = useState<{
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
  const { address: tokenAddress, decimals, symbol } = asset;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
  const { borrowAsset } = useTransaction(tokenAddress);

  const parsedAvailableLiquidity = parseBigNumberToFloat(
    availableLiquidity,
    decimals
  );

  const valueOfAssetsBorrowed = totalBorrowed * assetPrice;

  const valueOfNewCollateral = inputAmount * Number(tokenValue);

  const parsedHealthFactor = parseBigNumberToFloat(healthFactor);

  const totalBorrowable = (totalCollateralValue * 0.95) / assetPrice;

  const projectedHealthFactor =
    totalCollateralValue / (valueOfAssetsBorrowed + valueOfNewCollateral);

  const maxBorrowValue = Math.min(totalBorrowable, parsedAvailableLiquidity);

  const handleWithdrawCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > maxBorrowValue) {
        return alert("Enter valid amount");
      }

      setTxLoading(true);
      setShowToast(false);
      const parsedAmount = ethers.parseUnits(inputAmount.toString(), decimals);
      const tx = await borrowAsset(parsedAmount);
      if (tx) {
        const result = await tx.wait();
        console.log(result);
        if (result.status === 1) {
          const txMessage = `You've successfully borrowed ${formatNumber(
            inputAmount
          )} ${symbol}`;
          setTxDetails({
            copyText: null,
            txMessage,
            txHash: tx.hash,
            txStatus: "success",
          });
          setInputAmount(0);
          setClearInputField(true);
          setShowToast(true);
          refreshModal();
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          setTxDetails({
            copyText: null,
            txMessage,
            txHash: tx.hash,
            txStatus: "failed",
          });
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
  };

  return (
    <>
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
      />
      <div data-testid="withdraw-tab-content" className="mt-6">
        <div className="text-xl font-bold flex justify-between">
          <div>Select amount to Borrow</div>
        </div>
        <div className="flex justify-between mt-6 items-center text-xs">
          <div data-testid="amount-label" className="text-[#DEDEDE]">
            Enter amount to Borrow
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
                : `${formatLargeNumber(maxBorrowValue)} ${symbol}`}
            </div>
          </div>
        </div>
        <AmountField
          onChange={(value) => {
            setInputAmount(parseFloat(value));
          }}
          clearInputField={clearInputField}
          setClearInputField={setClearInputField}
          maxValue={maxBorrowValue.toString()}
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
          Borrow {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
          <BorrowTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            totalBorrowed={`${formatNumber(totalBorrowed)} ${symbol}`}
            projectedTotalBorrowed={`${formatNumber(
              totalBorrowed + (inputAmount || 0)
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
              parsedAvailableLiquidity - (inputAmount || 0)
            )} ${symbol}`}
          />
        </div>
      </div>
    </>
  );
};
