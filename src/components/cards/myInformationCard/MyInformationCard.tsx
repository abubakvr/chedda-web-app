import React from "react";
import Image from "next/image";
import LinkOut from "@/assets/icon/link-out.svg";
import {
  formatCurrency,
  formatLargeNumber,
  parseBigNumberToFloat,
} from "@/utils/formatters";
import { IPoolStatsResponse } from "@/utils/types";
import { MyInformationSkeleton } from "@/components/ui/skeleton/MyInformationSkeleton";
import { IAccountInfo } from "@/chedda-sdk";

interface MyInformationCardProps {
  poolStats: IPoolStatsResponse | undefined;
  accountInfo: IAccountInfo | undefined;
  isLoading: boolean;
  onSupplyClick: () => void;
  onBorrowClick: () => void;
}

export const MyInformationCard: React.FC<MyInformationCardProps> = ({
  poolStats,
  accountInfo,
  isLoading,
  onSupplyClick,
  onBorrowClick,
}) => {
  if (isLoading || !poolStats) {
    // Render loading placeholder if poolStats is undefined
    return <MyInformationSkeleton />;
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="card-header-bg flex justify-between w-full rounded-t-lg px-8 h-[50px] items-center uppercase font-bold">
        <div className="text-white text-opacity-50 font-bold text-lg">
          My Information
        </div>
        <button className="flex gap-x-1 text-white border-2 text-opacity-100-2 border-opacity-5 rounded text-[10px] py-[5px] px-3 opacity-50 hover:opacity-70">
          Vault Contract
          <Image src={LinkOut} alt="link out" />
        </button>
      </div>

      <div className="flex justify-between items-center p-8 border-b border-gray-500">
        <div className="h-fit">
          <div className="flex">
            {poolStats?.collaterals.map((collateral: any, i) => (
              <div key={i} className="logo-cascade round-image">
                <Image
                  src={collateral.logo}
                  className="cascade-img h-8 w-8 round-image"
                  alt={collateral.logo}
                  data-testid="collateral-logo"
                />
              </div>
            ))}
          </div>
          <div
            className={`w-fit font-bold flex flex-wrap m-0 gap-x-1 text-ellipsis overflow-hidden`}
            data-testid="collaterals-list"
          >
            {poolStats?.collaterals.map((collateral, i) => (
              <div
                className="mt-2 flex justify-start items-start text-ellipsis text-white text-[10px] font-semibold"
                key={i}
              >
                {collateral.symbol}
                {i !== poolStats?.collaterals.length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
        </div>
        <button
          className="secondary-button manage-gradient-text flex gap-x-1 h-8 items-center text-white text-opacity-100-2 uppercase font-bold text-[10px] py-[5px] px-4  hover:opacity-80"
          onClick={onSupplyClick}
        >
          Manage Collateral
        </button>
      </div>

      <div className="p-8 pb-0">
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Available to Supply</div>
          <div className="text-sm font-bold">
            {formatCurrency(
              parseBigNumberToFloat(accountInfo?.totalCollateralValue)
            )}
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Total Supplied</div>
          <div className="text-sm font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.supplied)
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Total Borrowed</div>
          <div className="text-sm font-bold">
            {`${formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.borrowed)
            )} ${poolStats?.asset.symbol}`}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="opacity-50 text-sm">Health Factor</div>
          <div className="text-sm font-bold">
            {formatLargeNumber(
              parseBigNumberToFloat(accountInfo?.healthFactor)
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 space-y-5">
        <button
          className="primary-button text-center h-11 items-center rounded-lg text-white text-opacity-100-2 uppercase font-bold text-lg hover:opacity-80"
          onClick={onSupplyClick}
        >
          Supply
        </button>
        <button
          className="secondary-button button-gradient-text text-center h-11 items-center text-white text-opacity-100-2 uppercase font-bold text-lg  hover:opacity-80"
          onClick={onBorrowClick}
        >
          Borrow
        </button>
      </div>
    </div>
  );
};
