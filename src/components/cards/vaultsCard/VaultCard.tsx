"use client";
import React, { useState } from "react";
import { VaultItem } from "./VaultItem";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import { FilterCard } from "./FilterCard";
import { poolCategories } from "@/utils/constants";

export const VaultCard = ({
  poolStatsList,
}: {
  poolStatsList: IPoolStatsResponse[] | undefined;
}) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [layout, setLayout] = useState<"list" | "grid">("list");

  const matchSearchItem = (item: IPoolStatsResponse, searchKeyword: string) => {
    const normalizedSearchKeyword = searchKeyword?.toLowerCase() || "";

    const matchesAssetName = item.asset.name
      .toLowerCase()
      .includes(normalizedSearchKeyword);

    const matchesAssetSymbol = item.asset.symbol
      .toLowerCase()
      .includes(normalizedSearchKeyword);

    const matchesCollaterals = item.collaterals.some((collateral: IToken) =>
      collateral.symbol.toLowerCase().includes(normalizedSearchKeyword)
    );
    const matchCategories = item.categories.some((category: string) =>
      category.toLowerCase().includes(normalizedSearchKeyword)
    );

    return (
      matchesAssetName ||
      matchesAssetSymbol ||
      matchesCollaterals ||
      matchCategories
    );
  };

  const matchFilterItems = (
    item: IPoolStatsResponse,
    filterKeyword: string
  ) => {
    if (!filterKeyword) return true;

    const normalizedFilterKeyword = filterKeyword.toLowerCase();

    return item.categories.some(
      (category: string) => category.toLowerCase() === normalizedFilterKeyword
    );
  };

  const filteredPoolStatsList = poolStatsList?.filter((item) => {
    const matchesSearch = !query || matchSearchItem(item, query);
    const matchesFilter = !filter || matchFilterItems(item, filter);

    return matchesSearch && matchesFilter;
  });

  const noPoolsFound = filteredPoolStatsList?.length === 0;

  const handleSearch = (keyword: string) => {
    setQuery(keyword);
  };

  const handleFilter = (keyword: string) => {
    setFilter(keyword === filter ? "" : keyword);
  };

  const handleLayout = (keyword: "list" | "grid") => {
    setLayout(keyword);
  };

  return (
    <div data-testid="vault-card">
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
        handleLayout={handleLayout}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        currentFilter={filter}
      />
      <div
        className={`${layout === "list" ? "flex flex-col gap-y-3 md:gap-y-4 w-full" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-4 xl:gap-x-6 gap-y-4 md:gap-y-6"} mt-4 md:mt-4 w-full `}
      >
        {filteredPoolStatsList?.map((item, index) => (
          <div key={index} className="vault-item">
            <VaultItem layout={layout} pool={item} />
          </div>
        ))}
      </div>
      {noPoolsFound && (
        <div className="text-white flex justify-center p-16 w-full pool-card items-center">
          No pools found.
        </div>
      )}
    </div>
  );
};
