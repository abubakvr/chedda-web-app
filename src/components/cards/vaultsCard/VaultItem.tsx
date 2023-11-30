import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfoIcon from "@/assets/icon/info-icon.svg";
import { formatCurrency, formatLargeNumber } from "@/utils/formatters";
import { IPoolStatsResponse } from "@/utils/types";
import { MobileVaultItem } from "./MobileVaultItem";

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
      <Link
        href={`/markets/${pool.pool}`}
        data-testid="vault-item"
        className="h-28 w-full px-7 py-5 hidden md:grid grid-cols-7 grid-row-bg justify-between text-white hover:opacity-80 hover:bg-blue-200 hover:bg-opacity-10 cursor-pointer"
      >
        <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-2">
          <div className="flex items-center">
            <Image
              src={pool.asset.logo}
              className="h-8 w-8 "
              alt={pool.asset.symbol}
              data-testid="asset-name"
            />
            <div
              className="font-bold ml-2 tracking-widest"
              data-testid="asset-symbol"
            >
              {pool.asset.symbol}
            </div>
          </div>
          <button className="secondary-button uppercase h-6 w-24 mt-3 text-[10px]">
            {pool.characterization}
          </button>
        </div>
        <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-1">
          <div className="flex ml-1">
            {pool.collaterals.map((collateral: any, i: number) => (
              <div key={i} className="logo-cascade round-image">
                <Image
                  src={collateral.logo}
                  className="cascade-img h-8 w-8 round-image"
                  alt={collateral.symbol}
                  data-testid="collateral-logo"
                />
              </div>
            ))}
          </div>
          <div
            ref={elementRef}
            className={`h-10 -w-fit font-bold flex flex-wrap m-0 gap-x-1 text-ellipsis overflow-hidden`}
            data-testid="collaterals-list"
          >
            {!showEllipses &&
              pool.collaterals.map((collateral: any, i: number) => (
                <div
                  className="flex justify-start items-start text-ellipsis"
                  key={i}
                >
                  {collateral.symbol}
                  {i !== pool.collaterals.length - 1 && <span>,</span>}
                </div>
              ))}
            {showEllipses &&
              pool.collaterals.slice(0, 4).map((collateral: any, i: number) => (
                <div
                  className="flex justify-start items-start text-ellipsis"
                  key={i}
                >
                  {collateral.symbol}
                  {i !== pool.collaterals.length - 1 && <span>,</span>}
                </div>
              ))}
            <div>{showEllipses && "..."}</div>
          </div>
        </div>
        <React.Fragment>
          <div className="flex justify-center items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
              <div data-testid="supplied">
                {formatLargeNumber(pool.supplied)} {pool.asset.symbol}
              </div>
              <div className="opacity-50" data-testid="supplied-value">
                {formatCurrency(pool.suppliedValue)}
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
              <div data-testid="max-supply-apy">{pool.maxSupplyAPY}%</div>
              <Image src={InfoIcon} alt="Info Icon" />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
              <div data-testid="borrowed">
                {formatLargeNumber(pool.borrowed)} {pool.asset.symbol}
              </div>
              <div className="opacity-50" data-testid="borrowed-value">
                {formatCurrency(pool.borrowedValue)}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
              <div data-testid="max-borrow-apy">{pool.maxBorrowAPY}%</div>
              <Image src={InfoIcon} alt="Info Icon" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-sm flex flex-col justify-center font-semibold md:col-span-1 w-[100px]">
              <div data-testid="utilization">{pool.utilization}%</div>
            </div>
          </div>
        </React.Fragment>
      </Link>
      <MobileVaultItem pool={pool} />
    </React.Fragment>
  );
};
