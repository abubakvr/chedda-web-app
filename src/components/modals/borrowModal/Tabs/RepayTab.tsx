import React, { useEffect, useState } from "react";
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
  totalCollateralValue: string;
  healthFactor: BigNumber | undefined;
  tokenValue: string | undefined;
  tokenBalance: BigNumber | undefined;
  availableLiquidity: BigNumber | undefined;
  totalBorrowed: string;
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
  accountCollateralAmount,
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
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = asset;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
  const { borrowTxStatus, repayAsset, approveAsset } =
    useTransaction(tokenAddress);

  const parsedTotalAccountCollateralValue = parseFloat(totalCollateralValue);
  const parsedAvailableLiquidity = parseFloat(
    parseBigNumberToFloat(availableLiquidity, decimals)
  );

  const parsedTotalBorrowed = parseFloat(totalBorrowed);

  const parsedAssetBalance = parseBigNumberToFloat(tokenBalance, decimals);

  const valueOfAssetsBorrowed = parsedTotalBorrowed * assetPrice;

  const valueOfNewCollateral = inputAmount * Number(tokenValue);

  const parsedHealthFactor = parseFloat(parseBigNumberToFloat(healthFactor));

  const maxInputValue = Math.min(
    parsedTotalBorrowed,
    parseFloat(parsedAssetBalance)
  );

  const parsedAllowance = parseFloat(
    parseBigNumberToFloat(allowance, decimals)
  );

  const projectedHealthFactor =
    parsedTotalAccountCollateralValue /
    (valueOfAssetsBorrowed - valueOfNewCollateral);

  const buttonTitle = parsedAllowance < inputAmount ? "Approve" : "Repay";

  const handleWithdrawCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > maxInputValue) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals
      );
      if (inputAmount <= parsedAllowance) {
        await repayAsset(parsedAmount);
        const txMessage = `You've successfully Repaid ${formatNumber(
          inputAmount
        )} ${symbol}`;
        setToastMessage(txMessage);
      } else {
        await approveAsset(parsedAmount);
        const txMessage = `You've successfully approved ${formatNumber(
          inputAmount
        )} ${symbol}`;
        setToastMessage(txMessage);
      }
    } catch (error: any) {
      throw Error("Error in repaying asset:" + error.message);
    }
  };

  useEffect(() => {
    if (borrowTxStatus.isApproved) {
      setShowToast(true);
      fetchAllowance(false);
    }

    if (borrowTxStatus.isAssetRepaid) {
      setInputAmount(0);
      setClearInputField(true);
      setShowToast(true);
      refreshModal();
    }
  }, [
    borrowTxStatus.isAssetRepaid,
    borrowTxStatus.isApproved,
    fetchAllowance,
    refreshModal,
  ]);

  return (
    <>
      <Toast isOpen={showToast} toastMessage={toastMessage} />
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
          isLoading={borrowTxStatus.isLoading}
          disabled={accountCollateralLoading}
        >
          {buttonTitle} {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
          <BorrowTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            totalBorrowed={`${formatNumber(parsedTotalBorrowed)} ${symbol}`}
            projectedTotalBorrowed={`${formatNumber(
              parsedTotalBorrowed - (inputAmount || 0)
            )} ${symbol}`}
            collateralValue={`$${formatNumber(parseFloat(totalCollateralValue))} `}
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
