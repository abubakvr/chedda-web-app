import { IAggregateStats, IPoolStats } from "@/chedda-sdk";
import { parseBigNumberToFloat } from "./formatters";
import { IPoolStatsResponse, IToken, ITokenConfig } from "./types";

export const formatPoolStats = (
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
      value: parseBigNumberToFloat(aggregateStats?.totalSuppliedValue),
    },
    {
      title: "Total Borrowed",
      value: parseBigNumberToFloat(aggregateStats?.totalBorrowedValue),
    },
    {
      title: "Total Available",
      value: parseBigNumberToFloat(aggregateStats?.totalAvailableValue),
    },
    {
      title: "No. Of Vaults",
      value: parseBigNumberToFloat(aggregateStats?.numberOfVaults, 0),
    },
    {
      title: "Total Earned",
      value: parseBigNumberToFloat(aggregateStats?.totalFeesPaid),
    },
    {
      title: "TVL",
      value: parseBigNumberToFloat(aggregateStats?.tvl),
    },
  ];
};
