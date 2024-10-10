"use client";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import { AmountField, Button } from "@/components/common";
import { formatLargeNumber } from "@/utils/formatters";
import { IToken } from "@/utils/types";

interface DepositSectionProps {
  title: string;
  maxAmount: string;
  asset: IToken;
  assetPrice: number;
  allowance: number;
  amount: number;
  modalInfo: ReactElement<any, any>;
  isTransactionLoading: boolean;
  clearInputField: boolean;
  buttonAction: (useAsCollateral: boolean) => void;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
}

export const SupplyModalContent: FC<DepositSectionProps> = ({
  title,
  maxAmount,
  asset,
  assetPrice,
  modalInfo,
  allowance,
  amount,
  isTransactionLoading,
  clearInputField,
  buttonAction,
  setClearInputField,
  setAmount,
}) => {
  const [useAsCollateral, setUseAsCollateral] = useState(true);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUseAsCollateral(e.target.checked);
  };
  const buttonTitle = allowance < amount ? "Approve" : "Supply";

  return (
    <div data-testid="supply-modal-content" className="mt-4 lg:mt-6">
      <div className="text-xs md:text-sm lg:text-xl font-bold">
        {title} your assets
      </div>
      <div className="flex justify-between mt-3 lg:mt-4 md:mt-6 items-center text-2xs md:text-xs">
        <div data-testid="amount-label" className="text-mist">
          Enter amount to {title}
        </div>
        <div data-testid="max-amount" className="font-bold">
          Max: {`${formatLargeNumber(maxAmount)} ${asset.symbol}`}
        </div>
      </div>
      <AmountField
        onChange={(value) => {
          setAmount(parseFloat(value));
        }}
        clearInputField={clearInputField}
        setClearInputField={setClearInputField}
        maxValue={maxAmount}
        assetPrice={assetPrice}
      />
      {title === "Deposit" && (
        <div className="flex justify-between items-center mt-3 md:mt-4 lg:mt-6 font-bold text-xs md:text-sm lg:text-lg">
          <div>Use as collateral</div>
          <label className="switch">
            <input
              data-testid="use-as-collateral-checkbox"
              type="checkbox"
              checked={useAsCollateral}
              onChange={handleCheckboxChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}
      <Button
        type="primary"
        onClick={() => buttonAction(useAsCollateral)}
        className="mt-3 md:mt-4 lg:mt-6 h-7"
        size="large"
        isLoading={isTransactionLoading}
      >
        {title === "Deposit" ? buttonTitle : title} {asset.symbol}
      </Button>
      <div data-testid="modal-info" className="mt-4 lg:mt-6">
        {modalInfo}
      </div>
    </div>
  );
};
