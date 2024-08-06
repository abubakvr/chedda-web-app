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
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 xl:px-8 h-11 xl:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-[10px] lg:text-xs xl:text-sm uppercase">
          Collateral Info
        </div>
      </div>
      <div className="p-4 md:p-6 xl:p-8 md:pt-4 xl:pt-4">
        <div className="w-full flex h-auto items-center md:h-52 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]">
          <div className="w-2/5 h-fit flex items-center justify-center">
            <div
              className="rounded-full w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-[#ffffff20] flex self-center"
              data-testid="loading-chart"
            ></div>
          </div>
          <div className="w-3/5">
            <div className="mt-4 flex space-x-4 font-bold text-lg ">
              <div
                className="w-16 h-4 md:w-20 md::h-6 rounded bg-[#ffffff20]"
                data-testid="loading-asset-1"
              ></div>
              <div
                className="w-16 h-4 md:w-20 md::h-6 rounded bg-[#ffffff20]"
                data-testid="loading-asset-2"
              ></div>
              <div
                className="w-16 h-4 md:w-20 md::h-6 rounded bg-[#ffffff20]"
                data-testid="loading-asset-4"
              ></div>
            </div>
            <div className="mt-6 md:mt-8 text-xs font-[400]">
              <div
                className="w-36 h-4 md:w-56 md:h-5 rounded bg-[#ffffff20]"
                data-testid="loading-liquidation-threshold"
              ></div>
              <div
                className="w-36 h-4 md:w-56 md:h-5 rounded bg-[#ffffff20] mt-2"
                data-testid="loading-liquidation-penalty"
              ></div>
              <div
                className="w-36 h-4 md:w-56 md:h-5 rounded bg-[#ffffff20] mt-5 md:mt-7"
                data-testid="loading-my-collateral"
              ></div>
              <div
                className="w-20 h-4 rounded bg-[#ffffff20] my-2"
                data-testid="loading-my-collateral-value"
              ></div>
            </div>
          </div>
        </div>
        <div className="hidden md:grid w-full h-10 rounded mt-4 bg-[#ffffff05] px-8 grid-cols-4 text-white items-center">
          {collateralHeaderItems.map((item, index) => {
            return (
              <div
                key={index}
                className="text-[#ffffff60] text-xs font-semibold"
                data-testid={`header-item-${index}`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="hidden md:flex flex-col px-8 mt-4">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-4 text-white text-sm font-bold justify-end mt-4"
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center"
                  data-testid={`loading-asset-${rowIndex + 1}`}
                ></div>
                <div
                  className="w-16 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-asset-amount-${rowIndex + 1}`}
                ></div>
              </div>
              <div className="flex flex-col space-y-1">
                <div
                  className="w-20 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-deposited-${rowIndex + 1}`}
                ></div>
                <div
                  className="w-16 h-4 rounded bg-[#ffffff20]"
                  data-testid={`loading-deposited-value-${rowIndex + 1}`}
                ></div>
              </div>
              <div className="flex flex-col space-y-1">
                <div
                  className="w-20 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-my-deposits-${rowIndex + 1}`}
                ></div>
                <div
                  className="w-16 h-4 rounded bg-[#ffffff20]"
                  data-testid={`loading-my-deposits-value-${rowIndex + 1}`}
                ></div>
              </div>
              <div className="flex items-center">
                <div
                  className="w-20 h-5 rounded bg-[#ffffff20]"
                  data-testid={`loading-collateral-factor-${rowIndex + 1}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile view */}
        <div className="md:hidden mt-4 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div
              className="justify-between text-white text-sm mt-3 p-4 border-b border-[#ffffff19]"
              key={rowIndex}
              data-testid={`collateral-item-${rowIndex}`}
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="rounded-full w-8 h-8 xl:w-10 xl:h-10 bg-[#ffffff20] flex self-center"
                  data-testid={`loading-asset-${rowIndex + 1}`}
                ></div>
                <div className="flex relative">
                  <div className="font-bold text-xs xl:text-sm">
                    <div
                      className="w-12 h-4 rounded bg-[#ffffff20]"
                      data-testid={`loading-asset-amount-${rowIndex + 1}`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="text-[10px] text-[#FFFFFF70]">Deposited</div>
                <div className="flex flex-col items-end text-[10px]">
                  <div
                    className="w-16 h-4 rounded bg-[#ffffff20]"
                    data-testid={`loading-asset-amount-${rowIndex + 1}`}
                  ></div>
                  <div
                    className="w-10 h-4 mt-1 rounded bg-[#ffffff20]"
                    data-testid={`loading-asset-amount-${rowIndex + 1}`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-[10px] text-[#FFFFFF70]">My Deposits</div>
                <div className="flex flex-col items-end text-[10px]">
                  <div
                    className="w-16 h-4 rounded bg-[#ffffff20]"
                    data-testid={`loading-asset-amount-${rowIndex + 1}`}
                  ></div>
                  <div
                    className="w-10 h-4 mt-1 rounded bg-[#ffffff20]"
                    data-testid={`loading-asset-amount-${rowIndex + 1}`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-[10px] text-[#FFFFFF70]">
                  Collateral Factor
                </div>
                <div className="pl-1 text-[10px]">
                  <div
                    className="w-16 h-4 rounded bg-[#ffffff20]"
                    data-testid={`loading-asset-amount-${rowIndex + 1}`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
