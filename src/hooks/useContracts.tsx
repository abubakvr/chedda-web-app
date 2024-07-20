import { ethers, Signer } from "ethers";
import {
  IAccountInfo,
  IAccountSummary,
  IInterestRatesProjection,
  IMarketInfo,
  IPoolState,
  Lock,
} from "chedda-sdk";
import {
  ISummaryStats,
  ICollateralInfo,
  IPoolStateResponse,
  IPoolStatsResponse,
  GetDataFunction,
  HookResult,
  IPositionResponse,
} from "@/utils/types";
import {
  createTimestamps,
  findNearestIndex,
  getPoolInstance,
  utilizationsArray,
} from "@/utils/helpers";
import {
  formatPoolStats,
  formatPoolStatsList,
  formatPositionsList,
  getAggregateInfo,
} from "@/utils/formatResponse";
import { useFetcher } from "./useFetcher";
import {
  formatToArrayOfStrings,
  parseBigNumberToFloat,
} from "@/utils/formatters";

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
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  const events = await lendingPool.getEventLogs("PoolState", 0, "latest");

  const eventTimestamps =
    events?.map((item: IPoolState) =>
      parseInt(ethers.formatUnits(item.timestamp, 0))
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
  const statsList = await lens.getPoolStatsList(formatToArrayOfStrings(pools));
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
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  const ratesProjector = chedda.interestRateProjector(
    environment.contracts.InterestRatesProjector,
    signer as any
  );

  const interestRateModel = await lendingPool.interestRatesModel();
  return await ratesProjector.projection(interestRateModel, utilizationsArray);
};

export const getAvailableLiquidity: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  poolId,
}) => {
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.available();
};

export const getAllowance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  poolId,
  account,
  asset,
}) => {
  if (!asset || !account) return null;
  const token = chedda.erc20token(asset, signer as any);
  return await token.allowance(account, poolId);
};

export const getTokenBalance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  account,
  asset,
}) => {
  if (!asset || !account) return null;
  const token = chedda.erc20token(asset, signer as any);
  return await token.balanceOf(account);
};

export const getSelectTokenBalance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  account,
  asset,
}) => {
  if (!asset || !account) return null;
  const token = chedda.erc20token(asset, signer as any);
  return await token.balanceOf(account);
};

export const getAssetBalance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  account,
  poolId,
}) => {
  if (!poolId || !account) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.assetBalance(account);
};

const getTokenValue: GetDataFunction<number> = async ({
  asset,
  chedda,
  environment,
}) => {
  if (!asset) return null;
  const priceOracle = chedda.priceOracle(environment.contracts.PriceFeed);
  const decimals = await priceOracle.decimals();
  const assetPrice = await priceOracle.readPrice(asset);
  return parseBigNumberToFloat(assetPrice, decimals, 10);
};

const getTokenPrice: GetDataFunction<number> = async ({
  asset,
  chedda,
  environment,
}) => {
  if (!asset) return null;
  const priceOracle = chedda.priceOracle(environment.contracts.PriceFeed);
  const decimals = await priceOracle.decimals();
  const assetPrice = await priceOracle.readPrice(asset);
  return parseBigNumberToFloat(assetPrice, decimals, 10);
};

export const getAccountCollateral: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  poolId,
  account,
  asset = "",
}) => {
  if (!account) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool?.accountCollateralAmount(account, asset);
};

export const getAccountHealth: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
  account,
}) => {
  if (!account) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool?.accountHealth(account);
};

export const getTokenCollateralValue: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
  asset,
  decimals,
}) => {
  if (!asset) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  const amount = ethers.parseUnits("1", decimals);
  return await lendingPool.getTokenCollateralValue(asset, amount);
};

const getStakingBalance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  poolId,
  account,
}) => {
  if (!account) return null;
  const stakingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "stakingPool"
  );
  return await stakingPool.stakingBalance(account);
};

const getLpTokenBalance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  poolId,
  account,
}) => {
  if (!account) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.balanceOf(account);
};

const getLpSymbol: GetDataFunction<string> = async ({
  chedda,
  signer,
  poolId,
}) => {
  if (!poolId) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.symbol();
};

const getLpAllowance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  poolId,
  account,
}) => {
  if (!account) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  const stakePoolContract = await lendingPool.stakePool();
  return await lendingPool.allowance(account, stakePoolContract);
};

