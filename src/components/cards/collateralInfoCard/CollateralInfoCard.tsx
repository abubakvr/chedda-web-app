"use client";
import React from "react";
import { formatCurrency, parseBigNumberToFloat } from "@/utils/formatters";
import { IAccountInfo, IMarketInfo } from "chedda-sdk";
import { CollateralInfoSkeleton } from "@/components/ui";
import { IFormattedCollateral } from "@/utils/types";
import { CollateralInfoChart } from "@/components/charts";
import { useNonce } from "@/hooks/useNonce";
import { CollateralTable } from "@/components/ui/collateralTable/CollateralTable";

const collateralHeaderItems = [
  { name: "Collateral" },
  { name: "Deposited" },
  { name: "My Deposits" },
  { name: "LTV", info: "Loan to value ratio" },
  { name: "LLTV", info: "Liquidation loan to value ratio." },
  { name: "Bonus", info: "Liquidation Bonus" },
  { name: "Penalty", info: "Liquidation Penalty" },
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
  isLoading,
}) => {
  const { nonce } = useNonce();

  if (isLoading) {
    return <CollateralInfoSkeleton />;
  }

  return (
    <div
      className="flex flex-col justify-between"
      data-testid="collateral-info-card"
    >
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 lg:px-4 xl:px-8 h-11 xl:h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-2xs lg:text-xs xl:text-sm uppercase">
          Collateral Info
        </div>
      </div>
      <div className="p-4 md:p-6 xl:p-8 md:pt-4 lg:px-4 xl:pt-4">
        <div
          className="w-full flex py-8 border rounded-lg  text-mist border-frost bg-glass"
          data-testid="collateral-info-container"
        >
          <div className="w-2/5 flex items-center justify-center">
            <CollateralInfoChart collateralInfo={collateralInfo ?? []} />
          </div>
          <div className="w-3/5">
            <div
              className="mt-4 flex justify-start gap-x-4 font-bold text-2xs text-sm xl:text-lg flex-wrap overflow-x-hidden"
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
                      nonce={nonce}
                    ></div>
                    <div>{item.asset.symbol}</div>
                  </div>
                );
              })}
            </div>
            {/* <div className="mt-4 md:mt-6 xl:mt-8 md:flex space-y-1 md:space-y-0 md:gap-x-16 text-3xs md:text-2xs lg:text-xs font-[400]">
            </div> */}
            <div className="mt-4 md:mt-6 xl:mt-12">
              <div className="text-white text-2xs md:text-xs sm:text-sm font-bold">
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
        <div>
          <CollateralTable
            collateralHeaderItems={collateralHeaderItems}
            collateralInfo={collateralInfo}
          />
        </div>
      </div>
    </div>
  );
};
