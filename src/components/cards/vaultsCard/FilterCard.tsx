"use client";
import React from "react";
import Image from "next/image";
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import SearchIcon from "@/assets/icon/search-icon.svg";

interface FilterCardProps {
  poolCategories: IPoolCategory[];
  poolStatsList?: IPoolStatsResponse[];
  handleSearch: (term: string) => void;
  handleFilter: (term: string) => void;
  currentFilter: string | undefined;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  poolCategories,
  poolStatsList,
  handleSearch,
  handleFilter,
  currentFilter,
}) => {
  const matchFilterItems = (
    item: IPoolStatsResponse,
    filterKeyword: string
  ) => {
    const normalizedFilterKeyword = filterKeyword?.toLowerCase() || "";

    const matchCategories = item.categories.some((categories: string) =>
      categories.toLowerCase().includes(normalizedFilterKeyword)
    );

    return matchCategories;
  };

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
        className="pool-card rounded-lg w-full"
        data-testid="route-card-container"
      >
        <div
          data-testid="vaults-title"
          className="relative items-center text-white text-sm md:text-lg lg:text-2xl p-4 pb-0 xl:px-8 xl:pt-8 font-bold"
        >
          Lending Pools
          <div className="mt-2 md:mt-4 w-full border-b border-[#51D5FA30]"></div>
        </div>
        <div className="md:flex mt-2 md:mt-4 xl:mt-6 items-center justify-between w-full md:pb-4 md:px-4 xl:px-8">
          <div className="flex space-x-2 md:space-x-2 lg:space-x-3 relative items-center overflow-auto w-full md:w-fit px-4 md:px-2 no-scrollbar md:border  md:border-[#ffffff19] md:bg-[#ffffff02] rounded-lg p-2">
            {poolCategories.map((item, i) => {
              const isFilterSelected = currentFilter === item.keyword;

              if (poolStatsList) {
                updateItemCounts(poolStatsList, poolCategories);
              }

              return (
                <button
                  key={i}
                  onClick={() => handleFilter(item.keyword ?? "")}
                  data-testid={`button-${i}`}
                  className={`relative border ${isFilterSelected ? item.activeClass : `${item.hoverClass} border-white bg-none py-1 h-7 md:h-8 lg:h-9 transition-all`} px-4 md:px-4 lg:px-3 rounded-lg flex items-center justify-center space-x-1 ${item.hoverClass}`}
                >
                  <Image
                    src={isFilterSelected ? item.activeIcon : item.icon}
                    alt={item.label}
                    className="h-3 w-3 md:h-4 md:w-4"
                  />
                  <p className="font-bold text-[8px] lg:text-[10px] uppercase text-white ">
                    {item.label}
                  </p>
                  <div className="bg-[#FFFFFF15] rounded-md text-[#FFFFFF70] text-[8px] md:text-[10px] py-0.5 px-1.5">
                    {item.itemCount}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="p-4 md:p-0 md:px-6 xl:px-0 pt-2 md:pt-0">
            <form
              data-testid="search-input"
              className="search-box bg-opacity-10 flex flex-col justify-center items-center gap-x-4 h-8 md:h-9 lg:h-11 rounded-md border border-[#5B5BBD] focus:border-blue lg:mt-1"
            >
              <div className="relative w-full ">
                <input
                  name="query"
                  type="search"
                  className="w-full md:w-48 lg:w-64 h-full bg-transparent focus:outline-none text-[10px] md:text-lg text-white pl-2 md:pl-3 md:pr-10 flex items-center"
                  placeholder="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Image
                  src={SearchIcon}
                  alt="Search Icon"
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
