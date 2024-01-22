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
  allowance: string | number;
  modalInfo: ReactElement<any, any>;
  buttonAction: (useAsCollateral: boolean) => void;
  isTransactionLoading: boolean;
  clearInputField: boolean;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
}

export const SupplyModalContent: FC<DepositSectionProps> = ({
  title,
  maxAmount,
  asset,
  assetPrice,
  modalInfo,
  allowance,
  buttonAction,
  isTransactionLoading,
  clearInputField,
  setClearInputField,
  setAmount,
  amount,
}) => {
  const [useAsCollateral, setUseAsCollateral] = useState(true);
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
        assetPrice={assetPrice}
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
        onClick={() => buttonAction(useAsCollateral)}
        className="mt-6 h-7"
        size="large"
        isLoading={isTransactionLoading}
      >
        {title === "Deposit" ? buttonTitle : title} {asset.symbol}
      </Button>
      <div className="mt-6 pb-0">{modalInfo}</div>
    </div>
  );
};
