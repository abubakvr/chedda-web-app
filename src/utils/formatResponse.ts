import { currentEnvironment } from "@/data/environments";
import {
  IPosition,
  IPoolStats,
  IMarketInfo,
  IAggregateStats,
  IAccountCollateralDeposited,
} from "chedda-sdk";
import { poolFilters } from "./constants";
import {
  formatCurrency,
  formatLargeNumber,
  formatAsPercentage,
  parseBigNumberToFloat,
} from "./formatters";
import {
  IToken,
  ITokenConfig,
  ISummaryStats,
  ICollateralInfo,
  IPositionResponse,
  IPoolStatsResponse,
  IFormattedCollateral,
} from "./types";

export const formatPoolStatsList = (
  response: IPoolStats[],
  tokens: ITokenConfig
): IPoolStatsResponse[] => {
  const data = response.map((item: IPoolStats) => {
    const decimals = tokens[item.asset]?.decimals;
    const categories = poolFilters[item.pool].categories;
    return {
      pool: item.pool,
      asset: tokens[item.asset],
      characterization: item.characterization,
      supplied: parseBigNumberToFloat(item.supplied, decimals),
      suppliedValue: parseBigNumberToFloat(item.suppliedValue),
      borrowed: parseBigNumberToFloat(item.borrowed, decimals),
      borrowedValue: parseBigNumberToFloat(item.borrowedValue),
      baseSupplyAPY: parseBigNumberToFloat(item.baseSupplyAPY, 18, 10),
      maxSupplyAPY: parseBigNumberToFloat(item.maxSupplyAPY, 18, 10),
      baseBorrowAPY: parseBigNumberToFloat(item.baseBorrowAPY, 18, 10),
      maxBorrowAPY: parseBigNumberToFloat(item.maxBorrowAPY, 18, 10),
      utilization: parseBigNumberToFloat(item.utilization, 18, 10),
      rewardsAPY: parseBigNumberToFloat(item.rewardsAPY, 18, 10),
      feesPaid: parseBigNumberToFloat(item.feesPaid),
      tvl: parseBigNumberToFloat(item.tvl),
      collaterals: mapCollateralsToTokens(item.collaterals, tokens),
      categories,
    };
  });

  return data;
};

export const formatPoolStats = (
  response: IPoolStats,
  tokens: ITokenConfig
): IPoolStatsResponse => {
  const decimals = tokens[response.asset]?.decimals;
  const categories = poolFilters[response.pool].categories;
  return {
    pool: response.pool,
    asset: tokens[response.asset],
    characterization: response.characterization,
    supplied: parseBigNumberToFloat(response.supplied, decimals),
    suppliedValue: parseBigNumberToFloat(response.suppliedValue),
    borrowed: parseBigNumberToFloat(response.borrowed, decimals),
    borrowedValue: parseBigNumberToFloat(response.borrowedValue),
    baseSupplyAPY: parseBigNumberToFloat(response.baseSupplyAPY, 18, 10),
    maxSupplyAPY: parseBigNumberToFloat(response.maxSupplyAPY, 18, 10),
    baseBorrowAPY: parseBigNumberToFloat(response.baseBorrowAPY, 18, 10),
    maxBorrowAPY: parseBigNumberToFloat(response.maxBorrowAPY, 18, 10),
    utilization: parseBigNumberToFloat(response.utilization, 18, 10),
    rewardsAPY: parseBigNumberToFloat(response.rewardsAPY, 18, 10),
    feesPaid: parseBigNumberToFloat(response.feesPaid),
    tvl: parseBigNumberToFloat(response.tvl),
    collaterals: mapCollateralsToTokens(response.collaterals, tokens),
    categories,
  };
};

export const mapCollateralsToTokens = (
  collaterals: string[],
  tokens: ITokenConfig
): IToken[] => {
  return collaterals.map((collateralAddress: string) => {
    const token = tokens[collateralAddress];
    return token || null;
  });
};

export const getAggregateInfo = (
  aggregateStats?: IAggregateStats
): ISummaryStats[] => {
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
      title: "No. Of Pools",
      value: parseBigNumberToFloat(aggregateStats?.numberOfVaults, 0, 0),
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

export const getPoolSummaryData = (
  poolSummary?: IPoolStatsResponse
): ISummaryStats[] => {
  return [
    {
      title: "Total Supply",
      value: formatLargeNumber(poolSummary?.supplied),
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

export const formatCollateralInfo = (
  collateralInfo: ICollateralInfo[] | undefined,
  tokens: ITokenConfig,
  collateralDeposited: IAccountCollateralDeposited[] | undefined
): IFormattedCollateral[] | undefined => {
  const data = collateralInfo?.map((item) => {
    const myCollateral = collateralDeposited?.find(
      (collateral) => collateral.token === item.collateral
    );
    return {
      asset: tokens[item.collateral],
      decimals: item.decimals,
      value: parseBigNumberToFloat(item.value),
      amountDeposited: formatLargeNumber(
        parseBigNumberToFloat(item.amountDeposited, item.decimals)
      ),
      myCollateralValue: formatCurrency(
        parseBigNumberToFloat(myCollateral?.value)
      ),
      myCollateralAmount: formatLargeNumber(
        parseBigNumberToFloat(myCollateral?.amount, myCollateral?.decimals)
      ),
      collateralFactor: formatAsPercentage(
        parseBigNumberToFloat(item.ltv, 18, 10)
      ),
    };
  });

  return data;
};

export const calculateAssetPrice = (
  marketInfo: IMarketInfo | undefined
): number => {
  const oraclePriceDecimals = parseBigNumberToFloat(
    marketInfo?.oraclePriceDecimals,
    0,
    10
  );

  const oraclePrice = parseBigNumberToFloat(
    marketInfo?.oraclePrice,
    oraclePriceDecimals,
    10
  );

  return oraclePrice;
};

export const formatPositionsList = (
  response: IPosition[]
): IPositionResponse[] => {
  const data = response.map((item: IPosition) => {
    const tokens = currentEnvironment.tokens;
    const decimals = item.decimals;
    return {
      account: item.account,
      pool: item.pool,
      asset: tokens[item.asset],
      decimals: item.decimals,
      supplied: parseBigNumberToFloat(item.supplied, decimals),
      suppliedValue: parseBigNumberToFloat(item.suppliedValue),
      borrowed: parseBigNumberToFloat(item.borrowed, decimals),
      borrowedValue: parseBigNumberToFloat(item.borrowedValue),
      collateralValue: parseBigNumberToFloat(item.collateralValue, 18, 10),
      healthFactor: parseBigNumberToFloat(item.healthFactor, 18, 10),
      staked: parseBigNumberToFloat(item.staked, decimals, 10),
      locked: parseBigNumberToFloat(item.locked, 18, 10),
      stakeRewardsClaimable: parseBigNumberToFloat(
        item.stakeRewardsClaimable,
        18,
        10
      ),
      lockRewardsClaimable: parseBigNumberToFloat(
        item.lockRewardsClaimable,
        18,
        10
      ),
      exposure: parseBigNumberToFloat(item.exposure),
    };
  });

  return data;
};
