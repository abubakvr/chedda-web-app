import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import InfoIcon from "@/assets/icon/info-icon.svg";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";
import { toFixedTrunc } from "@/utils/formatters";
import { getHealthFactorColor } from "@/utils/helpers";

export interface DepositTabInfoProps {
  isLoading: boolean;
  symbol: string;
  collateralAmount: string;
  projectedCollateralAmount: string;
  projectedTotalCollateralValue: string;
  totalCollateralValue: string;
  healthFactor: string;
  projectedHealthFactor: number;
}

export interface BorrowTabInfoProps {
  isLoading: boolean;
  totalBorrowed: string;
  projectedTotalBorrowed: string;
  collateralValue: string;
  healthFactor: string;
  projectedHealthFactor: number;
  liquidity: string;
  projectedLiquidity: string;
}

export const DepositTabInfo = ({
  isLoading,
  symbol,
  totalCollateralValue,
  projectedTotalCollateralValue,
  collateralAmount,
  projectedCollateralAmount,
  healthFactor,
  projectedHealthFactor,
}: DepositTabInfoProps) => {
  return (
    <div data-testid="deposit-tab-info">
      <div className="flex justify-between text-2xs md:text-xs lg:text-sm pb-5">
        <div className="opacity-50 font-semibold" data-testid="symbol-label">
          {symbol} Collateral
        </div>
        <div className="flex items-center gap-x-1.5">
          <RefreshSpinner isOpen={isLoading} data-testid="refresh-spinner" />
          <div className="flex space-x-2">
            <div className="font-bold" data-testid="collateral-amount">
              {isLoading ? "-" : collateralAmount}
            </div>
            <Image
              style={{ color: "" }}
              src={ArrowRight}
              alt="loading spinner"
              className="flex self-center"
            />
            <div
              className="font-bold"
              data-testid="projected-collateral-amount"
            >
              {isLoading ? "-" : projectedCollateralAmount}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-2xs md:text-xs lg:text-sm pb-5">
        <div
          className="opacity-50 font-semibold"
          data-testid="collateral-value-label"
        >
          Collateral Value
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2">
            <div className="font-bold" data-testid="total-collateral-value">
              {isLoading ? "-" : totalCollateralValue}
            </div>
            <Image
              style={{ color: "" }}
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div
              className="font-bold"
              data-testid="projected-total-collateral-value"
            >
              {isLoading ? "-" : projectedTotalCollateralValue}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-2xs md:text-xs lg:text-sm">
        <div
          className="flex items-center opacity-50 font-semibold gap-x-2"
          data-testid="health-factor-label"
        >
          Health Factor
          <Image
            style={{ color: "" }}
            src={InfoIcon}
            alt="info icon"
            className="h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2  text-success">
            <div
              className={`font-bold ${getHealthFactorColor(Number(healthFactor))}`}
              data-testid="health-factor"
            >
              {isLoading ? "-" : toFixedTrunc(Number(healthFactor), 2)}
            </div>
            <Image
              style={{ color: "" }}
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div
              className={`font-bold ${getHealthFactorColor(projectedHealthFactor)}`}
              data-testid="projected-health-factor"
            >
              {isLoading ? "-" : toFixedTrunc(projectedHealthFactor, 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BorrowTabInfo = ({
  isLoading,
  totalBorrowed,
  collateralValue,
  healthFactor,
  liquidity,
  projectedTotalBorrowed,
  projectedHealthFactor,
  projectedLiquidity,
}: BorrowTabInfoProps) => {
  return (
    <div data-testid="borrow-tab-info">
      <div className="flex justify-between items-center text-2xs md:text-xs lg:text-sm pb-5">
        <div
          className="flex items-center opacity-50 font-semibold gap-x-2"
          data-testid="total-borrowed-label"
        >
          Borrowed
          <Image
            style={{ color: "" }}
            src={InfoIcon}
            alt="info icon"
            className="h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
        </div>
        <div className="flex items-center gap-x-1.5">
          <RefreshSpinner isOpen={isLoading} data-testid="refresh-spinner" />
          <div className="flex space-x-2">
            <div className="font-bold" data-testid="total-borrowed">
              {isLoading ? "-" : totalBorrowed}
            </div>
            <Image
              style={{ color: "" }}
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div className="font-bold" data-testid="projected-total-borrowed">
              {isLoading ? "-" : projectedTotalBorrowed}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-2xs md:text-xs lg:text-sm pb-5">
        <div
          className="opacity-50 flex items-center font-semibold gap-x-2"
          data-testid="collateral-value-label"
        >
          Collateral Value
          <Image
            style={{ color: "" }}
            src={InfoIcon}
            alt="info icon"
            className="h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2">
            <div className="font-bold" data-testid="collateral-value">
              {isLoading ? "-" : collateralValue}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-2xs md:text-xs lg:text-sm pb-5">
        <div
          className="flex items-center opacity-50 font-semibold gap-x-2"
          data-testid="health-factor-label"
        >
          Health Factor
          <Image
            style={{ color: "" }}
            src={InfoIcon}
            alt="info icon"
            className="h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2  text-success">
            <div
              className={`font-bold ${getHealthFactorColor(Number(healthFactor))}`}
              data-testid="health-factor"
            >
              {isLoading ? "-" : toFixedTrunc(Number(healthFactor), 2)}
            </div>
            <Image
              style={{ color: "" }}
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div
              className={`font-bold ${getHealthFactorColor(projectedHealthFactor)}`}
              data-testid="projected-health-factor"
            >
              {isLoading ? "-" : toFixedTrunc(projectedHealthFactor, 2)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-2xs md:text-xs lg:text-sm">
        <div
          className="flex items-center opacity-50 font-semibold gap-x-2"
          data-testid="liquidity-label"
        >
          Liquidity
          <Image
            style={{ color: "" }}
            src={InfoIcon}
            alt="info icon"
            className="h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2 ">
            <div className="font-bold" data-testid="liquidity">
              {isLoading ? "-" : liquidity}
            </div>
            <Image
              style={{ color: "" }}
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div className="font-bold" data-testid="projected-liquidity">
              {isLoading ? "-" : projectedLiquidity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
