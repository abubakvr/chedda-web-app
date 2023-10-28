import React from "react";

interface MarketInfoCardProps {
  title: string;
  value: string;
}

export const MarketInfoCard = ({ title, value }: MarketInfoCardProps) => {
  return (
    <div className="w-full market-info-card rounded-lg text-white p-4 sm:p-6 xl:p-9 flex flex-col items-center justify-center">
      <div>
        <div className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide ">
          {title}
        </div>
        <div className="text-white font-open-sans text-2xl font-bold leading-7 tracking-wide">
          {value}
        </div>
      </div>
    </div>
  );
};
