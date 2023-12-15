import React from "react";

interface SummaryCardProps {
  index: number;
  title: string;
  value?: string | number;
  isLoading: boolean;
}

export const SummaryCard = ({
  index,
  title,
  value,
  isLoading,
}: SummaryCardProps) => {
  return (
    <div
      data-testid="summary-card"
      className="w-full summary-card rounded-lg text-white p-4 sm:p-6 xl:p-8 flex flex-col justify-center"
    >
      <div className="flex flex-col gap-y-1">
        <div
          data-testid="summary-title"
          className="text-white opacity-50 font-open-sans text-xs font-semibold leading-6 tracking-wide"
        >
          {title}
        </div>
        {!isLoading && value && (
          <div
            data-testid="summary-value"
            className={`${
              index >= 4 && "card-gradient-text font-bold"
            } text-white font-open-sans text-2xl font-bold leading-7 tracking-wide`}
          >
            {value}
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
