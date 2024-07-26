import React from "react";
import { VaultItem } from "./VaultItem";
import { IPoolStatsResponse, IToken } from "@/utils/types";
import { FilterCard } from "./FilterCard";
import { poolCategories } from "@/utils/constants";

export const VaultCard = ({
  poolStatsList,
  query,
  filter,
}: {
  poolStatsList: IPoolStatsResponse[] | undefined;
  query: string;
  filter: string;
}) => {
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
    if (!query && !filter) {
      return true;
    }
    const matchesSearch = query && matchSearchItem(item, query);
    const matchesFilter = filter && matchFilterItems(item, filter);
    return matchesSearch || matchesFilter;
  });

  const noPoolsFound = filteredPoolStatsList?.length === 0;

  return (
    <div data-testid="vault-card">
      <FilterCard
        poolCategories={poolCategories}
        poolStatsList={poolStatsList}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-6 w-full gap-x-6 lg:gap-x-4 xl:gap-x-6 gap-y-4 md:gap-y-6">
        {filteredPoolStatsList?.map((item, index) => (
          <div key={index} className="vault-item transition-all">
            <VaultItem pool={item} />
          </div>
        ))}
      </div>
      {(query || filter) && noPoolsFound && (
        <div className="text-white flex justify-center p-16 w-full pool-card items-center">
          No pools found.
        </div>
      )}
    </div>
  );
};
