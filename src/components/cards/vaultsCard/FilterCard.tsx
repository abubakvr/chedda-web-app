"use client";
import React from "react";
import Image from "next/image";
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import SearchIcon from "@/assets/icon/search-icon.svg";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterCardProps {
  poolCategories: IPoolCategory[];
  poolStatsList?: IPoolStatsResponse[];
}

export const FilterCard: React.FC<FilterCardProps> = ({
  poolCategories,
  poolStatsList,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  function searchAction(term: string) {
    let params = new URLSearchParams({ q: term });
    router.replace(`/?${params.toString()}`);
  }

  function filterAction(term: string) {
    let params = new URLSearchParams({ filter: term });
    if (!term) {
      router.replace(`/`);
    } else {
      router.replace(`/?${params.toString()}`);
    }
  }

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
        className="pool-card rounded-lg p-6 w-full"
        data-testid="route-card-container"
      >
        <div className="relative flex items-center text-white text-2xl pb-4 font-bold border-b border-[#51D5FA30]">
          Lending Pools
        </div>
        <div className="flex pt-6 items-center justify-between">
          <div data-testid="vaults-title" className="flex space-x-4 relative">
            {poolCategories.map((item, i) => {
              const isFilterSelected = currentFilter === item.keyword;

              if (poolStatsList) {
                updateItemCounts(poolStatsList, poolCategories);
              }

              return (
                <button
                  key={i}
                  onClick={() => filterAction(item.keyword ?? "")}
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
          <form
            data-testid="search-input"
            className="search-box bg-opacity-10 flex flex-col justify-center items-center gap-4 h-8 sm:h-11 rounded-md border border-[#5B5BBD] focus:border-blue mt-1"
          >
            <div className="relative">
              <input
                name="q"
                type="search"
                className="w-48 sm:w-64 h-full bg-transparent focus:outline-none text-white pl-3 pr-10"
                placeholder="Search"
                onChange={(e) => searchAction(e.target.value)}
              />
              <Image
                src={SearchIcon}
                alt="Search Icon"
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
