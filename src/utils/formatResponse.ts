import { IAggregateStats, IPoolStats } from "@/chedda-sdk";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
  parseBigNumberToFloat,
} from "./formatters";
import { IPoolStatsResponse, IToken, ITokenConfig } from "./types";

export const formatPoolStatsList = (
  response: IPoolStats[],
  tokens: ITokenConfig
): IPoolStatsResponse[] => {
  const data = response.map((item: IPoolStats) => {
    const decimals = tokens[item.asset]?.decimals;
    return {
      pool: item.pool,
      asset: tokens[item.asset],
      characterization: item.characterization,
      supplied: parseBigNumberToFloat(item.supplied, decimals),
      suppliedValue: parseBigNumberToFloat(item.suppliedValue),
      borrowed: parseBigNumberToFloat(item.borrowed, decimals),
      borrowedValue: parseBigNumberToFloat(item.borrowedValue),
      baseSupplyAPY: parseBigNumberToFloat(item.baseSupplyAPY),
      maxSupplyAPY: parseBigNumberToFloat(item.maxSupplyAPY),
      baseBorrowAPY: parseBigNumberToFloat(item.baseBorrowAPY),
      maxBorrowAPY: parseBigNumberToFloat(item.maxBorrowAPY),
      utilization: parseBigNumberToFloat(item.utilization),
      feesPaid: parseBigNumberToFloat(item.feesPaid),
      tvl: parseBigNumberToFloat(item.tvl),
      collaterals: mapCollateralsToTokens(item.collaterals, tokens),
    };
  });

  return data;
};

export const formatPoolStats = (
  response: IPoolStats,
  tokens: ITokenConfig
): IPoolStatsResponse => {
  const decimals = tokens[response.asset]?.decimals;
  return {
    pool: response.pool,
    asset: tokens[response.asset],
    characterization: response.characterization,
    supplied: parseBigNumberToFloat(response.supplied, decimals),
    suppliedValue: parseBigNumberToFloat(response.suppliedValue),
    borrowed: parseBigNumberToFloat(response.borrowed, decimals),
    borrowedValue: parseBigNumberToFloat(response.borrowedValue),
    baseSupplyAPY: parseBigNumberToFloat(response.baseSupplyAPY),
    maxSupplyAPY: parseBigNumberToFloat(response.maxSupplyAPY),
    baseBorrowAPY: parseBigNumberToFloat(response.baseBorrowAPY),
    maxBorrowAPY: parseBigNumberToFloat(response.maxBorrowAPY),
    utilization: parseBigNumberToFloat(response.utilization),
    feesPaid: parseBigNumberToFloat(response.feesPaid),
    tvl: parseBigNumberToFloat(response.tvl),
    collaterals: mapCollateralsToTokens(response.collaterals, tokens),
  };
};

const mapCollateralsToTokens = (
  collaterals: string[],
  tokens: ITokenConfig
): IToken[] => {
  return collaterals.map((collateralAddress: string) => {
    const token = tokens[collateralAddress];
    return token || null;
  });
};

export const getMarketInfoData = (aggregateStats?: IAggregateStats) => {
  return [
    {
      title: "Total Supplied",
      value: formatCurrency(
        parseBigNumberToFloat(aggregateStats?.totalSuppliedValue)
      ),
    },
    {
      title: "Total Borrowed",
      value: formatCurrency(
        parseBigNumberToFloat(aggregateStats?.totalBorrowedValue)
      ),
    },
    {
      title: "Total Available",
      value: formatCurrency(
        parseBigNumberToFloat(aggregateStats?.totalAvailableValue)
      ),
    },
    {
      title: "No. Of Vaults",
      value: parseBigNumberToFloat(aggregateStats?.numberOfVaults, 0),
    },
    {
      title: "Total Earned",
      value: formatCurrency(
        parseBigNumberToFloat(aggregateStats?.totalFeesPaid)
      ),
    },
    {
      title: "TVL",
      value: formatCurrency(parseBigNumberToFloat(aggregateStats?.tvl)),
    },
  ];
};

export const getPoolSummaryData = (poolSummary?: IPoolStatsResponse) => {
  return [
    {
      title: "Total Supply",
      value: formatCurrency(poolSummary?.supplied),
    },
    {
      title: "Base Supply APY",
      value: formatAsPercentage(poolSummary?.baseSupplyAPY),
    },
    {
      title: "Total Borrowed",
      value: formatLargeNumber(poolSummary?.borrowed),
    },
    {
      title: "Base Borrow APR",
      value: formatAsPercentage(poolSummary?.baseBorrowAPY),
    },
    {
      title: "MAX Supply APR",
      value: formatAsPercentage(poolSummary?.maxSupplyAPY),
    },
    {
      title: "MAX Borrow APR",
      value: formatAsPercentage(poolSummary?.maxBorrowAPY),
    },
  ];
};
