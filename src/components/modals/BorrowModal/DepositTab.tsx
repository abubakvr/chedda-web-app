import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { DepositTabInfo } from "./TabInfo";
import { SelectMenu } from "./SelectMenu";
import { IToken } from "@/utils/types";
import { useTransaction } from "@/hooks";
import { BigNumber, ethers } from "ethers";
import { Toast } from "@/components/ui";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";

interface DepositTabProps {
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  fetchAllowance: (showLoading?: boolean) => void;
  refreshModal: () => void;
  selectedCollateral: IToken;
  collaterals: IToken[];
  isLoading: Record<string, boolean>;
  totalBorrowed: string;
  assetPrice: number;
  tokenValue: string | undefined;
  allowance: BigNumber | undefined;
  accountCollateral: Record<string, BigNumber> | undefined;
  tokenBalance: BigNumber | undefined;
  healthFactor: BigNumber | undefined;
  tokenCollateralValue: BigNumber | undefined;
}

export const DepositTab = ({
  selectedCollateral,
  collaterals,
  isLoading,
  allowance,
  accountCollateral,
  tokenBalance,
  healthFactor,
  assetPrice,
  tokenValue,
  totalBorrowed,
  tokenCollateralValue,
  setSelectedCollateral,
  fetchAllowance,
  refreshModal,
}: DepositTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const {
    allowanceLoading,
    accountCollateralLoading,
    tokenBalanceLoading,
    healthFactorLoading,
  } = isLoading;
  const { borrowTxStatus, depositCollateral, approveAsset, resetTxState } =
    useTransaction(tokenAddress);

  const parsedAllowance = parseFloat(
    parseBigNumberToFloat(allowance, decimals)
  );
  const parsedAssetBalance = parseBigNumberToFloat(tokenBalance, decimals);
  const parsedAccountCollateral = parseFloat(
    parseBigNumberToFloat(accountCollateral?.accountCollateralAmount, decimals)
  );
  const parsedTotalAccountCollateralValue = parseFloat(
    parseBigNumberToFloat(
      accountCollateral?.totalAccountCollateralValue,
      18,
      10
    )
  );
  const parsedHealthFactor = parseFloat(
    parseBigNumberToFloat(healthFactor, 18, 10)
  );
  const parsedTokenCollateralValue = parseFloat(
    parseBigNumberToFloat(tokenCollateralValue, 18, 10)
  );
  const valueOfAssetsBorrowed = parseFloat(totalBorrowed) * assetPrice;

  const valueOfNewCollateral = inputAmount * parsedTokenCollateralValue;

  const projectedHealthFactor =
    (parsedTotalAccountCollateralValue + valueOfNewCollateral) /
    valueOfAssetsBorrowed;

  const buttonTitle = parsedAllowance < inputAmount ? "Approve" : "Deposit";

  const handleDepositCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > parseFloat(parsedAssetBalance)) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals
      );

      if (inputAmount <= parsedAllowance) {
        await depositCollateral(parsedAmount);
        const txMessage = `You've successfully deposited ${formatNumber(
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
      throw Error("Error in depositing asset:" + error.message);
    }
  };

  useEffect(() => {
    if (borrowTxStatus.isApproved) {
      setShowToast(true);
      fetchAllowance(false);
      resetTxState();
    }

    if (borrowTxStatus.isCollateralDeposited) {
      setInputAmount(0);
      setClearInputField(true);
      setShowToast(true);
      refreshModal();
      resetTxState();
    }
  }, [
    borrowTxStatus.isApproved,
    borrowTxStatus.isCollateralDeposited,
    fetchAllowance,
    refreshModal,
    resetTxState,
  ]);

  return (
    <>
      <Toast isOpen={showToast} toastMessage={toastMessage} />
      <div data-testid="deposit-tab-content" className="mt-6">
        <div className="text-xl font-bold flex justify-between items-center">
          <div>Deposit your Collateral</div>
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
            Enter amount to Deposit
          </div>
          <div
            data-testid="max-amount"
            className="font-bold flex items-center gap-x-1"
          >
            <RefreshSpinner isOpen={tokenBalanceLoading} />
            <div data-testid="max-amount">
              Max:{" "}
              {tokenBalanceLoading
                ? "_"
                : `${formatLargeNumber(parsedAssetBalance)} ${symbol}`}
            </div>
          </div>
        </div>
        <AmountField
          onChange={(value) => {
            setInputAmount(parseFloat(value));
          }}
          clearInputField={clearInputField}
          setClearInputField={setClearInputField}
          maxValue={parsedAssetBalance}
          assetPrice={Number(tokenValue) || 0}
        />
        <Button
          type="primary"
          onClick={handleDepositCollateral}
          className="mt-6 h-7"
          size="large"
          isLoading={borrowTxStatus.isLoading}
          disabled={accountCollateralLoading || allowanceLoading}
        >
          {buttonTitle} {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
          <DepositTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            symbol={symbol}
            collateralAmount={`${formatNumber(parsedAccountCollateral)} ${symbol}`}
            projectedCollateralAmount={`${formatNumber(
              parsedAccountCollateral + (inputAmount || 0)
            )} ${symbol}`}
            totalCollateralValue={`$${formatNumber(parsedTotalAccountCollateralValue)} `}
            projectedTotalCollateralValue={`$${formatNumber(
              parsedTotalAccountCollateralValue +
                (inputAmount * parsedTokenCollateralValue || 0)
            )} `}
            healthFactor={`${formatNumber(parsedHealthFactor)}`}
            projectedHealthFactor={projectedHealthFactor || parsedHealthFactor}
          />
        </div>
      </div>
    </>
  );
};
