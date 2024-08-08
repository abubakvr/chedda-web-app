"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrowForward from "@/assets/icon/arrow-forward.svg";
import {
  formatCurrency,
  formatLargeNumber,
  formatNumber,
} from "@/utils/formatters";
import { IPositionResponse } from "@/utils/types";
import { getHealthFactorColor } from "@/utils/helpers";

interface PositionItemProps {
  pool: IPositionResponse;
  cheddaTokenPrice: number;
}

export const PositionItem = ({ pool, cheddaTokenPrice }: PositionItemProps) => {
  return (
    <React.Fragment>
      <Link href={`/markets/${pool.pool}`} passHref>
        {/** Web View */}
        <div
          data-testid="position-item"
          className="h-28 w-full px-7 py-5 hidden lg:grid grid-cols-7 grid-row-bg gap-x-20 text-white hover:opacity-80 hover:bg-blue-200 hover:bg-opacity-10 cursor-pointer"
        >
          <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-2 w-max">
            <div className="flex items-center ">
              <div className="flex relative">
                <Image
                  src={pool.asset?.logo}
                  className="h-10 w-10 round-image"
                  alt={pool.asset?.symbol}
                  data-testid="asset-icon"
                />
                <Image
                  src={pool.asset?.sourceLogo}
                  alt="icon image"
                  className="absolute w-[18px] h-[18px] top-0 left-0"
                />
              </div>
              <div
                className="ml-2 tracking-widest text-lg font-bold"
                data-testid="asset-symbol"
              >
                {pool.asset?.symbol}
              </div>
            </div>
            {/* <div className="defi-box uppercase h-6 w-20 mt-3 flex items-center justify-center text-[10px] font-bold">
              {pool.characterization}
            </div> */}
          </div>
          <div className="flex justify-left items-center w-max">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="supplied-amount">
                {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
              </div>
              <div className="opacity-50 mt-1.5" data-testid="supplied-value">
                {formatCurrency(pool.suppliedValue)}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center w-max">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="borrowed-amount">
                {formatLargeNumber(pool.borrowed)} {pool.asset?.symbol}
              </div>
              <div className="opacity-50 mt-1.5" data-testid="borrowed-value">
                {formatCurrency(pool.borrowedValue)}
              </div>
            </div>
          </div>
          <div className="flex justify-start w-max">
            <div className="text-sm flex items-center font-semibold md:col-span-1">
              <div
                data-testid="health-factor-value"
                className={getHealthFactorColor(pool.healthFactor)}
              >
                {formatNumber(pool.healthFactor)}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center w-max">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="staked-amount">
                {formatLargeNumber(pool.staked)} CHEDDA
              </div>
              <div className="opacity-50 mt-1.5" data-testid="staked-value">
                {formatCurrency(pool.staked * cheddaTokenPrice)}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center w-max">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="locked-amount">
                {formatLargeNumber(pool.locked)} CHEDDA
              </div>
              <div className="opacity-50 mt-1.5" data-testid="locked-value">
                {formatCurrency(pool.locked * cheddaTokenPrice)}
              </div>
            </div>
          </div>
          <div className="flex items-center" data-testid="arrow-forward">
            <Image src={arrowForward} alt="arrow forward" />
          </div>
        </div>
        {/** Mobile Items */}
        <div className="lg:hidden ">
          <div
            className="justify-between text-white text-sm mt-3 p-4"
            data-testid={"position-item"}
          >
            <div className="flex items-center gap-x-2">
              <div className="flex relative">
                <Image
                  src={pool.asset.logo}
                  alt={pool.asset.name}
                  className="w-8 h-8 md:w-10 md:h-10"
                  data-testid={`mobile-collateral-item`}
                />
                <Image
                  src={pool.asset?.sourceLogo}
                  alt="icon image"
                  className="absolute w-[14px] h-[14px] md:w-[18px] md:h-[18px] top-0 left-0"
                />
              </div>
              <div className="font-bold text-xs md:text-sm">
                {pool.asset.symbol}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-[10px] md:text-xs text-[#FFFFFF70]">
                Supplied
              </div>
              <div className="flex flex-col items-end text-[10px] md:text-xs">
                <span className="font-bold">
                  {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
                </span>
                <span className="text-[#ffffff50]">
                  {formatCurrency(pool.suppliedValue)}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-[10px] md:text-xs text-[#FFFFFF70]">
                Borrowed
              </div>
              <div className="flex flex-col items-end text-[10px] md:text-xs">
                <span className="font-bold">
                  {formatLargeNumber(pool.borrowed)} {pool.asset?.symbol}
                </span>
                <span className="text-[#ffffff50]">
                  {formatCurrency(pool.borrowedValue)}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-[10px] md:text-xs text-[#FFFFFF70]">
                Health Factor
              </div>
              <div className="flex flex-col items-end text-[10px] md:text-xs">
                <span
                  className={`font-bold ${getHealthFactorColor(pool.healthFactor)}`}
                >
                  {formatNumber(pool.healthFactor)}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <div className="text-[10px] md:text-xs text-[#FFFFFF70]">
                Stake/Earn
              </div>
              <div className="flex flex-col items-end text-[10px] md:text-xs">
                <span className="font-bold">
                  {formatLargeNumber(pool.staked)} CHEDDA
                </span>
                <span className="text-[#ffffff50]">
                  {formatCurrency(pool.staked * cheddaTokenPrice)}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-[10px] text-[#FFFFFF70]">Lock/Earn</div>
              <div className="flex flex-col items-end text-[10px] md:text-xs">
                <span className="font-bold">
                  {formatLargeNumber(pool.locked)} CHEDDA
                </span>
                <span className="text-[#ffffff50]">
                  {formatCurrency(pool.locked * cheddaTokenPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};