const getLpDecimals: GetDataFunction<number> = async ({
  chedda,
  signer,
  poolId,
}) => {
  if (!poolId) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.decimals();
};

const convertToAssets: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!poolId) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  const decimals = await lendingPool.decimals();
  const amount = ethers.parseUnits("1", decimals);
  return await lendingPool.convertToAssets(amount);
};

const getTotalStaked: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const stakingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "stakingPool"
  );
  return await stakingPool.totalStaked();
};

const getLpStakers: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const stakingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "stakingPool"
  );
  return await stakingPool.stakers();
};

const getTotalSupply: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.totalSupply();
};

const getStakingPoolAddress: GetDataFunction<string> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.stakePool();
};

const getClaimableStakeRewards: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
  account,
}) => {
  if (!account) return null;
  const stakingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "stakingPool"
  );
  return await stakingPool.claimable(account);
};

export const getCheddaBalance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  account,
  environment,
}) => {
  if (!environment || !account) return null;
  const cheddaToken = chedda.cheddaToken(
    environment.contracts.CheddaToken,
    signer as any
  );
  return await cheddaToken.balanceOf(account);
};

export const getCheddaTotalSupply: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  environment,
}) => {
  if (!environment) return null;
  const cheddaToken = chedda.cheddaToken(
    environment.contracts.CheddaToken,
    signer as any
  );
  return await cheddaToken.totalSupply();
};

export const getCheddaAllowance: GetDataFunction<bigint> = async ({
  chedda,
  signer,
  account,
  environment,
  poolId,
}) => {
  if (!account || !environment) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  const gaugeContract = await lendingPool.gauge();
  const cheddaToken = chedda.cheddaToken(
    environment.contracts.CheddaToken,
    signer as any
  );
  return await cheddaToken.allowance(account, gaugeContract);
};

const getLockedAmount: GetDataFunction<Lock> = async ({
  chedda,
  signer,
  account,
  environment,
  poolId,
}) => {
  if (!account || !environment) return null;
  const cheddaLockingGauge = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "cheddaLockingGauge"
  );
  return await cheddaLockingGauge.getLock(account);
};

const getClaimableLockRewards: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
  account,
}) => {
  if (!account) return null;
  const cheddaLockingGauge = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "cheddaLockingGauge"
  );
  return await cheddaLockingGauge.claimable(account);
};

const getTotalAmountLocked: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const cheddaLockingGauge = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "cheddaLockingGauge"
  );
  return await cheddaLockingGauge.totalLocked();
};

const getTotalWeight: GetDataFunction<bigint> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const cheddaLockingGauge = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "cheddaLockingGauge"
  );
  return await cheddaLockingGauge.totalWeight();
};

const getGaugeAddress: GetDataFunction<string> = async ({
  poolId,
  signer,
  chedda,
}) => {
  if (!chedda) return null;
  const lendingPool = await getPoolInstance(
    chedda,
    poolId,
    signer,
    "lendingPool"
  );
  return await lendingPool.gauge();
};

const getTotalWeightSum: GetDataFunction<bigint> = async ({
  signer,
  chedda,
  environment,
}) => {
  if (!chedda) return null;
  const rewardsDistributor = chedda.lockingGaugeRewardsDistributor(
    environment.contracts.LockingGaugeRewardsDistributor,
    signer as any
  );
  return await rewardsDistributor.totalWeightSum();
};

const getAllClaimableRewards: GetDataFunction<bigint[]> = async ({
  signer,
  chedda,
  environment,
  account,
}) => {
  if (!chedda || !account) return null;
  const accountActor = chedda.accountActor(
    environment.contracts.AccountActor,
    signer as any
  );
  return await accountActor.allClaimableRewards(account);
};

const getAccountSummary: GetDataFunction<IAccountSummary> = async ({
  signer,
  chedda,
  environment,
  account,
}) => {
  if (!chedda || !account) return null;
  const accountActor = chedda.accountActor(
    environment.contracts.AccountActor,
    signer as any
  );
  return await accountActor.accountSummary(account);
};

