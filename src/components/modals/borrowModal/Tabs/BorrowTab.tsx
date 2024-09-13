import React, { useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { BorrowTabInfo } from "../TabInfo";
import { IToken } from "@/utils/types";
import { useToast, useTransaction } from "@/hooks";
import { ethers } from "ethers";
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
  const [inputAmount, setInputAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = asset;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
  const { borrowAsset } = useTransaction(tokenAddress);
  const { addToast } = useToast();

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
      const parsedAmount = ethers.parseUnits(inputAmount.toString(), decimals);
      const tx = await borrowAsset(parsedAmount);
      if (tx) {
        const result = await tx.wait();
        if (result.status === 1) {
          const txMessage = `You've successfully borrowed ${formatNumber(
            inputAmount
          )} ${symbol}`;
          addToast({
            copyText: undefined,
            message: txMessage,
            txHash: tx.hash,
            type: "success",
          });
          setInputAmount(0);
          setClearInputField(true);

          refreshModal();
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          addToast({
            copyText: undefined,
            message: txMessage,
            txHash: tx.hash,
            type: "error",
          });
        }
      }
      setTxLoading(false);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: undefined,
        type: "error",
      });
      setTxLoading(false);
    }
  };

  return (
    <>
      <div data-testid="withdraw-tab-content" className="mt-4 lg:mt-6">
        <div className="text-xs md:text-sm lg:text-xl font-bold flex justify-between">
          <div>Select amount to Borrow</div>
        </div>
        <div className="flex justify-between mt-3 lg:mt-4 md:mt-6 items-center text-[10px] md:text-xs">
          <div data-testid="amount-label" className="text-[#FFFFFF70]">
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
          className="mt-3 md:mt-4 lg:mt-6 h-7"
          size="large"
          isLoading={txLoading}
          disabled={accountCollateralLoading}
        >
          Borrow {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-3 md:mt-4 lg:mt-6">
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
