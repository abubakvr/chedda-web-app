import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icon/arrow-right.svg";

interface SupplyInfoProps {
  allowance: string;
  supplied: string;
  baseSupplyAPY: string;
  projectedSupply: string;
}

interface WithdrawInfoProps {
  liquidity: string;
  supplied: string;
  baseSupplyAPY: string;
  projectedLiquidity: string;
  projectedSupply: string;
}

export const SupplyTabInfo = ({
  allowance,
  supplied,
  baseSupplyAPY,
  projectedSupply,
}: SupplyInfoProps) => {
  return (
    <div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-5">
        <div className="opacity-50 font-semibold">Allowance</div>
        <div className="font-bold">{allowance}</div>
      </div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-5">
        <div className="opacity-50 font-semibold">Supplied</div>
        <div className="flex space-x-2">
          <div className="font-bold">{supplied}</div>
          <Image
            style={{ color: "" }}
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
          <div className="font-bold">{projectedSupply}</div>
        </div>
      </div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-5">
        <div className="opacity-50 font-semibold">Base Supply APY</div>
        <div className="font-bold">{baseSupplyAPY}</div>
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
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-5">
        <div className="opacity-50 font-semibold">Liquidity</div>
        <div className="flex space-x-2">
          <div className="font-bold">{liquidity}</div>
          <Image
            style={{ color: "" }}
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center h-3 w-3 lg:h-[14px] lg:w-[14px]"
          />
          <div className="font-bold">{projectedLiquidity}</div>
        </div>
      </div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm pb-5">
        <div className="opacity-50 font-semibold">Supplied</div>
        <div className="flex space-x-2">
          <div className="font-bold">{supplied}</div>
          <Image
            style={{ color: "" }}
            src={ArrowRight}
            alt="right arrow"
            className="flex self-center"
          />
          <div className="font-bold">{projectedSupply}</div>
        </div>
      </div>
      <div className="flex justify-between text-[10px] md:text-xs lg:text-sm">
        <div className="opacity-50 font-semibold">Base Supply APY</div>
        <div className="font-bold">{baseSupplyAPY}</div>
      </div>
    </div>
  );
};