const getAllPositions: GetDataFunction<IPositionResponse[]> = async ({
  signer,
  chedda,
  environment,
  account,
}) => {
  if (!chedda || !account) return null;
  const accountActor = chedda.accountActor(
    environment.contracts.AccountActor,
    signer as any
  );
  const allPositions = await accountActor.allPositions(account, true);
  return formatPositionsList(allPositions);
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

export const useAvailableLiquidity = (): HookResult<bigint> =>
  useFetcher<bigint>(getAvailableLiquidity);

export const useAllowance = (asset: string): HookResult<bigint> => {
  return useFetcher<bigint>(getAllowance, asset);
};

export const useTokenBalance = (asset: string): HookResult<bigint> => {
  return useFetcher<bigint>(getTokenBalance, asset);
};

export const useAssetBalance = (asset: string): HookResult<bigint> => {
  return useFetcher<bigint>(getAssetBalance, asset);
};

export const useTokenValue = (asset: string): HookResult<number> => {
  return useFetcher<number>(getTokenValue, asset);
};

export const useTokenPrice = (asset: string): HookResult<number> => {
  return useFetcher<number>(getTokenPrice, asset);
};

export const useAccountCollateral = (asset: string): HookResult<bigint> => {
  return useFetcher<bigint>(getAccountCollateral, asset);
};

export const useAccountHealth = (): HookResult<bigint> => {
  return useFetcher<bigint>(getAccountHealth);
};

export const useSelectTokenBalance = (asset: string): HookResult<bigint> => {
  return useFetcher<bigint>(getSelectTokenBalance, asset);
};

export const useTokenCollateralValue = (
  asset: string,
  decimals: number
): HookResult<bigint> => {
  return useFetcher<bigint>(getTokenCollateralValue, asset, decimals);
};

export const useLpAllowance = (): HookResult<bigint> => {
  return useFetcher<bigint>(getLpAllowance);
};

export const useLpSymbol = (): HookResult<string> => {
  return useFetcher<string>(getLpSymbol);
};

export const useLpTokenBalance = (): HookResult<bigint> => {
  return useFetcher<bigint>(getLpTokenBalance);
};

export const useLpAssetValue = (): HookResult<bigint> => {
  return useFetcher<bigint>(convertToAssets);
};

export const useStakingBalance = (): HookResult<bigint> => {
  return useFetcher<bigint>(getStakingBalance);
};

export const useLpDecimals = (): HookResult<number> => {
  return useFetcher<number>(getLpDecimals);
};

export const useLpStakers = (): HookResult<bigint> => {
  return useFetcher<bigint>(getLpStakers);
};

export const useTotalStaked = (): HookResult<bigint> => {
  return useFetcher<bigint>(getTotalStaked);
};

export const useTotalSupply = (): HookResult<bigint> => {
  return useFetcher<bigint>(getTotalSupply);
};

export const useStakingContractAddress = (): HookResult<string> => {
  return useFetcher<string>(getStakingPoolAddress);
};

export const useClaimableStakeRewards = (): HookResult<bigint> => {
  return useFetcher<bigint>(getClaimableStakeRewards);
};

export const useCheddaBalance = (): HookResult<bigint> => {
  return useFetcher<bigint>(getCheddaBalance);
};

export const useCheddaAllowance = (): HookResult<bigint> => {
  return useFetcher<bigint>(getCheddaAllowance);
};

export const useLockedChedda = (): HookResult<Lock> => {
  return useFetcher<Lock>(getLockedAmount);
};

export const useClaimableLockRewards = (): HookResult<bigint> => {
  return useFetcher<bigint>(getClaimableLockRewards);
};

export const useTotalAmountLocked = (): HookResult<bigint> => {
  return useFetcher<bigint>(getTotalAmountLocked);
};

export const useTotalWeight = (): HookResult<bigint> => {
  return useFetcher<bigint>(getTotalWeight);
};

export const useTotalWeightSum = (): HookResult<bigint> => {
  return useFetcher<bigint>(getTotalWeightSum);
};

export const useGaugeAddress = (): HookResult<string> => {
  return useFetcher<string>(getGaugeAddress);
};

export const useCheddaTotalSupply = (): HookResult<bigint> => {
  return useFetcher<bigint>(getCheddaTotalSupply);
};

export const useAllClaimableRewards = (): HookResult<bigint[]> => {
  return useFetcher<bigint[]>(getAllClaimableRewards);
};

export const usePositionSummary = (): HookResult<IAccountSummary> => {
  return useFetcher<IAccountSummary>(getAccountSummary);
};

export const useAllPositions = (): HookResult<IPositionResponse[]> => {
  return useFetcher<IPositionResponse[]>(getAllPositions);
};
