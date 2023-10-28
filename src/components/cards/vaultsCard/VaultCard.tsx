"use client";
import React from "react";
import Image from "next/image";
import SearchIcon from "@/assets/icon/search-icon.svg";

import { samplePools } from "@/data/samplePool";
import { VaultItem } from "./VaultItem";
import { MobileVaultItem } from "./MobileVaultItem";

const vaultHeaderItems = [
  "Asset",
  "Collateral",
  "Total Supply",
  "Supply APY",
  "Total Borrow",
  "Borrow APY",
  "Utilization",
];

export const VaultCard = () => {
  return (
    <div className="rounded-lg vaults-card w-full p-3 sm:p-7">
      <div className="flex justify-between pb-3 sm:pb-5">
        <div className="text-white font-open-sans text-xl sm:text-2xl xl:text-3xl font-semibold leading-9 tracking-wider">
          Vaults
        </div>
        <div className="flex flex-col justify-center items-center gap-4 h-8 sm:h-11 rounded-md border bg-transparent focus:border-blue border-opacity-70 mt-1">
          <div className="relative">
            <input
              type="text"
              className="w-48 sm:w-72 h-full bg-transparent focus:outline-none border border-none border-white focus:border-blue-500 border-opacity-70 text-white pl-3 pr-10"
              placeholder="Search"
            />
            <Image
              src={SearchIcon}
              alt="Search Icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 sm:mt-5 hidden md:grid grid-cols-7 ">
        {vaultHeaderItems.map((item: string, index: number) => (
          <div
            key={index}
            className={`flex  ${index < 2 ? "justify-start" : "justify-end"} ${
              index === 2 && "justify-center"
            } `}
          >
            <div
              className={`text-white ${
                index < 2 ? "w-max" : "w-[100px]"
              }  col-span-1 opacity-50 flex font-open-sans text-xs font-semibold leading-6 tracking-wide`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
      <div>
        {samplePools.map((item: any, index: number) => (
          <div
            key={index}
            className={`vault-item ${
              index !== samplePools.length - 1
                ? "border-b border-gray-500 border-opacity-20"
                : ""
            }`}
          >
            <VaultItem pool={item} />
            <MobileVaultItem pool={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
