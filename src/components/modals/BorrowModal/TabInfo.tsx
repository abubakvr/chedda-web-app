import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import InfoIcon from "@/assets/icon/info-icon.svg";
import { RefreshSpinner } from "@/components/ui/refreshSpinner/RefreshSpinner";

export interface DepositTabInfoProps {
  isLoading: boolean;
  symbol: string;
  collateral: string;
  projectedCollateral: string;
  projectedCollateralValue: string;
  collateralValue: string;
  healthFactor: string;
  projectedHealthFactor: number;
}

export interface WithdrawInfoProps {
  liquidity: string;
  supplied: string;
  baseSupplyAPY: string;
  projectedLiquidity: string;
  projectedSupply: string;
}

export const DepositTabInfo = ({
  isLoading,
  symbol,
  collateralValue,
  projectedCollateralValue,
  collateral,
  projectedCollateral,
  healthFactor,
  projectedHealthFactor,
}: DepositTabInfoProps) => {
  return (
    <div data-testid="deposit-tab-info">
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold" data-testid="symbol-label">
          {symbol} Collateral
        </div>
        <div className="flex items-center gap-x-1.5">
          <RefreshSpinner isOpen={isLoading} data-testid="refresh-spinner" />
          <div className="flex space-x-2">
            <div className="font-bold" data-testid="collateral">
              {isLoading ? "-" : collateral}
            </div>
            <Image
              src={ArrowRight}
              alt="loading spinner"
              className="flex self-center"
            />
            <div className="font-bold" data-testid="projected-collateral">
              {isLoading ? "-" : projectedCollateral}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div
          className="opacity-50 font-semibold"
          data-testid="collateral-value-label"
        >
          Collateral Value
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2">
            <div className="font-bold" data-testid="total-collateral-value">
              {isLoading ? "-" : collateralValue}
            </div>
            <Image
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div
              className="font-bold"
              data-testid="projected-total-collateral-value"
            >
              {isLoading ? "-" : projectedCollateralValue}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div
          className="opacity-50 font-semibold flex gap-x-2"
          data-testid="health-factor-label"
        >
          Health Factor
          <Image src={InfoIcon} alt="info icon" />
        </div>
        <div className="flex items-center gap-x-1.5">
          <div className="flex space-x-2  text-success">
            <div className="font-bold" data-testid="health-factor">
              {isLoading ? "-" : parseFloat(healthFactor).toFixed(2)}
            </div>
            <Image
              src={ArrowRight}
              alt="right arrow"
              className="flex self-center"
            />
            <div className="font-bold" data-testid="projected-health-factor">
              {isLoading ? "-" : projectedHealthFactor.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WithdrawTabInfo = ({
  liquidity,
  supplied,
  projectedLiquidity,
  projectedSupply,
}: WithdrawInfoProps) => {
  return (
    <div data-testid="withdraw-tab-info">
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold" data-testid="liquidity-label">
          Liquidity
        </div>
        <div className="flex space-x-2">
          <div className="font-bold" data-testid="current-liquidity">
            {liquidity}
          </div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold" data-testid="projected-liquidity">
            {projectedLiquidity}
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold" data-testid="supplied-label">
          Supplied
        </div>
        <div className="flex space-x-2">
          <div className="font-bold" data-testid="current-supplied">
            {supplied}
          </div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold" data-testid="projected-supply">
            {projectedSupply}
          </div>
        </div>
      </div>
    </div>
  );
};
