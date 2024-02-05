import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { DepositTabInfo } from "../TabInfo";
import { IToken } from "@/utils/types";
import { useTransaction } from "@/hooks";
import { BigNumber, ethers } from "ethers";
import { Toast } from "@/components/ui";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";

interface BorrowTabProps {
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  fetchAllowance: (showLoading?: boolean) => void;
  refreshModal: () => void;
  selectedCollateral: IToken;
  collaterals: IToken[];
  isLoading: Record<string, boolean>;
  accountCollateral: Record<string, BigNumber> | undefined;
  healthFactor: BigNumber | undefined;
  assetPrice: string | undefined;
}

export const BorrowTab = ({
  selectedCollateral,
  isLoading,
  accountCollateral,
  healthFactor,
  assetPrice,
  fetchAllowance,
  refreshModal,
}: BorrowTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [amount, setAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
  const { borrowTxStatus, borrowAsset } = useTransaction(tokenAddress);

  const parsedAccountCollateralAmount = parseFloat(
    parseBigNumberToFloat(accountCollateral?.accountCollateralAmount, decimals)
  );
  const parsedAccountCollateralValue = parseFloat(
    parseBigNumberToFloat(accountCollateral?.totalAccountCollateralValue)
  );
  const parsedHealthFactor = parseFloat(parseBigNumberToFloat(healthFactor));
  const projectedHealthFactor =
    parsedAccountCollateralValue / (amount * Number(assetPrice || 0));

  const handleWithdrawCollateral = async () => {
    try {
      if (!amount || amount > parsedAccountCollateralValue) {
        return alert("Enter valid amount");
      } else if (projectedHealthFactor < 1.05) {
        return alert("Low health factor. Reduce the withdrawal amount");
      }

      const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
      await borrowAsset(parsedAmount);
      const txMessage = `You've successfully Borrowed ${formatNumber(
        amount
      )} ${symbol}`;
      setToastMessage(txMessage);
    } catch (error: any) {
      throw Error("Error in borrowing asset:" + error.message);
    }
  };

  useEffect(() => {
    if (borrowTxStatus.isAssetBorrowed) {
      setAmount(0);
      setClearInputField(true);
      setShowToast(true);
      refreshModal();
    }
  }, [borrowTxStatus.isAssetBorrowed, fetchAllowance, refreshModal]);

  return (
    <>
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        toastMessage={toastMessage}
        duration={10000}
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
                : `${formatLargeNumber(parsedAccountCollateralValue)} ${symbol}`}
            </div>
          </div>
        </div>
        <AmountField
          onChange={(value) => {
            setAmount(parseFloat(value));
          }}
          clearInputField={clearInputField}
          setClearInputField={setClearInputField}
          maxValue={parsedAccountCollateralValue.toString()}
          assetPrice={Number(assetPrice) || 0}
        />
        <Button
          type="primary"
          onClick={handleWithdrawCollateral}
          className="mt-6 h-7"
          size="large"
          isLoading={borrowTxStatus.isLoading}
          disabled={accountCollateralLoading}
        >
          Borrow {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
          <DepositTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            symbol={symbol}
            collateral={`${formatNumber(parsedAccountCollateralAmount)} ${symbol}`}
            projectedCollateral={`${formatNumber(
              parsedAccountCollateralAmount - (amount || 0)
            )} ${symbol}`}
            collateralValue={`$${formatNumber(parsedAccountCollateralValue)} `}
            projectedCollateralValue={`$${formatNumber(
              parsedAccountCollateralValue - (amount * Number(assetPrice) || 0)
            )} `}
            healthFactor={`${formatNumber(parsedHealthFactor)}`}
            projectedHealthFactor={projectedHealthFactor || parsedHealthFactor}
          />
        </div>
      </div>
    </>
  );
};
