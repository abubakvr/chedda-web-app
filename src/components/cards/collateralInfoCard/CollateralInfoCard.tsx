"use client";
import React from "react";
import Image from "next/image";
import InfoIcon from "@/assets/icon/gradient-info-icon.svg";
import {
  formatAsPercentage,
  formatCurrency,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IAccountInfo, IMarketInfo } from "chedda-sdk";
import { CollateralInfoSkeleton } from "@/components/ui";
import { IFormattedCollateral } from "@/utils/types";
import { CollateralInfoChart } from "@/components/charts";

const collateralHeaderItems = [
  "Collateral",
  "Deposited",
  "My Deposits",
  "Collateral Factor",
];
interface CollateralInfoCardProps {
  collateralInfo: IFormattedCollateral[] | undefined;
  accountInfo: IAccountInfo | undefined;
  marketInfo: IMarketInfo | undefined;
  isLoading: boolean;
}

export const CollateralInfoCard: React.FC<CollateralInfoCardProps> = ({
  collateralInfo,
  accountInfo,
  marketInfo,
  isLoading,
}) => {
  if (isLoading) {
    return <CollateralInfoSkeleton />;
  }

  return (
    <div
      className="flex flex-col justify-between"
      data-testid="collateral-info-card"
    >
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 xl:px-8 h-11 xl:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-[10px] lg:text-xs xl:text-sm uppercase">
          Collateral Info
        </div>
      </div>
      <div className="p-4 md:p-6 xl:p-8 md:pt-4 xl:pt-4">
        <div
          className="w-full flex pb-4 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]"
          data-testid="collateral-info-container"
        >
          <div className="w-2/5 flex items-center justify-center">
            <CollateralInfoChart collateralInfo={collateralInfo ?? []} />
          </div>
          <div className="w-3/5">
            <div
              className="mt-4 flex justify-start gap-x-4 font-bold text-[10px] text-sm xl:text-lg flex-wrap overflow-x-hidden"
              data-testid="collateral-chart-labels"
            >
              {collateralInfo?.map((item, index) => {
                return (
                  <div
                    className="flex items-center gap-x-1"
                    key={index}
                    data-testid={`collateral-chart-label-${index}`}
                  >
                    <div
                      className="w-[2.7px] h-2 md:w-[4px] md:h-[12px] xl:w-[5px] xl:h-[15px] rounded"
                      style={{ background: `${item.asset.color}` }}
                    ></div>
                    <div>{item.asset.symbol}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 md:mt-6 xl:mt-8 md:flex space-y-1 md:space-y-0 md:gap-x-16 text-[8px] md:text-[10px] lg:text-xs font-[400]">
              <div
                data-testid="liquidation-threshold"
                className="grid grid-cols-2 gap-x-8 md:grid-cols-1"
              >
                <div className="flex items-center gap-x-2">
                  <div className="font-bold">Liquidation threshold</div>
                  <Image
                    src={InfoIcon}
                    alt="Info Icon"
                    className="w-2.5 h-2.5 md:w-3 md:h-3 xl:w-4 xl:h-4"
                  />
                </div>
                <div className="md:mt-2">
                  {formatAsPercentage(
                    parseBigNumberToFloat(marketInfo?.liquidationThreshold)
                  )}
                </div>
              </div>
              <div
                data-testid="liquidation-penalty"
                className="grid grid-cols-2 gap-x-8 md:grid-cols-1"
              >
                <div className="flex items-center gap-x-2">
                  <div className="font-bold">Liquidation Penalty</div>
                  <Image
                    src={InfoIcon}
                    alt="Info Icon"
                    className="w-2.5 h-2.5 md:w-3 md:h-3 xl:w-4 xl:h-4"
                  />
                </div>
                <div className="md:mt-2">
                  {formatAsPercentage(
                    parseBigNumberToFloat(marketInfo?.liquidationPenalty)
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-6 xl:mt-8">
              <div className="text-white text-[10px] md:text-xs sm:text-sm font-bold">
                MY COLLATERAL
              </div>
              <div
                className="card-gradient-text font-bold text-xs md:text-lg lg:text-xl xl:text-2xl w-fit mt-1 xl:mt-2"
                data-testid="my-collateral-value"
              >
                {formatCurrency(
                  parseBigNumberToFloat(accountInfo?.totalCollateralValue)
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Desktop view */}
        <div className="hidden md:flex w-full h-10 rounded mt-4 bg-[#ffffff05] px-8 justify-between text-white items-center">
          {collateralHeaderItems.map((item, index) => {
            return (
              <div
                key={index}
                className="text-[#ffffff60] text-[10px] lg:text-xs font-bold w-28"
                data-testid={`collateral-header-item-${index}`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="hidden md:flex flex-col px-8 mt-4">
          {collateralInfo?.map((item, index) => {
            return (
              <div
                className="flex justify-between text-white text-sm mt-3"
                key={index}
                data-testid={`collateral-item-${index}`}
              >
                <div className="w-28">
                  <div className="flex items-center gap-x-2">
                    <div className="flex relative">
                      <Image
                        src={item.asset.logo}
                        alt={item.asset.name}
                        className="w-8 h-8 xl:w-10 xl:h-10"
                        data-testid={`collateral-item-logo-${index}`}
                      />
                      <Image
                        src={item.asset?.sourceLogo}
                        alt="icon image"
                        className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
                      />
                    </div>
                    <div className="font-bold text-xs lg:text-sm">
                      {item.asset.symbol}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-28 text-xs lg:text-sm">
                  <span className="font-bold">
                    {item.amountDeposited} {item.asset.symbol}
                  </span>
                  <span className="text-[#ffffff50] mt-1">
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <div className="flex flex-col w-28 text-xs lg:text-sm">
                  <span className="font-bold">
                    {item.myCollateralAmount} {item.asset.symbol}
                  </span>
                  <span className="text-[#ffffff50] mt-1">
                    {item.myCollateralValue}
                  </span>
                </div>
                <div
                  className="w-28 pl-1 text-xs lg:text-sm"
                  data-testid={`collateral-factor-${index}`}
                >
                  <span className="font-bold">{item.collateralFactor}</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Mobile view */}
        <div className="md:hidden mt-4 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]">
          {collateralInfo?.map((item, index) => {
            return (
              <div
                className="justify-between text-white text-sm mt-3 p-4 border-b border-[#ffffff19]"
                key={index}
                data-testid={`mobile-collateral-item-${index}`}
              >
                <div className="flex items-center gap-x-2">
                  <div className="flex relative">
                    <Image
                      src={item.asset.logo}
                      alt={item.asset.name}
                      className="w-8 h-8 xl:w-10 xl:h-10"
                      data-testid={`mobile-collateral-item-logo-${index}`}
                    />
                    <Image
                      src={item.asset?.sourceLogo}
                      alt="icon image"
                      className="absolute w-[14px] h-[14px] xl:w-[18px] xl:h-[18px] top-0 left-0"
                    />
                  </div>
                  <div className="font-bold text-xs xl:text-sm">
                    {item.asset.symbol}
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="text-[10px] text-[#FFFFFF70]">Deposited</div>
                  <div className="flex flex-col items-end text-[10px]">
                    <span className="font-bold">
                      {item.amountDeposited} {item.asset.symbol}
                    </span>
                    <span className="text-[#ffffff50]">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-[10px] text-[#FFFFFF70]">
                    My Deposits
                  </div>
                  <div className="flex flex-col items-end text-[10px]">
                    <span className="font-bold">
                      {item.myCollateralAmount} {item.asset.symbol}
                    </span>
                    <span className="text-[#ffffff50]">
                      {item.myCollateralValue}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-[10px] text-[#FFFFFF70]">
                    Collateral Factor
                  </div>
                  <div
                    className="pl-1 text-[10px]"
                    data-testid={`mobile-collateral-factor-${index}`}
                  >
                    <span className="font-bold">{item.collateralFactor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
