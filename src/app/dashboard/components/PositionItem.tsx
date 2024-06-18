"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfoIcon from "@/assets/icon/info-icon.svg";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
} from "@/utils/formatters";
import { IPoolStatsResponse, IToken } from "@/utils/types";

export const VaultItem = ({ pool }: { pool: IPoolStatsResponse }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [showEllipses, setShowEllipses] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    const handleShowEllipses = () => {
      if (element) {
        const hasVerticalOverflow = element.scrollHeight > element.clientHeight;

        if (hasVerticalOverflow) {
          setShowEllipses(true);
        } else {
          setShowEllipses(false);
        }
      }
    };

    handleShowEllipses();
    window.addEventListener("resize", handleShowEllipses);

    return () => {
      window.removeEventListener("resize", handleShowEllipses);
    };
  }, []);

  return (
    <React.Fragment>
      <Link href={`/markets/${pool.pool}`} passHref>
        <div
          data-testid="vault-item"
          className="h-28 w-full px-7 py-5 hidden md:grid grid-cols-7 grid-row-bg justify-between text-white hover:opacity-80 hover:bg-blue-200 hover:bg-opacity-10 cursor-pointer"
        >
          <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-2">
            <div className="flex items-center">
              <Image
                src={pool.asset?.logo}
                className="h-8 w-8 "
                alt={pool.asset?.symbol}
                data-testid="asset-name"
              />
              <div
                className="ml-2 tracking-widest text-lg font-bold"
                data-testid="asset-symbol"
              >
                {pool.asset?.symbol}
              </div>
            </div>
            <div className="defi-box uppercase h-6 w-20 mt-3 flex items-center justify-center text-[10px] font-bold">
              {pool.characterization}
            </div>
          </div>
          <div className="flex justify-left items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
              <div data-testid="supplied">
                {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
              </div>
              <div className="opacity-50 mt-1.5" data-testid="supplied-value">
                {formatCurrency(pool.suppliedValue)}
              </div>
            </div>
          </div>
          <React.Fragment>
            <div className="flex justify-center items-center">
              <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
                <div data-testid="supplied">
                  {formatLargeNumber(pool.supplied)} {pool.asset?.symbol}
                </div>
                <div className="opacity-50 mt-1.5" data-testid="supplied-value">
                  {formatCurrency(pool.suppliedValue)}
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
              <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
                <div data-testid="max-supply-apy">
                  {formatAsPercentage(pool.maxSupplyAPY)}
                </div>
                <Image src={InfoIcon} alt="Info Icon" />
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
                <div data-testid="borrowed">
                  {formatLargeNumber(pool.borrowed)} {pool.asset?.symbol}
                </div>
                <div className="opacity-50 mt-1.5" data-testid="borrowed-value">
                  {formatCurrency(pool.borrowedValue)}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
                <div data-testid="max-borrow-apy">
                  {formatAsPercentage(pool.maxBorrowAPY)}
                </div>
                <Image src={InfoIcon} alt="Info Icon" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
                <div data-testid="utilization">
                  {formatAsPercentage(pool.utilization)}
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      </Link>
    </React.Fragment>
  );
};
