import Image from "next/image";
import React from "react";

export const MobileVaultItem = ({ pool }: { pool: any }) => {
  return (
    <div
      onClick={() => {}}
      className="h-auto w-full rounded-lg mt-2 px-8 py-5 vaults-card text-white hover:opacity-80 cursor-pointer md:hidden"
    >
      {/* First row */}
      <div className="flex justify-between">
        <div>
          <div className="flex justify-center text-lg opacity-70">Asset</div>
          <div className="flex flex-col items-center mt-2">
            <Image
              src={pool.asset.logo}
              className="h-8 w-8"
              alt={pool.asset.symbol}
            />
            <div className="font-bold mt-2 text-sm">{pool.asset.symbol}</div>
          </div>
        </div>
        <div className={`flex flex-col justify-start items-end `}>
          <div className="text-lg opacity-70">Collateral</div>
          <div className="flex mr-4 mt-2">
            {pool.collaterals.map((collateral: any, i: number) => (
              <div key={i} className="logo-cascade round-image">
                <Image
                  src={collateral.logo}
                  className="h-8 w-8 round-image"
                  alt={collateral.symbol}
                />
              </div>
            ))}
          </div>
          <div
            className={`w-max font-bold ${
              pool.collaterals.length > 1 && "grid"
            } grid-cols-2 mt-2 text-sm gap-x-1 justify-end items-end`}
          >
            {pool.collaterals.map((collateral: any, i: number) => (
              <div className="flex justify-end items-end" key={i}>
                {collateral.symbol}
                {i !== pool.collaterals.length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Second row */}
      <div className="flex justify-between mt-4 border-t pt-4 border-gray-500 border-opacity-20">
        {pool.stats && (
          <div>
            <div className="flex text-lg opacity-70">Total Supply</div>
            <div className="text-sm flex justify-start font-bold col-span-2">
              {pool.stats.totalSupply.toFixed(2)}%
            </div>
          </div>
        )}
        {pool.stats && (
          <div>
            <div className="flex justify-center text-lg opacity-70">
              Supply APY
            </div>
            <div className="text-sm flex justify-end font-bold col-span-2">
              {pool.stats.supplyApy.toFixed(2)}
            </div>
          </div>
        )}
      </div>
      {/* Third row */}
      <div className="flex justify-between mt-4 border-t pt-4 border-gray-500  border-opacity-20">
        {pool.stats && (
          <div>
            <div className="flex justify-center text-lg opacity-70">
              Total Borrow
            </div>
            <div className="text-sm flex justify-start font-bold col-span-2">
              {pool.stats.totalBorrow.toFixed(2)}%
            </div>
          </div>
        )}
        {pool.stats && (
          <div>
            <div className="flex justify-center text-lg opacity-70">
              Borrow APY
            </div>
            <div className="text-sm flex justify-end font-bold col-span-2">
              {pool.stats.borrowApy.toFixed(2)}
            </div>
          </div>
        )}
      </div>
      {/* Fourth row */}
      {pool.stats && (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex flex-col justify-center gap-2 text-lg opacity-70">
            Utilization
          </div>
          <div className="text-sm flex justify-center font-bold col-span-2">
            {pool.stats.utilization.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};
