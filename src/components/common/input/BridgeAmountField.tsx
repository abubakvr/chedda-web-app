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
import { IBridgeChain, IConfigToken } from "@/utils/types";

interface InputWithMaxButtonProps {
  onChange: (value: string) => void;
  maxValue: string;
  clearInputField: boolean;
  assetPrice: number;
  selectedToken: IConfigToken | undefined;
  selectedChain: IBridgeChain;
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
    <div className="w-full rounded-lg border-[1.5px] border-[#8080CC] mt-3 flex">
      <div className="w-max flex  font-bold items-center uppercase border-r-[1.5px] border-[#8080CC] py-2 px-4 space-x-2">
        {selectedChain && selectedToken && (
          <>
            <div className="w-max flex relative">
              <Image
                src={selectedToken.logo}
                alt="icon image"
                className="w-8 h-8"
              />
              <Image
                src={selectedChain?.logo}
                alt="icon image"
                className="absolute w-4 bottom-0 -right-0.5"
              />
            </div>
            <p className="font-bold text-lg">{selectedToken?.symbol}</p>
          </>
        )}
      </div>
      <div className="w-full flex py-2 px-4 justify-between">
        <div className="relative w-full pr-2">
          <input
            type="text"
            className="text-white text-2xl 
            bg-transparent focus:outline-none font-bold w-full"
            value={inputValue}
            onInput={handleInput}
            onChange={handleInputChange}
            placeholder="0.00"
            data-testid="amount-input"
          />
          <div
            className="text-sm text-[#ffffff50] mt-1"
            data-testid="value-box"
          >
            {calculatedValue || "$0.00"}
          </div>
        </div>
        <div className="w-fit">
          <button
            className={`px-5 py-4 h-full rounded bg-[#201D47] hover:bg-[#261da2] relative self-end ${
              maxActive && "bg-[#261da2]"
            }`}
            onClick={onMaxButtonClick}
            data-testid="max-button"
          >
            MAX
          </button>
        </div>
      </div>
    </div>
  );
};
