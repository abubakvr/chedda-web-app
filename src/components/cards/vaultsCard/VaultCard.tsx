import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { VaultItem } from "./VaultItem";
import { usePoolStatsList } from "@/hooks";
import { VaultSkeleton } from "@/components/ui";
import { vaultHeaderItems } from "@/utils/constants";
import { IPoolStatsResponse, IToken } from "@/utils/types";

export const VaultCard = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const { data: poolStatsList, isLoading } = usePoolStatsList();

  const matchSearchItem = (item: IPoolStatsResponse, searchKeyword: string) => {
    const matchesAssetName = item.asset.name
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const matchesAssetSymbol = item.asset.symbol
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const matchesCollaterals = item.collaterals.some((collateral: IToken) =>
      collateral.symbol.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return matchesAssetName || matchesAssetSymbol || matchesCollaterals;
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchKeyword(e.target.value);

  return (
    <div className="card-bg rounded-lg">
      <div data-testid="vault-card" className="w-full p-3 pb-0 sm:p-7 sm:pb-0">
        <div className="flex justify-between">
          <div
            data-testid="vaults-title"
            className="text-white font-open-sans text-xl sm:text-2xl xl:text-3xl font-bold leading-9 tracking-wider flex flex-col justify-center items-cente"
          >
            Lending Pools
          </div>
          <div
            data-testid="search-input"
            className="flex flex-col justify-center items-center gap-4 h-8 sm:h-11 rounded-md border border-white border-opacity-50 bg-transparent focus:border-blue mt-1"
          >
            <div className="relative">
              <input
                type="text"
                className="w-48 sm:w-64 h-full bg-transparent focus:outline-none  text-white pl-3 pr-10"
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
        <div className="mt-2 pb-4 sm:mt-10 hidden md:grid grid-cols-7 border-b border-gray-500 border-opacity-20">
          {vaultHeaderItems.map((item: string, index: number) => (
            <div
              key={index}
              className={`flex  ${
                index < 2 ? "justify-start" : "justify-end"
              } ${index === 2 && "justify-center"} `}
            >
              <div
                className={`text-white ${
                  index < 2 ? "w-max" : "w-[100px]"
                }  col-span-1 opacity-50 flex font-open-sans text-xs font-semibold leading-6 tracking-wide`}
                data-testid={`vault-header-item-${index}`}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {!isLoading &&
          poolStatsList?.map((item: IPoolStatsResponse, index: number) => (
            <div key={index}>
              <div className="vault-item">
                {searchKeyword && matchSearchItem(item, searchKeyword) && (
                  <VaultItem pool={item} />
                )}
                {!searchKeyword && <VaultItem pool={item} />}
              </div>
              <div
                className={
                  index !== poolStatsList.length - 1
                    ? "w-5/4 mx-7 border-b border-gray-500 border-opacity-20"
                    : ""
                }
              />
            </div>
          ))}
        {isLoading && (
          <VaultSkeleton itemCount={4} data-testid="loading-skeleton" />
        )}
      </div>
    </div>
  );
};
