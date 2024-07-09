"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import SearchIcon from "@/assets/icon/search-icon.svg";

interface FilterCardProps {
  poolCategories: IPoolCategory[];
  selectedCategory: IPoolCategory;
  setSelectedCategory: Dispatch<SetStateAction<IPoolCategory>>;
  poolStatsList?: IPoolStatsResponse[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  matchFilterItems: (
    item: IPoolStatsResponse,
    filterKeyword: string
  ) => boolean;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  poolCategories,
  selectedCategory,
  setSelectedCategory,
  poolStatsList,
  handleSearch,
  matchFilterItems,
}) => {
  const updateItemCounts = (
    poolStatsList: IPoolStatsResponse[],
    poolCategories: IPoolCategory[]
  ) => {
    // Reset item counts
    poolCategories.forEach((filter) => {
      filter.itemCount = 0;
    });

    // Update item counts
    poolStatsList.forEach((item) => {
      poolCategories.forEach((filter) => {
        if (!filter.keyword || matchFilterItems(item, filter.keyword)) {
          filter.itemCount += 1;
        }
      });
    });
  };

  return (
    <div data-testid="filter-card" className="w-full">
      <div
        className="pool-card rounded-lg p-6 w-full"
        data-testid="route-card-container"
      >
        <div className="relative flex items-center text-white text-2xl pb-4 font-bold border-b border-[#51D5FA30]">
          Lending Pools
        </div>
        <div className="flex pt-6 items-center justify-between">
          <div data-testid="vaults-title" className="flex space-x-4 relative">
            {poolCategories.map((item, i) => {
              const isFilterSelected =
                selectedCategory.keyword === item.keyword;

              if (poolStatsList) {
                updateItemCounts(poolStatsList, poolCategories);
              }

              return (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(item)}
                  className={`relative border ${isFilterSelected ? item.activeClass : "border-white bg-none px-3 py-1 h-9 "} rounded-lg flex items-center space-x-1`}
                >
                  <Image
                    src={isFilterSelected ? item.activeIcon : item.icon}
                    alt={item.label}
                    className="h-4 w-4"
                  />
                  <p className="font-bold text-[10px] uppercase text-white ">
                    {item.label}
                  </p>
                  <div className="bg-[#FFFFFF15] rounded-md text-[#FFFFFF70] text-[10px] py-0.5 px-1.5">
                    {item.itemCount}
                  </div>
                </button>
              );
            })}
          </div>
          <div
            data-testid="search-input"
            className="search-box-bg bg-opacity-10 flex flex-col justify-center items-center gap-4 h-8 sm:h-11 rounded-md border border-[#5B5BBD] focus:border-blue mt-1"
          >
            <div className="relative">
              <input
                type="text"
                className="w-48 sm:w-64 h-full bg-transparent focus:outline-none text-white pl-3 pr-10"
                placeholder="Search"
                onChange={handleSearch}
                onFocus={() => setSelectedCategory(poolCategories[0])}
              />
              <Image
                src={SearchIcon}
                alt="Search Icon"
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
