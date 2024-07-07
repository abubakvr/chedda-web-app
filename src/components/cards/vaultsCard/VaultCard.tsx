import React, { ChangeEvent, useState } from "react";
import { VaultItem } from "./VaultItem";
import { usePoolStatsList } from "@/hooks";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import { poolCategories } from "@/utils/constants";
import { FilterCard } from "./FilterCard";
import { VaultBoxSkeleton } from "@/components/ui/skeleton/VaultBoxSkeleton";

export const VaultCard = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState(poolCategories[0]);
  const { data: poolStatsList, isLoading } = usePoolStatsList();

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
    const matchCategories = item.categories.some((categories: string) =>
      categories.toLowerCase().includes(normalizedSearchKeyword)
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
    const normalizedFilterKeyword = filterKeyword?.toLowerCase() || "";

    const matchCategories = item.categories.some((categories: string) =>
      categories.toLowerCase().includes(normalizedFilterKeyword)
    );

    return matchCategories;
  };

  const filteredPoolStatsList = poolStatsList?.filter((item) => {
    if (!searchKeyword && !selectedCategory.keyword) {
      return true;
    }
    const matchesSearch = searchKeyword && matchSearchItem(item, searchKeyword);
    const matchesFilter =
      selectedCategory.keyword &&
      matchFilterItems(item, selectedCategory.keyword);
    return matchesSearch || matchesFilter;
  });

  const noPoolsFound = filteredPoolStatsList?.length === 0;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div data-testid="vault-card">
      <FilterCard
        poolCategories={poolCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        poolStatsList={poolStatsList}
        handleSearch={handleSearch}
        matchFilterItems={matchFilterItems}
      />
      <div className="grid grid-cols-3 mt-6 w-full gap-x-6">
        {!isLoading &&
          filteredPoolStatsList?.map((item, index) => (
            <div key={index} className="vault-item transition-all">
              <VaultItem pool={item} />
            </div>
          ))}
      </div>
      {isLoading && (
        <VaultBoxSkeleton itemCount={3} data-testid="loading-skeleton" />
      )}
      {!isLoading &&
        (searchKeyword || selectedCategory.keyword) &&
        noPoolsFound && (
          <div className="text-white flex justify-center p-16 w-full pool-card items-center">
            No pools found.
          </div>
        )}
    </div>
  );
};
