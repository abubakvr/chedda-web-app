import React, { useState } from "react";
import { AmountField, Button } from "@/components/common";
import { formatLargeNumber } from "@/utils/formatters";
import { DepositTabInfo } from "./TabInfo";
import { SelectMenu } from "./SelectMenu";

interface DepositTabProps {
  getAssetBalance: (asset: string) => void;
}

export const DepositTab = ({ getAssetBalance }: DepositTabProps) => {
  const [input, setInput] = useState(false);
  const allowance = "";
  const amount = 100;
  const maxAmount = 100;
  const asset = {
    symbol: "TK",
  };

  const buttonTitle =
    parseFloat(allowance.toString()) < amount ? "Approve" : "Deposit";

  return (
    <div data-testid="deposit-tab-content" className="mt-6">
      <div className="text-xl font-bold flex justify-between">
        <div>Deposit your Collateral</div>
        <SelectMenu getAssetBalance={getAssetBalance} />
      </div>
      <div className="flex justify-between mt-6 items-center text-xs">
        <div data-testid="amount-label" className="text-[#DEDEDE]">
          Enter amount to Deposit
        </div>
        <div data-testid="max-amount" className="font-bold">
          Max: {`${formatLargeNumber(maxAmount)} ${asset.symbol}`}
        </div>
      </div>
      <AmountField
        onChange={(value) => {
          console.log(parseFloat(value));
        }}
        clearInputField={false}
        setClearInputField={setInput}
        maxValue={"100"}
        assetPrice={1000}
      />
      <Button
        type="primary"
        onClick={() => {}}
        className="mt-6 h-7"
        size="large"
        isLoading={false}
      >
        {buttonTitle} {asset.symbol}
      </Button>
      <div data-testid="modal-info" className="mt-6 pb-0">
        <DepositTabInfo
          collateralValue="0.00 USDC"
          projectedCollateralValue="15.20 USDC"
          collateral="$0.00"
          projectedCollateral="$15.00"
          healthFactor="∞"
          projectedHealthFactor="6.9"
        />
      </div>
    </div>
  );
};
