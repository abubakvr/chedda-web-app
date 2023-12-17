import React from "react";

export const CollateralInfoSkeleton = () => {
  const collateralHeaderItems = [
    "Collateral",
    "Deposited",
    "My Deposits",
    "Collateral Factor",
  ];

  return (
    <div
      className="flex flex-col justify-between animate-pulse"
      data-testid="collateral-info-skeleton"
    >
      <div className="border-b border-[#ffffff19] flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center uppercase font-bold">
        <div className="text-white text-opacity-50 text-lg">
          Collateral Information
        </div>
      </div>
      <div className="p-8 pt-4">
        <div className="w-full flex h-52 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]">
          <div className="w-2/5 h-full flex items-center justify-center">
            <div
              className="rounded-full w-36 h-36 bg-[#ffffff20] flex self-center col-span-1"
              data-testid="loading-chart"
            ></div>
          </div>
          <div className="w-3/5">
            <div className="mt-4 flex space-x-4 font-bold text-lg ">
              <div
                className="w-20 h-6 rounded bg-[#ffffff20]"
                data-testid="loading-asset-1"
              ></div>
              <div
                className="w-20 h-6 rounded bg-[#ffffff20]"
                data-testid="loading-asset-2"
              ></div>
              <div
                className="w-20 h-6 rounded bg-[#ffffff20]"
                data-testid="loading-asset-4"
              ></div>
            </div>
            <div className="mt-8 text-xs font-[400]">
              <div
                className="w-56 h-5 rounded bg-[#ffffff20]"
                data-testid="loading-liquidation-threshold"
              ></div>
              <div
                className="w-32 h-4 rounded bg-[#ffffff20] mt-2"
                data-testid="loading-liquidation-penalty"
              ></div>
              <div
                className="w-56 h-5 rounded bg-[#ffffff20] mt-7"
                data-testid="loading-my-collateral"
              ></div>
              <div
                className="w-32 h-4 rounded bg-[#ffffff20] my-2"
                data-testid="loading-my-collateral-value"
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full h-10 rounded mt-4 bg-[#ffffff05] px-8 grid grid-cols-4 text-white items-center">
          {collateralHeaderItems.map((item, index) => {
            return (
              <div
                key={index}
                className="text-[#ffffff60] text-xs font-semibold col-span-1"
                data-testid={`header-item-${index}`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="px-8 mt-4">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-4 text-white text-sm font-bold justify-end mt-4"
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center col-span-1"
                  data-testid={`loading-asset-${rowIndex + 1}`}
                ></div>
                <div
                  className="w-16 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-asset-amount-${rowIndex + 1}`}
                ></div>
              </div>
              <div className="flex flex-col col-span-1 space-y-1">
                <div
                  className="w-20 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-deposited-${rowIndex + 1}`}
                ></div>
                <div
                  className="w-16 h-4 rounded bg-[#ffffff20]"
                  data-testid={`loading-deposited-value-${rowIndex + 1}`}
                ></div>
              </div>
              <div className="flex flex-col col-span-1 space-y-1">
                <div
                  className="w-20 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-my-deposits-${rowIndex + 1}`}
                ></div>
                <div
                  className="w-16 h-4 rounded bg-[#ffffff20]"
                  data-testid={`loading-my-deposits-value-${rowIndex + 1}`}
                ></div>
              </div>
              <div className="flex items-center col-span-1">
                <div
                  className="w-20 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-collateral-factor-${rowIndex + 1}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
