import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icon/arrow-right.svg";
import InfoIcon from "@/assets/icon/info-icon.svg";

interface SupplyInfoProps {
  collateral: string;
  projectedCollateral: string;
  projectedCollateralValue: string;
  collateralValue: string;
  healthFactor: string;
  projectedHealthFactor: string;
}

interface WithdrawInfoProps {
  liquidity: string;
  supplied: string;
  baseSupplyAPY: string;
  projectedLiquidity: string;
  projectedSupply: string;
}

export const DepositTabInfo = ({
  collateralValue,
  projectedCollateralValue,
  collateral,
  projectedCollateral,
  healthFactor,
  projectedHealthFactor,
}: SupplyInfoProps) => {
  return (
    <div>
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold">USDC Collateral</div>
        <div className="flex space-x-2">
          <div className="font-bold">{collateral}</div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold">{projectedCollateral}</div>
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold">Collateral Value</div>
        <div className="flex space-x-2">
          <div className="font-bold">{collateralValue}</div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold">{projectedCollateralValue}</div>
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold flex gap-x-2">
          Health Factor
          <Image src={InfoIcon} alt="info icon" />
        </div>
        <div className="flex space-x-2  text-success">
          <div className="font-bold">{healthFactor}</div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold">{projectedHealthFactor}</div>
        </div>
      </div>
    </div>
  );
};

export const WithdrawTabInfo = ({
  liquidity,
  supplied,
  projectedLiquidity,
  baseSupplyAPY,
  projectedSupply,
}: WithdrawInfoProps) => {
  return (
    <div>
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold">Liquidity</div>
        <div className="flex space-x-2">
          <div className="font-bold">{liquidity}</div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold">{projectedLiquidity}</div>
        </div>
      </div>
      <div className="flex justify-between text-sm pb-5">
        <div className="opacity-50 font-semibold">Supplied</div>
        <div className="flex space-x-2">
          <div className="font-bold">{supplied}</div>
          <Image
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold">{projectedSupply}</div>
        </div>
      </div>
    </div>
  );
};
