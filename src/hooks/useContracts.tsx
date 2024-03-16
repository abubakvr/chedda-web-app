import { BigNumber, ethers, Signer } from "ethers";
import {
  IAccountInfo,
  IInterestRatesProjection,
  IMarketInfo,
  IPoolState,
} from "@/chedda-sdk";
import {
  ISummaryStats,
  ICollateralInfo,
  IPoolStateResponse,
  IPoolStatsResponse,
  GetDataFunction,
  HookResult,
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
import { useFetcher } from "./useFetcher";
import { parseBigNumberToFloat } from "@/utils/formatters";

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

const getAggregateStats: GetDataFunction<ISummaryStats[]> = async ({
  lens,
}) => {
  const aggregateStats = await lens.getAggregateStats(true);
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

const getPoolStatsList: GetDataFunction<IPoolStatsResponse[]> = async ({
  lens,
  environment,
}) => {
  const pools = await lens.activePools();
  const statsList = await lens.getPoolStatsList(pools);
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
  return await ratesProjector.projection(interestRateModel, utilizationsArray);
};

export const getAvailableLiquidity: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  poolId,
}) => {
  const pool = chedda.lendingPool(poolId, signer as Signer);
  return await pool.available();
};

export const getAllowance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  poolId,
  account,
  asset,
}) => {
  if (!asset || !account) return null;
  const token = chedda.erc20token(asset, signer as Signer);
  return await token.allowance(account, poolId);
};

export const getTokenBalance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  account,
  asset,
}) => {
  if (!asset || !account) return null;
  const token = chedda.erc20token(asset, signer as Signer);
  return await token.balanceOf(account);
};

export const getSelectTokenBalance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  account,
  asset,
}) => {
  if (!asset || !account) return null;
  const token = chedda.erc20token(asset, signer as Signer);
  return await token.balanceOf(account);
};

export const getAssetBalance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  account,
  poolId,
}) => {
  if (!poolId || !account) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  return await pool.assetBalance(account);
};

const getTokenValue: GetDataFunction<string> = async ({
  asset,
  chedda,
  environment,
}) => {
  if (!asset) return null;
  const priceOracle = chedda.priceOracle(environment.contracts.PriceFeed);
  const decimals = await priceOracle.decimals();
  const assetPrice = await priceOracle.readPrice(asset);

  return parseBigNumberToFloat(assetPrice, decimals as any, 10);
};

export const getAccountCollateral: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  poolId,
  account,
  asset = "",
}) => {
  if (!account) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  const accountCollateralAmount = await pool?.accountCollateralAmount(
    account,
    asset
  );
  return accountCollateralAmount;
};

export const getAccountHealth: GetDataFunction<BigNumber> = async ({
  poolId,
  signer,
  chedda,
  account,
}) => {
  if (!account) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  return await pool?.accountHealth(account);
};

export const getTokenCollateralValue: GetDataFunction<BigNumber> = async ({
  poolId,
  signer,
  chedda,
  asset,
  decimals,
}) => {
  if (!asset) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  const amount = ethers.utils.parseUnits("1", decimals);
  return await pool.getTokenCollateralValue(asset, amount);
};

const getStakingBalance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  poolId,
  account,
}) => {
  if (!account) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  const stakePoolContract = await pool.stakePool();
  const stakingPool = chedda.stakingPool(stakePoolContract, signer as Signer);
  return await stakingPool.stakingBalance(account);
};

const getLpTokenBalance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  poolId,
  account,
}) => {
  if (!account) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  return await pool.balanceOf(account);
};

const getLpSymbol: GetDataFunction<string> = async ({
  chedda,
  signer,
  poolId,
}) => {
  if (!poolId) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  return await pool.symbol();
};

const getLpAllowance: GetDataFunction<BigNumber> = async ({
  chedda,
  signer,
  poolId,
  account,
}) => {
  if (!account) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  const stakePoolContract = await pool.stakePool();
  return await pool.allowance(account, stakePoolContract);
};

const getLpDecimals: GetDataFunction<number> = async ({
  chedda,
  signer,
  poolId,
}) => {
  if (!poolId) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  return await pool.decimals();
};

const convertToAssets: GetDataFunction<BigNumber> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!poolId) return null;
  const pool = chedda.lendingPool(poolId, signer as Signer);
  const decimals = await pool.decimals();
  const amount = ethers.utils.parseUnits("1", decimals);
  return await pool.convertToAssets(amount);
};

// Exported custom hooks
export const useAccountInfo = (): HookResult<IAccountInfo> => {
  return useFetcher<IAccountInfo>(getAccountInfo);
};

export const useMarketInfo = (): HookResult<IMarketInfo> =>
  useFetcher<IMarketInfo>(getMarketInfo);

export const useCollateralInfo = (): HookResult<ICollateralInfo[]> =>
  useFetcher<ICollateralInfo[]>(getCollateralInfo);

export const useAggregateStats = (): HookResult<ISummaryStats[]> =>
  useFetcher<ISummaryStats[]>(getAggregateStats);

export const usePoolState = (): HookResult<IPoolStateResponse[]> =>
  useFetcher<IPoolStateResponse[]>(getPoolState);

export const usePoolStatsList = (): HookResult<IPoolStatsResponse[]> =>
  useFetcher<IPoolStatsResponse[]>(getPoolStatsList);

export const usePoolStats = (): HookResult<IPoolStatsResponse> =>
  useFetcher<IPoolStatsResponse>(getPoolStats);

export const useRatesProjector = (): HookResult<IInterestRatesProjection[]> =>
  useFetcher<IInterestRatesProjection[]>(getRatesProjectorData);

export const useAvailableLiquidity = (): HookResult<BigNumber> =>
  useFetcher<BigNumber>(getAvailableLiquidity);

export const useAllowance = (asset: string): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getAllowance, asset);
};

export const useTokenBalance = (asset: string): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getTokenBalance, asset);
};

export const useAssetBalance = (asset: string): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getAssetBalance, asset);
};

export const useTokenValue = (asset: string): HookResult<string> => {
  return useFetcher<string>(getTokenValue, asset);
};

export const useAccountCollateral = (asset: string): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getAccountCollateral, asset);
};

export const useAccountHealth = (): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getAccountHealth);
};

export const useSelectTokenBalance = (asset: string): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getSelectTokenBalance, asset);
};

export const useTokenCollateralValue = (
  asset: string,
  decimals: number
): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getTokenCollateralValue, asset, decimals);
};

export const useLpAllowance = (): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getLpAllowance);
};

export const useLpSymbol = (): HookResult<string> => {
  return useFetcher<string>(getLpSymbol);
};

export const useLpTokenBalance = (): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getLpTokenBalance);
};

export const useLpAssetValue = (): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(convertToAssets);
};

export const useStakingBalance = (): HookResult<BigNumber> => {
  return useFetcher<BigNumber>(getStakingBalance);
};

export const useLpDecimals = (): HookResult<number> => {
  return useFetcher<number>(getLpDecimals);
};
