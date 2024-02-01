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
  allowance: BigNumber | undefined;
  accountCollateral: Record<string, BigNumber> | undefined;
  tokenBalance: BigNumber | undefined;
  healthFactor: BigNumber | undefined;
  assetPrice: string | undefined;
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
  setSelectedCollateral,
  fetchAllowance,
  refreshModal,
}: DepositTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [amount, setAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const {
    allowanceLoading,
    accountCollateralLoading,
    tokenBalanceLoading,
    healthFactorLoading,
  } = isLoading;
  const { borrowTxStatus, depositCollateral, approveAsset } =
    useTransaction(tokenAddress);

  const parsedAllowance = parseFloat(
    parseBigNumberToFloat(allowance, decimals)
  );
  const parsedAssetBalance = parseBigNumberToFloat(tokenBalance, decimals);
  const parsedAccountCollateral = parseFloat(
    parseBigNumberToFloat(accountCollateral?.accountCollateralAmount, decimals)
  );
  const parsedAccountCollateralValue = parseFloat(
    parseBigNumberToFloat(accountCollateral?.totalAccountCollateralValue)
  );
  const parsedHealthFactor = parseFloat(parseBigNumberToFloat(healthFactor));
  const buttonTitle = parsedAllowance < amount ? "Approve" : "Deposit";
  const projectedHealthFactor =
    parsedAccountCollateralValue / (amount * Number(assetPrice || 0));

  const handleDepositCollateral = async () => {
    try {
      if (!amount || amount > parseFloat(parsedAssetBalance)) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

      if (amount <= parsedAllowance) {
        await depositCollateral(parsedAmount);
        const txMessage = `You've successfully deposited ${formatNumber(
          amount
        )} ${symbol}`;
        setToastMessage(txMessage);
      } else {
        await approveAsset(parsedAmount);
        const txMessage = `You've successfully approved ${formatNumber(
          amount
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
    }

    if (borrowTxStatus.isCollateralDeposited) {
      setAmount(0);
      setClearInputField(true);
      setShowToast(true);
      refreshModal();
    }
  }, [
    borrowTxStatus.isApproved,
    borrowTxStatus.isCollateralDeposited,
    fetchAllowance,
    refreshModal,
  ]);

  return (
    <>
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        toastMessage={toastMessage}
        duration={10000}
      />
      <div data-testid="deposit-tab-content" className="mt-6">
        <div className="text-xl font-bold flex justify-between">
          <div>Deposit your Collateral</div>
          <SelectMenu
            setSelectedCollateral={setSelectedCollateral}
            selectedCollateral={selectedCollateral}
            collaterals={collaterals}
          />
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
            setAmount(parseFloat(value));
          }}
          clearInputField={clearInputField}
          setClearInputField={setClearInputField}
          maxValue={parsedAssetBalance}
          assetPrice={Number(assetPrice) || 0}
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
            collateral={`${formatNumber(parsedAccountCollateral)} ${symbol}`}
            projectedCollateral={`${formatNumber(
              parsedAccountCollateral + (amount || 0)
            )} ${symbol}`}
            collateralValue={`$${formatNumber(parsedAccountCollateralValue)} `}
            projectedCollateralValue={`$${formatNumber(
              parsedAccountCollateralValue + (amount * Number(assetPrice) || 0)
            )} `}
            healthFactor={`${formatNumber(parsedHealthFactor)}`}
            projectedHealthFactor={projectedHealthFactor || parsedHealthFactor}
          />
        </div>
      </div>
    </>
  );
};
