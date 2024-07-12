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
import { sourceChains } from "@/utils/constants";

interface PositionItemProps {
  pool: IPositionResponse;
  cheddaTokenPrice: number;
}

export const PositionItem = ({ pool, cheddaTokenPrice }: PositionItemProps) => {
  const assetSourceNetwork = sourceChains.find(
    (item) => item.key === pool.asset.source
  );
  return (
    <React.Fragment>
      <Link href={`/markets/${pool.pool}`} passHref>
        <div
          data-testid="position-item"
          className="h-28 w-full px-7 py-5 hidden md:grid grid-cols-7 grid-row-bg gap-x-20 text-white hover:opacity-80 hover:bg-blue-200 hover:bg-opacity-10 cursor-pointer"
        >
          <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-2">
            <div className="flex items-center">
              <div className="flex relative">
                <Image
                  src={pool.asset?.logo}
                  className="h-10 w-10 round-image"
                  alt={pool.asset?.symbol}
                  data-testid="asset-icon"
                />
                <Image
                  src={assetSourceNetwork?.logo ?? ""}
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
          <div className="flex justify-left items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="supplied-amount">
                {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
              </div>
              <div className="opacity-50 mt-1.5" data-testid="supplied-value">
                {formatCurrency(pool.suppliedValue)}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="borrowed-amount">
                {formatLargeNumber(pool.borrowed)} {pool.asset?.symbol}
              </div>
              <div className="opacity-50 mt-1.5" data-testid="borrowed-value">
                {formatCurrency(pool.borrowedValue)}
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="text-sm flex items-center font-semibold md:col-span-1">
              <div
                data-testid="health-factor-value"
                className={getHealthFactorColor(pool.healthFactor)}
              >
                {formatNumber(pool.healthFactor)}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1">
              <div data-testid="staked-amount">
                {formatLargeNumber(pool.staked)} CHEDDA
              </div>
              <div className="opacity-50 mt-1.5" data-testid="staked-value">
                {formatCurrency(pool.staked * cheddaTokenPrice)}
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center">
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
      </Link>
    </React.Fragment>
  );
};
