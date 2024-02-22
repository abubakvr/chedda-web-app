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

export interface BorrowTabProps {
  asset: IToken;
  isLoading: Record<string, boolean>;
  accountCollateralAmount: BigNumber | undefined;
  totalCollateralValue: string;
  healthFactor: BigNumber | undefined;
  tokenValue: string | undefined;
  availableLiquidity: BigNumber | undefined;
  totalBorrowed: string;
  assetPrice: number;
  tokenCollateralValue: BigNumber | undefined;
  fetchAllowance: (showLoading?: boolean) => void;
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
  const { address: tokenAddress, decimals, symbol } = asset;
  const { accountCollateralLoading, healthFactorLoading } = isLoading;
  const { borrowAsset } = useTransaction(tokenAddress);

  const parsedTotalAccountCollateralValue = parseFloat(totalCollateralValue);

  const parsedAvailableLiquidity = parseFloat(
    parseBigNumberToFloat(availableLiquidity, decimals)
  );

  const valueOfAssetsBorrowed = parseFloat(totalBorrowed) * assetPrice;

  const valueOfNewCollateral = inputAmount * Number(tokenValue);

  const parsedHealthFactor = parseFloat(parseBigNumberToFloat(healthFactor));

  const maxInputValue = (parsedTotalAccountCollateralValue * 0.95) / assetPrice;

  const projectedHealthFactor =
    parsedTotalAccountCollateralValue /
    (valueOfAssetsBorrowed + valueOfNewCollateral);

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
      borrowAsset(parsedAmount)
        .then(async (res) => {
          if (res) {
            const result = await res.wait();
            if (result.status === 1) {
              const txMessage = `You've successfully borrowed ${formatNumber(
                inputAmount
              )} ${symbol}`;
              setTxDetails({
                copyText: null,
                txMessage,
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
                copyText: null,
                txMessage,
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
          Borrow {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-6 pb-0">
          <BorrowTabInfo
            isLoading={accountCollateralLoading || healthFactorLoading}
            totalBorrowed={`${formatNumber(parseFloat(totalBorrowed))} ${symbol}`}
            projectedTotalBorrowed={`${formatNumber(
              parseFloat(totalBorrowed) + (inputAmount || 0)
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
              parsedAvailableLiquidity - (inputAmount || 0)
            )} ${symbol}`}
          />
        </div>
      </div>
    </>
  );
};
