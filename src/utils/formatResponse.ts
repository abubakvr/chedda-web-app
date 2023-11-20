import { IAggregateStats, IPoolStats } from "chedda-sdk";
import { BigNumber } from "ethers";
import { formatToValue, parseBigNumberToFloat } from "./formatters";
import { IPoolStatsResponse, IToken, ITokenConfig } from "./types";

export const formatPoolStats = (
  response: IPoolStats[],
  tokens: ITokenConfig
): IPoolStatsResponse[] => {
  return response.map((item: IPoolStats) => ({
    pool: item.pool,
    asset: tokens[item.asset],
    characterization: item.characterization,
    supplied: parseBigNumberToFloat(item.supplied),
    suppliedValue: parseBigNumberToFloat(item.suppliedValue),
    borrowed: parseBigNumberToFloat(item.borrowed),
    borrowedValue: parseBigNumberToFloat(item.borrowedValue),
    baseSupplyAPY: parseBigNumberToFloat(item.baseSupplyAPY),
    maxSupplyAPY: parseBigNumberToFloat(item.maxSupplyAPY),
    baseBorrowAPY: parseBigNumberToFloat(item.baseBorrowAPY),
    maxBorrowAPY: parseBigNumberToFloat(item.maxBorrowAPY),
    utilization: parseBigNumberToFloat(item.utilization),
    feesPaid: parseBigNumberToFloat(item.feesPaid),
    tvl: parseBigNumberToFloat(item.tvl),
    collaterals: mapCollateralsToTokens(item.collaterals, tokens),
  }));
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
      value: parseBigNumber(aggregateStats?.totalSuppliedValue),
    },
    {
      title: "Total Borrowed",
      value: parseBigNumber(aggregateStats?.totalBorrowedValue),
    },
    {
      title: "Total Available",
      value: parseBigNumber(aggregateStats?.totalAvailableValue),
    },
    {
      title: "No. Of Vaults",
      value: parseEther(aggregateStats?.numberOfVaults),
    },
    {
      title: "Total Earned",
      value: parseBigNumber(aggregateStats?.totalFeesPaid),
    },
    {
      title: "TVL",
      value: parseBigNumber(aggregateStats?.tvl),
    },
  ];
};

const parseBigNumber = (bigNumberValue?: BigNumber) => {
  if (bigNumberValue instanceof BigNumber) {
    return parseBigNumberToFloat(bigNumberValue);
  }
};

const parseEther = (bigNumberValue?: BigNumber) => {
  if (bigNumberValue instanceof BigNumber) {
    return formatToValue(bigNumberValue);
  }
};
