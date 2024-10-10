import React, { Dispatch, SetStateAction, useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { ethers } from "ethers";
import { DepositTabInfo } from "../TabInfo";
import { SelectMenu } from "../SelectMenu";
import { IToken } from "@/utils/types";
import { useToast, useTransaction } from "@/hooks";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { displayProjectedHealthFactor } from "@/utils/helpers";

export interface DepositTabProps {
  asset: IToken;
  selectedCollateral: IToken;
  collaterals: IToken[];
  isLoading: Record<string, boolean>;
  totalBorrowed: number;
  assetPrice: number;
  tokenValue: number | undefined;
  allowance: bigint | undefined;
  accountCollateralAmount: bigint | undefined;
  totalCollateralValue: number;
  tokenBalance: bigint | undefined;
  healthFactor: bigint | undefined;
  tokenCollateralValue: bigint | undefined;
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  fetchAllowance: (showLoading: boolean) => void;
  refreshModal: () => void;
  openSupplyModal: (activeTab: "Deposit" | "Withdraw") => void;
}

export const DepositTab = ({
  asset,
  selectedCollateral,
  collaterals,
  isLoading,
  allowance,
  accountCollateralAmount,
  totalCollateralValue,
  tokenBalance,
  healthFactor,
  assetPrice,
  tokenValue,
  totalBorrowed,
  tokenCollateralValue,
  setSelectedCollateral,
  fetchAllowance,
  refreshModal,
  openSupplyModal,
}: DepositTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [txLoading, setTxLoading] = useState(false);

  const { addToast } = useToast();
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const { allowanceLoading, accountCollateralLoading, tokenBalanceLoading } =
    isLoading;
  const { depositCollateral, approveAsset } = useTransaction(tokenAddress);

  const parsedAllowance = parseBigNumberToFloat(allowance, decimals);
  const parsedAssetBalance = parseBigNumberToFloat(tokenBalance, decimals);
  const parsedAccountCollateral = parseBigNumberToFloat(
    accountCollateralAmount,
    decimals
  );
  const parsedHealthFactor = parseBigNumberToFloat(healthFactor, 18, 10);
  const parsedTokenCollateralValue = parseBigNumberToFloat(
    tokenCollateralValue,
    18,
    10
  );
  const valueOfAssetsBorrowed = totalBorrowed * assetPrice;

  const valueOfNewCollateral = inputAmount * parsedTokenCollateralValue;

  const projectedHealthFactor =
    (Number(totalCollateralValue) + valueOfNewCollateral) /
    valueOfAssetsBorrowed;

  const buttonTitle = parsedAllowance < inputAmount ? "Approve" : "Deposit";

  const handleDepositCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > parsedAssetBalance) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.parseUnits(inputAmount.toString(), decimals);
      setTxLoading(true);
      if (inputAmount <= parsedAllowance) {
        depositCollateral(parsedAmount)
          .then(async (res) => {
            if (res) {
              const result = await res.wait();
              if (result.status === 1) {
                const txMessage = `You've successfully deposited ${formatNumber(
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
                setTxLoading(false);
              } else {
                const txMessage = `An error occurred while proccessing your transaction`;
                addToast({
                  message: txMessage,
                  txHash: res.hash,
                  type: "error",
                });
              }
            }
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
      <div data-testid="deposit-tab-content" className="mt-4 lg:mt-6">
        <div className="text-xs md:text-sm lg:text-xl font-bold flex justify-between items-center">
          <div>Deposit your Collateral</div>
          <div>
            <div className="text-2xs text-mist flex justify-end mb-1 lg:mb-0">
              Select asset
            </div>
            <SelectMenu
              setSelectedCollateral={setSelectedCollateral}
              selectedCollateral={selectedCollateral}
              collaterals={collaterals}
            />
          </div>
        </div>
        <div className="flex justify-between mt-3 lg:mt-4 md:mt-6 items-center text-2xs md:text-xs">
          <div data-testid="amount-label" className="text-mist">
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
          maxValue={parsedAssetBalance.toString()}
          assetPrice={Number(tokenValue) || 0}
        />
        {selectedCollateral.symbol === asset.symbol && (
          <div className="text-warning text-2xs lg:text-xs mt-2 lg:mt-3">
            You can only deposit the pool asset by supplying{" "}
            <button
              className="cursor-pointer relative"
              onClick={() => openSupplyModal("Deposit")}
            >
              <u>here</u>
            </button>
          </div>
        )}
        <Button
          type="primary"
          onClick={handleDepositCollateral}
          className="mt-3 md:mt-4 lg:mt-6 h-7"
          size="large"
          isLoading={txLoading || allowanceLoading}
          disabled={
            accountCollateralLoading ||
            selectedCollateral.symbol === asset.symbol
          }
        >
          {buttonTitle} {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-3 md:mt-4 lg:mt-6">
          <DepositTabInfo
            isLoading={accountCollateralLoading || tokenBalanceLoading}
            symbol={symbol}
            collateralAmount={`${formatNumber(parsedAccountCollateral)} ${symbol}`}
            projectedCollateralAmount={`${formatNumber(
              parsedAccountCollateral + (inputAmount || 0)
            )} ${symbol}`}
            totalCollateralValue={`$${formatNumber(totalCollateralValue)} `}
            projectedTotalCollateralValue={`$${formatNumber(
              Number(totalCollateralValue) +
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
