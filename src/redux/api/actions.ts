import {
  formatPoolStats,
  formatPoolStatsList,
  getAggregateInfo,
} from "@/utils/formatResponse";
import {
  createTimestamps,
  findNearestIndex,
  utilizationsArray,
} from "@/utils/helpers";
import {
  IEnvironment,
  IPoolStateResponse,
  IPoolStatsResponse,
  ISummaryStats,
} from "@/utils/types";
import {
  Chedda,
  IAccountInfo,
  ICollateralInfo,
  IInterestRatesProjection,
  IMarketInfo,
  IPoolState,
} from "chedda-sdk";
import { ethers, Signer } from "ethers";

export interface GetDataFunction<T> {
  (params: {
    lens: any;
    poolId: string;
    account?: string;
    chedda: Chedda;
    signer?: any;
    environment: IEnvironment;
  }): Promise<T | null>;
}

// Data fetching functions
export const getAccountInfo: GetDataFunction<IAccountInfo> = async ({
  lens,
  poolId,
  account,
}) => {
  if (!account) return null;
  return await lens.getPoolAccountInfo(poolId, account);
};

export const getMarketInfo: GetDataFunction<IMarketInfo> = async ({
  lens,
  poolId,
}) => {
  return await lens.getMarketInfo(poolId);
};

export const getCollateralInfo: GetDataFunction<ICollateralInfo[]> = async ({
  lens,
  poolId,
}) => {
  return await lens.getPoolCollateral(poolId);
};

export const getAggregateStats: GetDataFunction<ISummaryStats[]> = async ({
  lens,
}) => {
  const aggregateStats = await lens.getAggregateStats();
  return getAggregateInfo(aggregateStats);
};

export const getPoolState: GetDataFunction<IPoolStateResponse[]> = async ({
  poolId,
  chedda,
  signer,
}) => {
  const graphTimes = createTimestamps(0.5, 25);
  const lendingPool = chedda.lendingPool(poolId, signer as Signer);
  const events = await lendingPool.getEventLogs<IPoolState>(
    "PoolState",
    0,
    "latest"
  );

  const eventTimestamps =
    events?.map((item: IPoolState) =>
      parseInt(ethers.utils.formatUnits(item.timestamp, 0))
    ) || [];
  const eventsToGraph = graphTimes.map((timestamp) => {
    const index = findNearestIndex(eventTimestamps, timestamp);
    const event = index !== -1 ? events?.[index] : null;

    return event ? { ...event, timePoint: timestamp } : null;
  });

  return eventsToGraph as IPoolStateResponse[];
};

export const getPoolStatsList: GetDataFunction<IPoolStatsResponse[]> = async ({
  lens,
  environment,
}) => {
  const pools = await lens.activePools();
  const statsList = await lens.getPoolStatsList(pools);
  return formatPoolStatsList(statsList, environment.tokens);
};

export const getPoolStats: GetDataFunction<IPoolStatsResponse> = async ({
  lens,
  poolId,
  environment,
}) => {
  const poolStats = await lens.getPoolStats(poolId);
  return formatPoolStats(poolStats, environment.tokens);
};

export const getRatesProjectorData: GetDataFunction<
  IInterestRatesProjection[]
> = async ({ poolId, chedda, signer, environment }) => {
  const lendingPool = chedda.lendingPool(poolId, signer as Signer);
  const ratesProjector = chedda.interestRateProjector(
    environment.contracts.InterestRatesProjector,
    signer as Signer
  );

  const interestRateModel = await lendingPool.interestRatesModel();
  return await ratesProjector.projection(interestRateModel, utilizationsArray);
};
