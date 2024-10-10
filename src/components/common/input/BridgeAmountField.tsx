"use client";

import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";
import React, {
  useState,
  ChangeEvent,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ISourceChain, IToken } from "@/utils/types";

interface InputWithMaxButtonProps {
  onChange: (value: string) => void;
  maxValue: string;
  clearInputField: boolean;
  assetPrice: number;
  selectedToken: IToken | undefined;
  selectedChain: ISourceChain;
  setClearInputField: Dispatch<SetStateAction<boolean>>;
}

export const BridgeAmountField: FC<InputWithMaxButtonProps> = ({
  onChange,
  maxValue,
  clearInputField,
  assetPrice,
  selectedToken,
  selectedChain,
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
    <div className="w-full rounded-lg border-[1.5px] border-[#8080CC] mt-2 lg:mt-3 flex">
      <div className="w-max flex font-bold items-center uppercase border-r-[1.5px] border-[#8080CC] px-2 md:px-4 space-x-2">
        {selectedChain && selectedToken && (
          <>
            <div className="w-max flex relative">
              <Image
                style={{ color: "" }}
                src={selectedToken.logo}
                alt="icon image"
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
              <Image
                style={{ color: "" }}
                src={selectedChain?.logo}
                alt="icon image"
                className="absolute w-[10px] h-[10px] md:w-[14px] md:h-[14px] lg:w-[18px] lg:h-[18px] top-0 left-0"
              />
            </div>
            <p className="font-bold text-sm md:text-lg lg:text-xl">
              {selectedToken?.symbol}
            </p>
          </>
        )}
      </div>
      <div className="w-full flex py-1.5 md:py-2 px-3 lg:px-4 justify-between items-center">
        <div className="relative w-full pr-2">
          <input
            type="text"
            className="text-white text-sm md:text-lg lg:text-2xl bg-transparent focus:outline-none font-bold w-full"
            value={inputValue}
            onInput={handleInput}
            onChange={handleInputChange}
            placeholder="0.00"
            data-testid="amount-input"
          />
          <div
            className="text-3xs md:text-2xs lg:text-sm text-mist mt-1"
            data-testid="value-box"
          >
            {calculatedValue || "$0.00"}
          </div>
        </div>
        <button
          className={`px-4 py-3 lg:px-5 lg:py-4 text-xs lg:text-lg h-full rounded bg-[#201D47] hover:bg-[#261da2] relative ${
            maxActive && "bg-[#261da2]"
          }`}
          onClick={onMaxButtonClick}
          data-testid="max-button"
        >
          MAX
        </button>
      </div>
    </div>
  );
};
