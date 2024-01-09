import { useState, useEffect, useCallback } from "react";
import { ethers, Signer } from "ethers";
import {
  Chedda,
  IAccountInfo,
  IInterestRatesProjection,
  IMarketInfo,
  IPoolState,
} from "chedda-sdk";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import {
  ISummaryStats,
  ICollateralInfo,
  IEnvironment,
  IPoolStateResponse,
  IPoolStatsResponse,
} from "@/utils/types";
import {
  createTimestamps,
  findNearestIndex,
  utilizationsArray,
} from "@/utils/helpers";
import {
  formatPoolStats,
  formatPoolStatsList,
  getAggregateInfo,
} from "@/utils/formatResponse";

interface HookResult<T> {
  data?: T;
  isLoading: boolean;
  fetchData: () => Promise<T | null>;
}

type GetDataFunction<T> = ({
  lens,
  poolId,
  account,
  chedda,
  signer,
  environment,
}: {
  lens: any;
  poolId: string;
  account?: string;
  chedda: Chedda;
  signer?: Signer;
  environment: IEnvironment;
}) => Promise<T | null>;

const useCheddaData = <T = any,>(
  poolId: string,
  getData: GetDataFunction<T>
): HookResult<T> => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();

  const fetchData = useCallback(async () => {
    if (
      !chedda ||
      !currentEnvironment ||
      (!account && getData === getAccountInfo)
    )
      return null;
    try {
      const lens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      return await getData({
        lens,
        poolId,
        account,
        chedda,
        signer,
        environment: currentEnvironment,
      });
    } catch (error) {
      console.error(`Error in fetchData for ${getData.name}:`, error);
      return null;
    }
  }, [chedda, currentEnvironment, signer, poolId, account, getData]);

  const fetchCheddaData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchData();
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error(`Error getting ${getData.name} data`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheddaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chedda, account]);

  return {
    data,
    isLoading,
    fetchData,
  };
};

export const getAccountInfo: GetDataFunction<IAccountInfo> = async ({
  lens,
  poolId,
  account,
}) => {
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

const getAggregateStats: GetDataFunction<ISummaryStats[]> = async ({
  lens,
}) => {
  const aggregateStats = await lens.getAggregateStats();
  return getAggregateInfo(aggregateStats);
};

const getPoolState: GetDataFunction<IPoolStateResponse[]> = async ({
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
    events?.map((item: IPoolState) => {
      const timeStamp = ethers.utils.formatUnits(item.timestamp, 0);
      return parseInt(timeStamp);
    }) || [];

  const eventsToGraph = graphTimes.map((timestamp) => {
    const index = findNearestIndex(eventTimestamps, timestamp);
    const event = index !== -1 ? events?.[index] : null;

    // Create a new object with the additional property
    const eventWithTimePoint = event
      ? { ...event, timePoint: timestamp }
      : null;

    return eventWithTimePoint;
  });

  return eventsToGraph as IPoolStateResponse[];
};

const getPoolStatsList: GetDataFunction<IPoolStatsResponse[]> = async ({
  lens,
  environment,
}) => {
  const pools = await lens.activePools();
  const statsList = await lens.getPoolStatsList(pools);
  console.log("statsList", statsList);
  return formatPoolStatsList(statsList, environment.tokens);
};

const getPoolStats: GetDataFunction<IPoolStatsResponse> = async ({
  lens,
  poolId,
  environment,
}) => {
  const poolStats = await lens.getPoolStats(poolId);
  return formatPoolStats(poolStats, environment.tokens);
};

const getRatesProjectorData: GetDataFunction<
  IInterestRatesProjection[]
> = async ({ poolId, chedda, signer, environment }) => {
  const lendingPool = chedda.lendingPool(poolId, signer as Signer);
  const ratesProjector = chedda.interestRateProjector(
    environment.contracts.InterestRatesProjector,
    signer as Signer
  );

  const interestRateModel = await lendingPool.interestRatesModel();
  const interestRatesProjection = await ratesProjector.projection(
    interestRateModel,
    utilizationsArray
  );

  return interestRatesProjection;
};

export const useAccountInfo = (poolId: string): HookResult<IAccountInfo> =>
  useCheddaData<IAccountInfo>(poolId, getAccountInfo);

export const useMarketInfo = (poolId: string): HookResult<IMarketInfo> =>
  useCheddaData<IMarketInfo>(poolId, getMarketInfo);

export const useCollateralInfo = (
  poolId: string
): HookResult<ICollateralInfo[]> =>
  useCheddaData<ICollateralInfo[]>(poolId, getCollateralInfo);

export const useAggregateStats = (): HookResult<ISummaryStats[]> =>
  useCheddaData<ISummaryStats[]>("", getAggregateStats);

export const usePoolState = (
  poolId: string
): HookResult<IPoolStateResponse[]> =>
  useCheddaData<IPoolStateResponse[]>(poolId, getPoolState);

export const usePoolStatsList = (): HookResult<IPoolStatsResponse[]> =>
  useCheddaData<IPoolStatsResponse[]>("", getPoolStatsList);

export const usePoolStats = (poolId: string): HookResult<IPoolStatsResponse> =>
  useCheddaData<IPoolStatsResponse>(poolId, getPoolStats);

export const useRatesProjector = (
  poolId: string
): HookResult<IInterestRatesProjection[]> =>
  useCheddaData<IInterestRatesProjection[]>(poolId, getRatesProjectorData);
