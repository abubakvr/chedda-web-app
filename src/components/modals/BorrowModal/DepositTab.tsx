import React, { Dispatch, SetStateAction, useState } from "react";
import { AmountField, Button } from "@/components/common";
import {
  formatLargeNumber,
  formatNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { DepositTabInfo } from "./TabInfo";
import { SelectMenu } from "./SelectMenu";
import { IToken } from "@/utils/types";
import {
  useAllowance,
  useTransaction,
  useTokenValue,
  useAccountCollateral,
  useAccountHealth,
  useTokenBalance,
} from "@/hooks";
import { ethers } from "ethers";

interface DepositTabProps {
  setSelectedCollateral: Dispatch<SetStateAction<IToken>>;
  selectedCollateral: IToken;
  collaterals: IToken[];
}

export const DepositTab = ({
  setSelectedCollateral,
  selectedCollateral,
  collaterals,
}: DepositTabProps) => {
  const [clearInputField, setClearInputField] = useState(false);
  const [amount, setAmount] = useState(0);
  const { address: tokenAddress, decimals, symbol } = selectedCollateral;
  const { data: allowance, fetchData: fetchAllowance } =
    useAllowance(tokenAddress);
  const { data: accountCollateral, fetchData: fetchAccountCollateral } =
    useAccountCollateral(tokenAddress);
  const { data: tokenBalance, fetchData: fetchTokenBalance } =
    useTokenBalance(tokenAddress);
  const { data: healthFactor, fetchData: fetchHealthFactor } =
    useAccountHealth();
  const { isLoading, depositCollateral, approveAsset } =
    useTransaction(tokenAddress);
  const { data: assetPrice } = useTokenValue(tokenAddress);
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
    parsedAccountCollateralValue / (amount * Number(assetPrice));

  const handleDepositCollateral = async () => {
    try {
      if (!amount || amount > parseFloat(parsedAssetBalance)) {
        return alert("Enter valid amount");
      }

      const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
      if (amount <= parsedAllowance) {
        depositCollateral(tokenAddress, parsedAmount).then((res) => {
          if (res) {
            console.log("Deposited");
            fetchAllowance();
            fetchAccountCollateral();
            fetchHealthFactor();
            fetchTokenBalance();
          }
        });
      } else {
        approveAsset(parsedAmount).then((res) => {
          if (res) {
            console.log("Approved");
            fetchAllowance();
          }
        });
      }
    } catch (error: any) {
      throw Error("Error in depositing asset");
    }
  };

  return (
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
        <div data-testid="max-amount" className="font-bold">
          Max: {`${formatLargeNumber(parsedAssetBalance)} ${symbol}`}
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
        isLoading={isLoading}
      >
        {buttonTitle} {symbol}
      </Button>
      <div data-testid="modal-info" className="mt-6 pb-0">
        <DepositTabInfo
          symbol={symbol}
          collateral={`${formatNumber(parsedAccountCollateral)} ${symbol}`}
          projectedCollateral={`${formatNumber(
            parsedAccountCollateral + (amount || 0)
          )} ${symbol}`}
          collateralValue={`$${formatNumber(parsedAccountCollateralValue)} `}
          projectedCollateralValue={`$${formatNumber(
            parsedAccountCollateralValue + (amount || 0)
          )} `}
          healthFactor={`${formatNumber(parsedHealthFactor)}`}
          projectedHealthFactor={projectedHealthFactor || parsedHealthFactor}
        />
      </div>
    </div>
  );
};
