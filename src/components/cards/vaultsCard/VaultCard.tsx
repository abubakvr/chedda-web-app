"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { VaultItem } from "./VaultItem";
import { usePools } from "@/hooks/usePools";
import { LoadingSkeleton } from "@/components/ui/skeleton/LoadingSkeleton";
import { MobileVaultItem } from "./MobileVaultItem";
import { vaultHeaderItems } from "@/utils/constants";

export const VaultCard = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { poolStats, loading } = usePools();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyword(e.target.value);

  return (
    <div className="rounded-lg vaults-card w-full p-3 sm:p-7">
      <div className="flex justify-between pb-3 sm:pb-5">
        <div className="text-white font-open-sans text-xl sm:text-2xl xl:text-3xl font-semibold leading-9 tracking-wider">
          Vaults
        </div>
        <div className="flex flex-col justify-center items-center gap-4 h-8 sm:h-11 rounded-md border border-white border-opacity-60 bg-transparent focus:border-blue mt-1">
          <div className="relative">
            <input
              type="text"
              className="w-48 sm:w-72 h-full bg-transparent focus:outline-none  text-white pl-3 pr-10"
              placeholder="Search"
              onChange={handleSearch}
            />
            <Image
              src={SearchIcon}
              alt="Search Icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-60"
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
        {!loading &&
          poolStats &&
          poolStats?.map((item: any, index: number) => (
            <div
              key={index}
              className={`vault-item ${
                index !== poolStats.length - 1
                  ? "border-b border-gray-500 border-opacity-20"
                  : ""
              }`}
            >
              {searchKeyword &&
              item.asset.name
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ? (
                <VaultItem pool={item} />
              ) : (
                ""
              )}
              {!searchKeyword && <VaultItem pool={item} />}
              {poolStats && <MobileVaultItem pool={item} />}
            </div>
          ))}
        {loading && <LoadingSkeleton itemCount={4} />}
      </div>
    </div>
  );
};
