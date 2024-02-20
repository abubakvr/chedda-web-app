import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { DepositTabInfo } from "../TabInfo";
import { SelectMenu } from "../SelectMenu";
import { IToken } from "@/utils/types";
import { useTransaction } from "@/hooks";
import { BigNumber, ethers } from "ethers";
import { Toast } from "@/components/ui";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { displayProjectedHealthFactor } from "@/utils/helpers";

export interface WithdrawTabProps {
  asset: IToken;
  selectedCollateral: IToken;
  collaterals: IToken[];
  isLoading: Record<string, boolean>;
  accountCollateralAmount: BigNumber | undefined;
  totalCollateralValue: string;
  healthFactor: BigNumber | undefined;
  totalBorrowed: string;
  tokenValue: string | undefined;
  assetPrice: number;
  tokenCollateralValue: BigNumber | undefined;
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  fetchAllowance: (showLoading?: boolean) => void;
  refreshModal: () => void;
  openSupplyModal: (activeTab: "Deposit" | "Withdraw") => void;
}

export const WithdrawTab = ({
  asset,
  selectedCollateral,
  collaterals,
  isLoading,
  accountCollateralAmount,
  totalCollateralValue,
  healthFactor,
  assetPrice,
  tokenValue,
  totalBorrowed,
  tokenCollateralValue,
  setSelectedCollateral,
  fetchAllowance,
  refreshModal,
  openSupplyModal,
}: WithdrawTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
  const { borrowTxStatus, withdrawCollateral, resetTxState } =
    useTransaction(tokenAddress);

  const parsedAccountCollateralAmount = parseFloat(
    parseBigNumberToFloat(accountCollateralAmount, decimals)
  );
  const parsedTotalAccountCollateralValue = parseFloat(totalCollateralValue);

  const parsedTotalBorrowed = parseFloat(totalBorrowed);

  const parsedHealthFactor = parseFloat(
    parseBigNumberToFloat(healthFactor, 18, 10)
  );

  const parsedTokenCollateralValue = parseFloat(
    parseBigNumberToFloat(tokenCollateralValue, 18, 10)
  );

  const valueOfAssetsBorrowed = parsedTotalBorrowed * assetPrice;

  const valueOfNewCollateral = inputAmount * parsedTokenCollateralValue;

  const projectedHealthFactor =
    (parsedTotalAccountCollateralValue - valueOfNewCollateral) /
    valueOfAssetsBorrowed;

  const handleWithdrawCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > parsedAccountCollateralAmount) {
        return alert("Enter valid amount");
      } else if (projectedHealthFactor < 1.05) {
        return alert("Low health factor. Reduce the withdrawal amount");
      }

      const parsedAmount = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals
      );
      await withdrawCollateral(parsedAmount);
      const txMessage = `You've successfully Withdrawn ${formatNumber(
        inputAmount
      )} ${symbol}`;
      setToastMessage(txMessage);
    } catch (error: any) {
      throw Error("Error in withdrawing asset:" + error.message);
    }
  };

  useEffect(() => {
    if (borrowTxStatus.isApproved) {
      setShowToast(true);
      fetchAllowance(false);
      resetTxState();
    }

    if (borrowTxStatus.isCollateralWithdrawn) {
      setInputAmount(0);
      setClearInputField(true);
      setShowToast(true);
      refreshModal();
      resetTxState();
    }
  }, [
    borrowTxStatus.isApproved,
    borrowTxStatus.isCollateralWithdrawn,
    fetchAllowance,
    refreshModal,
    resetTxState,
  ]);

  return (
    <>
      <Toast isOpen={showToast} toastMessage={toastMessage} />
      <div data-testid="withdraw-tab-content" className="mt-6">
        <div className="text-xl font-bold flex justify-between items-center">
          <div>Withdraw your Collateral</div>
          <div>
            <div className="text-[10px] text-[#FFFFFF50] flex justify-end">
              Select asset
            </div>
            <SelectMenu
              setSelectedCollateral={setSelectedCollateral}
              selectedCollateral={selectedCollateral}
              collaterals={collaterals}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6 items-center text-xs">
          <div data-testid="amount-label" className="text-[#DEDEDE]">
            Enter amount to Withdraw
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
                : `${formatLargeNumber(parsedAccountCollateralAmount)} ${symbol}`}
            </div>
          </div>
        </div>
        <AmountField
          onChange={(value) => {
            setInputAmount(parseFloat(value));
          }}
          clearInputField={clearInputField}
          setClearInputField={setClearInputField}
          maxValue={parsedAccountCollateralAmount.toString()}
          assetPrice={Number(tokenValue) || 0}
        />
        {selectedCollateral.symbol === asset.symbol && (
          <div className="text-warning text-xs mt-3">
            You can only withdraw the pool asset by withdrawing{" "}
            <button
              className="cursor-pointer relative"
              onClick={() => openSupplyModal("Withdraw")}
            >
              <u>here</u>
            </button>
          </div>
        )}
        <Button
          type="primary"
          onClick={handleWithdrawCollateral}
          className="mt-6 h-7"
          size="large"
          isLoading={borrowTxStatus.isLoading}
          disabled={
            accountCollateralLoading ||
            selectedCollateral.symbol === asset.symbol
          }
        >
          Withdraw {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
          <DepositTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            symbol={symbol}
            collateralAmount={`${formatNumber(parsedAccountCollateralAmount)} ${symbol}`}
            projectedCollateralAmount={`${formatNumber(
              parsedAccountCollateralAmount - (inputAmount || 0)
            )} ${symbol}`}
            totalCollateralValue={`$${formatNumber(parseFloat(totalCollateralValue))} `}
            projectedTotalCollateralValue={`$${formatNumber(
              parsedTotalAccountCollateralValue -
                (inputAmount * parsedTokenCollateralValue || 0)
            )} `}
            healthFactor={`${formatNumber(parsedHealthFactor)}`}
            projectedHealthFactor={displayProjectedHealthFactor(
              totalBorrowed,
              projectedHealthFactor,
              parsedHealthFactor
            )}
          />
        </div>
      </div>
    </>
  );
};
