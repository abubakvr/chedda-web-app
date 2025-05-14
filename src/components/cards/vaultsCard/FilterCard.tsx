"use client";
import React from "react";
import Image from "next/image";
import { IPoolCategory, IPoolStatsResponse } from "@/utils/types";
import SearchIcon from "@/assets/icon/search-icon.svg";
import ListIcon from "@/assets/svg/list-icon.svg";
import GridIcon from "@/assets/svg/grid-icon.svg";

interface FilterCardProps {
  poolCategories: IPoolCategory[];
  poolStatsList?: IPoolStatsResponse[];
  handleSearch: (term: string) => void;
  handleFilter: (term: "pools" | "assets") => void;
  handleLayout: (term: "list" | "grid") => void;
  currentFilter: string | undefined;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  poolCategories,
  poolStatsList,
  handleSearch,
  handleLayout,
  handleFilter,
  currentFilter,
}) => {
  const [activeToggle, setActiveToggle] = React.useState<"pools" | "assets">(
    "pools"
  );
  const [activeLayoutToggle, setActiveLayoutToggle] = React.useState<
    "list" | "grid"
  >("list");

  const handleToggleClick = (option: "pools" | "assets") => {
    setActiveToggle(option);
    handleFilter(option);
  };

  const handleLayoutToggleClick = (option: "list" | "grid") => {
    setActiveLayoutToggle(option);
    handleLayout(option);
  };

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
      <div className="rounded-lg w-full" data-testid="route-card-container">
        <div className="md:flex mt-2 md:mt-4 xl:mt-4 items-center justify-between w-full">
          {/* <div className="flex space-x-2 md:space-x-2 lg:space-x-3 relative items-center overflow-auto w-full md:w-fit px-4 md:px-2 no-scrollbar md:border  md:border-frost md:bg-glass rounded-lg p-2 transition-all duration-400">
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
                  className={`relative border ${isFilterSelected ? item.activeClass : `${item.hoverClass} border-white bg-none py-1 h-7 md:h-8 lg:h-9 transition-all duration-500`} px-4 md:px-4 lg:px-3 rounded-lg flex items-center justify-center space-x-1 ${item.hoverClass}`}
                >
                  <Image
                    style={{ color: "" }}
                    src={isFilterSelected ? item.activeIcon : item.icon}
                    alt={item.label}
                    className="h-3 w-3 md:h-4 md:w-4"
                  />
                  <p className="font-bold text-3xs lg:text-2xs uppercase text-white ">
                    {item.label}
                  </p>
                  <div className="bg-[#FFFFFF15] rounded-md text-mist text-3xs md:text-2xs py-0.5 px-1.5">
                    {item.itemCount}
                  </div>
                </button>
              );
            })}
          </div> */}
          <div className="flex space-x-6">
            <div className="pool-card flex space-x-2 md:space-x-2 lg:space-x-3 relative items-center overflow-auto w-fit md:w-fit px-1.5 md:px-2 no-scrollbar rounded-lg p-2 transition-all duration-400">
              <button
                onClick={() => handleLayoutToggleClick("list")}
                className={`w-20 lg:w-28 flex space-x-1 relative px-4 py-1.5 lg:py-2.5 rounded-sm text-xs lg:text-sm justify-center font-medium transition-colors text-white
                ${
                  activeLayoutToggle === "list"
                    ? "bg-[#9894F929]"
                    : "hover:bg-[#9894F929]"
                }`}
              >
                <div className="flex items-center space-x-1 ">
                  <Image
                    src={ListIcon}
                    alt="list icon"
                    className="w-4 h-4 md:w-[18px] md:h-[18px]"
                  />
                  <span>List</span>
                </div>
              </button>
              <button
                onClick={() => handleLayoutToggleClick("grid")}
                className={`w-20 lg:w-28 flex relative px-4 py-2 lg:py-2.5 rounded-sm text-xs lg:text-sm justify-center items-center font-medium transition-colors text-white
                ${
                  activeLayoutToggle === "grid"
                    ? "bg-[#9894F929]"
                    : "hover:bg-[#9894F929]"
                }`}
              >
                <div className="flex items-center space-x-1 ">
                  <Image
                    src={GridIcon}
                    alt="grid icon"
                    className="w-4 h-4 md:w-[18px] md:h-[18px]"
                  />
                  <span>Grid</span>
                </div>
              </button>
            </div>
          </div>

          <div className="xl:px-0 mt-2 md:mt-0">
            <form
              data-testid="search-input"
              className="pool-card bg-opacity-10 flex flex-col justify-center items-center gap-x-4 h-9 md:h-12 lg:h-12 rounded-sm md:rounded-md border-[#FFFFFF14] focus:border-blue"
            >
              <div className="relative w-full">
                <input
                  name="query"
                  type="search"
                  className="min-w-52 md:w-58 lg:w-72 h-full bg-transparent focus:outline-none text-2xs md:text-lg text-white pl-3 md:pl-3 md:pr-12 flex items-center"
                  placeholder="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Image
                  style={{ color: "" }}
                  src={SearchIcon}
                  alt="Search Icon"
                  className="w-4 h-4 lg:w-5 lg:h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
