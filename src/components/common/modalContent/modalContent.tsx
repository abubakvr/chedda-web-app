import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { formatLargeNumber } from "@/utils/formatters";
import { IToken } from "@/utils/types";
import { Button } from "../buttons/Button";
import { AmountField } from "../input/AmountField";

interface BottomArrayItem {
  title: string;
  value: string | number;
}

interface DepositSectionProps {
  title: string;
  maxAmount: string;
  asset: IToken;
  allowance: string | number;
  bottomArrayData: BottomArrayItem[];
  buttonAction: (amount: number, useAsCollateral: boolean) => void;
  isTransactionLoading: boolean;
  clearInputField: boolean;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
}

export const SupplyModalContent: FC<DepositSectionProps> = ({
  title,
  maxAmount,
  asset,
  bottomArrayData,
  allowance,
  buttonAction,
  isTransactionLoading,
  clearInputField,
  setClearInputField,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [useAsCollateral, setUseAsCollateral] = useState(false);
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUseAsCollateral(e.target.checked);
  };

  const buttonTitle =
    parseFloat(allowance.toString()) < amount ? "Approve" : "Supply";

  return (
    <div className="mt-6">
      <div className="text-xl font-bold">{title} your assets</div>
      <div className="flex justify-between mt-6 items-center text-xs">
        <div className="text-[#DEDEDE]">Enter amount to {title}</div>
        <div className="font-bold">
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
      />
      {title === "Deposit" && (
        <div className="flex justify-between items-center mt-6 font-bold text-lg">
          <div>Use as collateral</div>
          <label className="switch">
            <input
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
        onClick={() => buttonAction(amount, useAsCollateral)}
        className="mt-6 h-7"
        size="large"
        isLoading={isTransactionLoading}
      >
        {title === "Deposit" ? buttonTitle : title} {asset.symbol}
      </Button>
      <div className="mt-6 pb-0">
        {bottomArrayData?.map((item, index) => (
          <div key={index} className="flex justify-between text-sm pb-5">
            <div className="opacity-50 font-semibold">{item.title}</div>
            <div className="font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
