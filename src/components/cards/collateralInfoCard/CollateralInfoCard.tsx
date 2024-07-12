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
      <div className="border-b border-[#ffffff19] flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center uppercase font-bold">
        <div className="text-white text-opacity-50 text-lg">
          Collateral Information
        </div>
      </div>
      <div className="p-8 pt-4">
        <div
          className="w-full flex pb-4 border rounded-lg  text-[#ffffff70] border-[#ffffff19] bg-[#ffffff02]"
          data-testid="collateral-info-container"
        >
          <div className="w-2/5 flex items-center justify-center">
            <CollateralInfoChart collateralInfo={collateralInfo ?? []} />
          </div>
          <div className="w-3/5">
            <div
              className="mt-4 flex space-x-4 font-bold text-lg"
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
                      className="w-[5px] h-[15px] rounded"
                      style={{ background: `${item.asset.color}` }}
                    ></div>
                    <div>{item.asset.symbol}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex gap-x-16 text-xs font-[400]">
              <div data-testid="liquidation-threshold">
                <div className="flex gap-x-2">
                  <div className="font-bold">Liquidation threshold</div>
                  <Image src={InfoIcon} alt="Info Icon" />
                </div>
                <div className="mt-2">
                  {formatAsPercentage(
                    parseBigNumberToFloat(marketInfo?.liquidationThreshold)
                  )}
                </div>
              </div>
              <div data-testid="liquidation-penalty">
                <div className="flex gap-x-2">
                  <div className="font-bold">Liquidation Penalty</div>
                  <Image src={InfoIcon} alt="Info Icon" />
                </div>
                <div className="mt-2">
                  {formatAsPercentage(
                    parseBigNumberToFloat(marketInfo?.liquidationPenalty)
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-white text-sm font-bold">MY COLLATERAL</div>
              <div
                className="card-gradient-text font-bold text-2xl w-fit mt-2"
                data-testid="my-collateral-value"
              >
                {formatCurrency(
                  parseBigNumberToFloat(accountInfo?.totalCollateralValue)
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-10 rounded mt-4 bg-[#ffffff05] px-8 flex justify-between text-white items-center">
          {collateralHeaderItems.map((item, index) => {
            return (
              <div
                key={index}
                className="text-[#ffffff60] text-xs font-bold w-28"
                data-testid={`collateral-header-item-${index}`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="px-8 mt-4">
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
                        className="w-10 h-10"
                        data-testid={`collateral-item-logo-${index}`}
                      />
                      <Image
                        src={item.asset?.sourceLogo}
                        alt="icon image"
                        className="absolute w-[18px] h-[18px] top-0 left-0"
                      />
                    </div>
                    <div className="font-bold text-sm">{item.asset.symbol}</div>
                  </div>
                </div>
                <div className="flex flex-col w-28">
                  <span className="font-bold">
                    {item.amountDeposited} {item.asset.symbol}
                  </span>
                  <span className="text-[#ffffff50] mt-1">
                    {formatCurrency(item.value)}
                  </span>
                </div>
                <div className="flex flex-col w-28">
                  <span className="font-bold">
                    {item.myCollateralAmount} {item.asset.symbol}
                  </span>
                  <span className="text-[#ffffff50] mt-1">
                    {item.myCollateralValue}
                  </span>
                </div>
                <div
                  className="w-28 pl-1"
                  data-testid={`collateral-factor-${index}`}
                >
                  <span className="font-bold">{item.collateralFactor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
