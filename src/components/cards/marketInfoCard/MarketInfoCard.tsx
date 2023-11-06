import React from "react";
import { formatCurrency } from "@/utils/formatters";

interface MarketInfoCardProps {
  index: number;
  title: string;
  value: string | number;
}

export const MarketInfoCard = ({
  index,
  title,
  value,
}: MarketInfoCardProps) => {
  return (
    <div className="w-full market-info-card rounded-lg text-white p-4 sm:p-6 xl:px-8 xl:py-7 flex flex-col justify-center">
      <div>
        <div className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide ">
          {title}
        </div>
        <div
          className={`${
            index >= 4 && "market-gradient-text"
          } text-white font-open-sans text-2xl font-bold leading-7 tracking-wide`}
        >
          {title === "No. Of Vaults" ? value : formatCurrency(value)}
        </div>
      </div>
    </div>
  );
};
