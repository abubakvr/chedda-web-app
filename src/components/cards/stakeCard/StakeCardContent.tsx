import React, { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { AmountField, Button } from "@/components/common";
import { formatLargeNumber } from "@/utils/formatters";

interface StakeCardContentProps {
  title: string;
  maxAmount: string;
  lpSymbol: string | undefined;
  subTitle: string;
  assetValue: number;
  allowance: string | number;
  modalInfo: ReactElement<any, any>;
  amount: number;
  isTransactionLoading: boolean;
  clearInputField: boolean;
  isLoading: boolean;
  buttonAction: () => void;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
}

export const StakeCardContent: FC<StakeCardContentProps> = ({
  title,
  maxAmount,
  lpSymbol,
  assetValue,
  modalInfo,
  allowance,
  buttonAction,
  isTransactionLoading,
  clearInputField,
  subTitle,
  setClearInputField,
  setAmount,
  amount,
  isLoading,
}) => {
  const buttonTitle =
    parseFloat(allowance.toString()) < amount ? "Approve" : "Stake";

  return (
    <div data-testid="stake-card-content" className="mt-6">
      <div className="text-xl font-bold">{title} your LP Tokens</div>
      <div className="text-[#FFFFFF50] text-sm mt-2">{subTitle}</div>
      <div className="flex justify-between mt-6 items-center text-xs">
        <div data-testid="amount-label" className="text-[#DEDEDE]">
          Enter amount to {title}
        </div>
        <div data-testid="max-amount" className="font-bold">
          Max: {`${formatLargeNumber(maxAmount)} ${lpSymbol}`}
        </div>
      </div>
      <AmountField
        onChange={(value) => {
          setAmount(parseFloat(value));
        }}
        clearInputField={clearInputField}
        setClearInputField={setClearInputField}
        maxValue={maxAmount}
        assetPrice={assetValue}
      />
      <Button
        type="primary"
        onClick={() => buttonAction()}
        className="mt-6 h-7"
        size="large"
        isLoading={isTransactionLoading}
      >
        {title === "Stake" ? buttonTitle : title}
      </Button>
      <div data-testid="modal-info" className="mt-6 pb-0">
        {modalInfo}
      </div>
    </div>
  );
};
