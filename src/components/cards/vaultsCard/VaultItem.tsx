import React from "react";
import Image from "next/image";

import InfoIcon from "@/assets/icon/info-icon.svg";

export const VaultItem = ({ pool }: { pool: any }) => {
  return (
    <div className="h-auto w-full py-5 hidden md:grid grid-cols-7 grid-row-bg justify-between text-white hover:opacity-80 cursor-pointer">
      <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-1">
        <div className="flex items-center">
          <Image
            src={pool.asset.logo}
            className="h-8 w-8 "
            alt={pool.asset.symbol}
          />
          <div className="font-bold ml-2 tracking-widest">
            {pool.asset.symbol}
          </div>
        </div>
        <button className="secondary-button uppercase h-6 w-24 mt-3 text-[10px]">
          Defi Vault
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
              />
            </div>
          ))}
        </div>
        <div className=" w-max font-bold grid grid-cols-2 m-0 gap-x-1">
          {pool.collaterals.map((collateral: any, i: number) => (
            <div className="flex justify-start items-start" key={i}>
              {collateral.symbol}
              {i !== pool.collaterals.length - 1 && <span>,</span>}
            </div>
          ))}
        </div>
      </div>
      {pool && (
        <React.Fragment>
          <div className="flex justify-center items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
              <div>{pool.supplied / 100000000000} M USDC</div>
              <div className="opacity-50">
                ${pool.suppliedValue / 100000000} M
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
              <div className="">{pool.maxSupplyAPY / 10000000000000000}%</div>
              <Image src={InfoIcon} alt="Info Icon" />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="text-sm flex flex-col font-semibold md:col-span-1 w-[100px]">
              <div className="">{pool.borrowed / 100000000000} USDC</div>
              <div className="opacity-50">
                ${pool.borrowedValue / 100000000000} M
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-sm flex items-center space-x-2 font-semibold md:col-span-1 w-[100px]">
              <div className="">{pool.maxBorrowAPY / 10000000000000000}%</div>
              <Image src={InfoIcon} alt="Info Icon" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-sm flex flex-col justify-center font-semibold md:col-span-1 w-[100px]">
              <div className="">{pool.utilization / 100000000000}%</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
