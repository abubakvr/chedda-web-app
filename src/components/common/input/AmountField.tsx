"use client";
import { formatCurrency } from "@/utils/formatters";
import React, {
  useState,
  ChangeEvent,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface InputWithMaxButtonProps {
  onChange: (value: string) => void;
  maxValue: string;
  clearInputField: boolean;
  assetPrice: number;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
}

export const AmountField: FC<InputWithMaxButtonProps> = ({
  onChange,
  maxValue,
  clearInputField,
  assetPrice,
  setClearInputField,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (clearInputField) {
      setInputValue("");
    }
  }, [clearInputField]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numeric characters and a single decimal point
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    setClearInputField(false);
    // Ensure there's at most one decimal point
    const decimalCount = (e.target.value.match(/\./g) || []).length;
    if (decimalCount > 1) {
      e.target.value = e.target.value.slice(0, -1);
    }

    if (isNaN(Number(e.target.value))) {
      setInputValue("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClearInputField(false);
    if (parseFloat(value) > parseFloat(maxValue)) setInputValue(maxValue);
    setInputValue(value);
    onChange(value);
  };

  const onMaxButtonClick = () => {
    setInputValue(maxValue);
    onChange(maxValue);
  };

  const calculatedValue =
    inputValue && formatCurrency(assetPrice * parseFloat(inputValue));
  const maxActive = inputValue === maxValue;

  return (
    <div className="py-2 px-4 rounded-lg border-[1.5px] border-[#8080CC] mt-3 flex justify-between">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full text-white text-2xl bg-transparent focus:outline-none"
          value={inputValue}
          onInput={handleInput}
          onChange={handleInputChange}
          placeholder="0.00"
          data-testid="amount-input"
        />
        <div className="text-sm text-[#ffffff50] mt-1" data-testid="value-box">
          {calculatedValue || "$0.00"}
        </div>
      </div>
      <button
        className={`px-5 py-4 h-full rounded bg-[#201D47] hover:bg-[#261da2] relative ${
          maxActive && "bg-[#261da2]"
        }`}
        onClick={onMaxButtonClick}
        data-testid="max-button"
      >
        MAX
      </button>
    </div>
  );
};
