import React from "react";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IMarketInfo } from "chedda-sdk";
import { IToken } from "@/utils/types";
import { InfoCardSkeleton } from "@/components/ui";
import { BigNumber } from "ethers";

interface CollateralInfoCardProps {
  asset: IToken | undefined;
  marketInfo: IMarketInfo | undefined;
  isLoading: boolean;
}

export const CollateralInfoCard: React.FC<CollateralInfoCardProps> = ({
  asset,
  marketInfo,
  isLoading,
}) => {
  if (isLoading || !marketInfo) {
    return <InfoCardSkeleton title="Collateral Information" />;
  }

  const collateralHeaderItems = [
    "Collateral",
    "Deposited",
    "My Deposits",
    "Collateral Factor",
  ];

  return (
    <div className="flex flex-col justify-between">
      <div className="border-b border-[#ffffff19] flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center uppercase font-bold">
        <div className="text-white text-opacity-50 text-lg">
          Collateral Information
        </div>
      </div>
      <div className="p-8 pt-4">
        <div className="w-full flex h-52 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]">
          <div className="w-1/3 h-full flex items-center justify-center">
            <div className="rounded-full w-32 h-32 bg-[#ffffff20] flex self-center col-span-1"></div>
          </div>
          <div className="w-2/3">
            <div className="mt-4 flex space-x-4 font-bold text-lg ">
              <div>USDC</div>
              <div>DAI</div>
              <div>WETH</div>
              <div>FRAX</div>
              <div>WBTC</div>
            </div>
            <div className="mt-8 flex gap-x-16 text-xs font-[400]">
              <div>
                <div>Liquidation threshold</div>
                <div>40%</div>
              </div>
              <div>
                <div>Liquidation Penalty</div>
                <div>5.00%</div>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-white text-sm font-bold">MY COLLATERAL</div>
              <div className="card-gradient-text">$1.24 M</div>
            </div>
          </div>
        </div>
        <div className="w-full h-10 rounded mt-4 bg-[#ffffff05] px-8 grid grid-cols-4 text-white items-center">
          {collateralHeaderItems.map((item, index) => {
            return (
              <div
                key={index}
                className="text-[#ffffff60] text-xs font-semibold col-span-1"
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="px-8 mt-4">
          <div className="grid grid-cols-4 text-white text-sm font-bold justify-end">
            <div className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center col-span-1"></div>
            <div className="flex flex-col col-span-1">
              <span>201K USDC</span>
              <span className="text-[#ffffff50] mt-1">$201K</span>
            </div>
            <div className="flex flex-col col-span-1">
              <span>126.35 USDC</span>
              <span className="text-[#ffffff50] mt-1">$126.26</span>
            </div>
            <div className="flex items-center col-span-1">
              <span>75.00%</span>
            </div>
          </div>
          <div className="grid grid-cols-4 text-white text-sm font-bold justify-end mt-3">
            <div className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center col-span-1"></div>
            <div className="flex flex-col col-span-1">
              <span>201K USDC</span>
              <span className="text-[#ffffff50] mt-1">$201K</span>
            </div>
            <div className="flex flex-col col-span-1">
              <span>126.35 USDC</span>
              <span className="text-[#ffffff50] mt-1">$126.26</span>
            </div>
            <div className="flex items-center col-span-1">
              <span>75.00%</span>
            </div>
          </div>
          <div className="grid grid-cols-4 text-white text-sm font-bold justify-end mt-3">
            <div className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center col-span-1"></div>
            <div className="flex flex-col col-span-1">
              <span>201K USDC</span>
              <span className="text-[#ffffff50] mt-1">$201K</span>
            </div>
            <div className="flex flex-col col-span-1">
              <span>126.35 USDC</span>
              <span className="text-[#ffffff50] mt-1">$126.26</span>
            </div>
            <div className="flex items-center col-span-1">
              <span>75.00%</span>
            </div>
          </div>
          <div className="grid grid-cols-4 text-white text-sm font-bold justify-end mt-3">
            <div className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center col-span-1"></div>
            <div className="flex flex-col col-span-1">
              <span>201K USDC</span>
              <span className="text-[#ffffff50] mt-1">$201K</span>
            </div>
            <div className="flex flex-col col-span-1">
              <span>126.35 USDC</span>
              <span className="text-[#ffffff50] mt-1">$126.26</span>
            </div>
            <div className="flex items-center col-span-1">
              <span>75.00%</span>
            </div>
          </div>
          <div className="grid grid-cols-4 text-white text-sm font-bold justify-end mt-3">
            <div className="rounded-full w-8 h-8 bg-[#ffffff20] flex self-center col-span-1"></div>
            <div className="flex flex-col col-span-1">
              <span>201K USDC</span>
              <span className="text-[#ffffff50] mt-1">$201K</span>
            </div>
            <div className="flex flex-col col-span-1">
              <span>126.35 USDC</span>
              <span className="text-[#ffffff50] mt-1">$126.26</span>
            </div>
            <div className="flex items-center col-span-1">
              <span>75.00%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
