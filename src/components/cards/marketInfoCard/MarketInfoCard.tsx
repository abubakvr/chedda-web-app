import React from "react";
import { formatCurrency } from "@/utils/formatters";

interface MarketInfoCardProps {
  index: number;
  title: string;
  value?: string;
  isLoading: boolean;
}

export const MarketInfoCard = ({
  index,
  title,
  value,
  isLoading,
}: MarketInfoCardProps) => {
  return (
    <div
      data-testid="market-info-card"
      className="w-full market-info-card rounded-lg text-white p-4 sm:p-6 xl:px-8 xl:py-7 flex flex-col justify-center"
    >
      <div>
        <div
          data-testid="title"
          className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide "
        >
          {title}
        </div>
        {!isLoading && value && (
          <div
            data-testid="value"
            className={`${
              index >= 4 && "market-gradient-text"
            } text-white font-open-sans text-2xl font-bold leading-7 tracking-wide`}
          >
            {title === "No. Of Vaults" ? value : formatCurrency(value)}
          </div>
        )}
        {isLoading && (
          <div
            data-testid="loading-element"
            className="h-auto w-full hidden md:grid grid-cols-1 grid-row-bg mt-1 justify-between text-white hover:opacity-80 cursor-pointer"
          >
            <div className="flex flex-col justify-center text-sm md:col-span-1 animate-pulse">
              <div className="flex flex-col">
                <div className="h-6 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-24"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
