import React, { Dispatch, SetStateAction, useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { DepositTabInfo } from "../TabInfo";
import { SelectMenu } from "../SelectMenu";
import { IToken } from "@/utils/types";
import { useToast, useTransaction } from "@/hooks";
import { ethers } from "ethers";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { displayProjectedHealthFactor } from "@/utils/helpers";

export interface WithdrawTabProps {
  asset: IToken;
  selectedCollateral: IToken;
  collaterals: IToken[];
  isLoading: Record<string, boolean>;
  accountCollateralAmount: bigint | undefined;
  totalCollateralValue: number;
  healthFactor: bigint | undefined;
  totalBorrowed: number;
  tokenValue: number | undefined;
  assetPrice: number;
  tokenCollateralValue: bigint | undefined;
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  fetchAllowance: () => void;
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
  refreshModal,
  openSupplyModal,
}: WithdrawTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const { addToast } = useToast();
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const { accountCollateralLoading, allowanceLoading, tokenBalanceLoading } =
    isLoading;
  const { withdrawCollateral } = useTransaction(tokenAddress);

  const parsedAccountCollateralAmount = parseBigNumberToFloat(
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
    (totalCollateralValue - valueOfNewCollateral) / valueOfAssetsBorrowed;

  const handleWithdrawCollateral = async () => {
    try {
      if (!inputAmount || inputAmount > parsedAccountCollateralAmount) {
        return alert("Enter valid amount");
      } else if (projectedHealthFactor < 1.05) {
        return alert("Low health factor. Reduce the withdrawal amount");
      }

      setTxLoading(true);
      const parsedAmount = ethers.parseUnits(inputAmount.toString(), decimals);

      withdrawCollateral(parsedAmount)
        .then(async (res) => {
          if (res) {
            const result = await res.wait();
            if (result.status === 1) {
              const txMessage = `You've successfully withdrawn ${formatNumber(
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
      <div data-testid="withdraw-tab-content" className="mt-4 lg:mt-6">
        <div className="text-xs md:text-sm lg:text-xl font-bold flex justify-between items-center">
          <div>Withdraw your Collateral</div>
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
            Enter amount to Withdraw
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
          <div className="text-warning text-2xs lg:text-xs mt-2 lg:mt-3">
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
          className="mt-3 md:mt-4 lg:mt-6 h-7"
          size="large"
          isLoading={txLoading || allowanceLoading}
          disabled={
            accountCollateralLoading ||
            selectedCollateral.symbol === asset.symbol
          }
        >
          Withdraw {symbol}
        </Button>
        <div data-testid="modal-info" className="mt-3 md:mt-4 lg:mt-6">
          <DepositTabInfo
            isLoading={accountCollateralLoading || tokenBalanceLoading}
            symbol={symbol}
            collateralAmount={`${formatNumber(parsedAccountCollateralAmount)} ${symbol}`}
            projectedCollateralAmount={`${formatNumber(
              parsedAccountCollateralAmount - (inputAmount || 0)
            )} ${symbol}`}
            totalCollateralValue={`$${formatNumber(totalCollateralValue)} `}
            projectedTotalCollateralValue={`$${formatNumber(
              totalCollateralValue -
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
