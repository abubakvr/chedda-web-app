import {
  getAccountInfo,
  getAggregateStats,
  getCollateralInfo,
  getMarketInfo,
  getPoolState,
  getPoolStats,
  getPoolStatsList,
  getRatesProjectorData,
} from "@/redux/api/actions";
import {
  IPoolStateResponse,
  IPoolStatsResponse,
  ISummaryStats,
} from "@/utils/types";
import {
  IAccountInfo,
  ICollateralInfo,
  IInterestRatesProjection,
  IMarketInfo,
} from "chedda-sdk";
import { useCheddaSlice } from "./useCheddaSlice";

export const useAccountInfo = (poolId: string) =>
  useCheddaSlice<IAccountInfo>(poolId, getAccountInfo);

export const useMarketInfo = (poolId: string) =>
  useCheddaSlice<IMarketInfo>(poolId, getMarketInfo);

export const useCollateralInfo = (poolId: string) =>
  useCheddaSlice<ICollateralInfo[]>(poolId, getCollateralInfo);

export const useAggregateStats = () =>
  useCheddaSlice<ISummaryStats[]>("", getAggregateStats);

export const usePoolState = (poolId: string) =>
  useCheddaSlice<IPoolStateResponse[]>(poolId, getPoolState);

export const usePoolStatsList = () =>
  useCheddaSlice<IPoolStatsResponse[]>("", getPoolStatsList);

export const usePoolStats = (poolId: string) =>
  useCheddaSlice<IPoolStatsResponse>(poolId, getPoolStats);

export const useRatesProjector = (poolId: string) =>
  useCheddaSlice<IInterestRatesProjection[]>(poolId, getRatesProjectorData);
