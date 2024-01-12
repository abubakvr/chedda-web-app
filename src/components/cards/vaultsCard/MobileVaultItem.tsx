import { IPoolStatsResponse, IToken } from "@/utils/types";
import Image from "next/image";
import React from "react";

export const MobileVaultItem = ({ pool }: { pool: IPoolStatsResponse }) => {
  return (
    <div
      onClick={() => {}}
      data-testid="mobile-vault-item"
      className="h-auto w-full rounded-lg mt-2 px-8 py-5 card-bg text-white hover:opacity-80 cursor-pointer md:hidden"
    >
      {/* First row */}
      <div className="flex justify-between">
        <div>
          <div
            className="flex justify-center text-lg opacity-70"
            data-testid="asset-label"
          >
            Asset
          </div>
          <div className="flex flex-col items-center mt-2">
            <Image
              src={pool.asset?.logo}
              className="h-8 w-8"
              alt={pool.asset?.symbol}
              data-testid="mobile-asset-logo"
            />
            <div
              className="font-bold mt-2 text-sm"
              data-testid="mobile-asset-symbol"
            >
              {pool.asset?.symbol}
            </div>
          </div>
        </div>
        <div className={`flex flex-col justify-start items-end `}>
          <div className="text-lg opacity-70" data-testid="collateral-label">
            Collateral
          </div>
          <div className="flex mr-4 mt-2">
            {pool.collaterals?.map((collateral: IToken, i: number) => (
              <div key={i} className="logo-cascade round-image">
                <Image
                  src={collateral.logo}
                  className="h-8 w-8 round-image"
                  alt={collateral.symbol}
                  data-testid={`collateral-logo-${i}`}
                />
              </div>
            ))}
          </div>
          <div
            className={`w-max font-bold ${
              pool.collaterals?.length > 1 && "grid"
            } grid-cols-2 mt-2 text-sm gap-x-1 justify-end items-end`}
            data-testid="mobile-collateral-symbols"
          >
            {pool.collaterals?.map((collateral: IToken, i: number) => (
              <div className="flex justify-end items-end" key={i}>
                {collateral.symbol}
                {i !== pool.collaterals?.length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Second row */}
      <div className="flex justify-between mt-4 border-t pt-4 border-gray-500 border-opacity-20">
        <div>
          <div
            className="flex text-lg opacity-70"
            data-testid="total-supply-label"
          >
            Total Supply
          </div>
          <div
            className="text-sm flex justify-start font-bold col-span-2"
            data-testid="mobile-total-supply-apy"
          >
            {pool.maxSupplyAPY}%
          </div>
        </div>
        <div>
          <div
            className="flex justify-center text-lg opacity-70"
            data-testid="supply-apy-label"
          >
            Supply APY
          </div>
          <div
            className="text-sm flex justify-end font-bold col-span-2"
            data-testid="mobile-supply-apy"
          >
            {pool.supplied}
          </div>
        </div>
      </div>
      {/* Third row */}
      <div className="flex justify-between mt-4 border-t pt-4 border-gray-500  border-opacity-20">
        <div>
          <div
            className="flex justify-center text-lg opacity-70"
            data-testid="mobile-total-borrow-label"
          >
            Total Borrow
          </div>
          <div
            className="text-sm flex justify-start font-bold col-span-2"
            data-testid="mobile-total-borrow-apy"
          >
            {pool.maxBorrowAPY}%
          </div>
        </div>
        <div>
          <div
            className="flex justify-center text-lg opacity-70"
            data-testid="borrow-apy-label"
          >
            Borrow APY
          </div>
          <div
            className="text-sm flex justify-end font-bold col-span-2"
            data-testid="borrow-apy"
          >
            {pool.borrowed}
          </div>
        </div>
      </div>
      {/* Fourth row */}
      <div className="flex flex-col items-center justify-center mt-4">
        <div
          className="flex flex-col justify-center gap-2 text-lg opacity-70"
          data-testid="utilization-label"
        >
          Utilization
        </div>
        <div
          className="text-sm flex justify-center font-bold col-span-2"
          data-testid="mobile-utilization"
        >
          {pool.utilization}%
        </div>
      </div>
    </div>
  );
};
