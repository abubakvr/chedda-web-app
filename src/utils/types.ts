import {
  Chedda,
  IAccountInfo,
  IAggregateStats,
  IMarketInfo,
  IPoolCollateralInfo,
  IPoolState,
  IPoolStats,
} from "chedda-sdk";
import { JsonRpcSigner, Signer } from "ethers";
import { StaticImageData } from "next/image";
import React from "react";

export interface IMenuItem {
  name: string;
  path: string;
}

export interface INetworkList {
  name: string;
  chainId: string;
  faucetUrl: string;
  txUrlPrefix: string;
  icon: StaticImageData;
}

export interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IToken {
  name: string;
  symbol: string;
  address: string;
  logo: StaticImageData;
  decimals: number;
  color: string;
  bridgeToken: boolean;
  type?: string;
  oftAdapter?: string;
  bridgedOft: string;
  nativeChain?: string;
  source?: string;
  sourceLogo: StaticImageData;
}

export interface ITokenConfig {
  [tokenAddress: string]: IToken;
}

export interface IPoolCategories {
  [poolAddress: string]: {
    categories: string[];
  };
}

export interface IEnvironment {
  production: boolean;
  environmentName: string;
  jsonRpcUrl: string;
  webSocketUrl: string;
  txUrlPrefix: string;
  contractPrefix: string;
  chainId: number;
  contracts: {
    LendingPoolLens: string;
    InterestRatesProjector: string;
    AccountActor: string;
    LockingGaugeRewardsDistributor: string;
    PriceFeed: string;
    CheddaToken: string;
    veChedda: string;
    Faucet: string;
  };
  tokens: ITokenConfig;
}

export interface IConvertedPoolStats {
  pool: string;
  asset: IToken;
  characterization: string;
  supplied: number;
  suppliedValue: number;
  borrowed: number;
  borrowedValue: number;
  baseSupplyAPY: number;
  maxSupplyAPY: number;
  baseBorrowAPY: number;
  maxBorrowAPY: number;
  utilization: number;
  feesPaid: number;
  tvl: number;
  collaterals: IToken[];
}

export interface IEnvironmentConfig {
  [networkId: number]: IEnvironment;
}

export interface IPoolStatsResponse {
  pool: string;
  asset: IToken;
  characterization: string;
  supplied: number;
  suppliedValue: number;
  borrowed: number;
  borrowedValue: number;
  baseSupplyAPY: number;
  maxSupplyAPY: number;
  baseBorrowAPY: number;
  maxBorrowAPY: number;
  utilization: number;
  feesPaid: number;
  tvl: string | number;
  collaterals: IToken[];
  categories: string[];
  rewardsAPY: number;
}

export interface ICollateralInfo extends IPoolCollateralInfo {
  decimals: number;
}

export interface IFormattedCollateral {
  asset: IToken;
  decimals: number;
  value: number;
  amountDeposited: string;
  myCollateralValue: string;
  myCollateralAmount: string;
  collateralFactor: string;
}

export interface IPoolStateResponse extends IPoolState {
  timePoint: number;
  caller: string;
}

export interface ISummaryStats {
  title: string;
  value: string | number;
}

export interface HookResult<T> {
  data: T | undefined;
  isLoading: boolean;
  fetchData: (showLoading?: boolean) => void;
}

// Common data fetching function type
export type GetDataFunction<T> = ({
  lens,
  poolId,
  account,
  chedda,
  signer,
  environment,
  decimals,
}: {
  lens: any;
  poolId: string;
  account?: string;
  chedda: Chedda;
  signer: JsonRpcSigner;
  environment: IEnvironment;
  asset?: string;
  decimals?: number;
}) => Promise<T | null>;

export interface CustomTooltipProps<T> {
  payload?: T[];
  decimals?: string | number;
}

export interface IPoolLens {
  activePools(): Promise<string[]>;
  getAggregateStats(): Promise<IAggregateStats>;
  getMarketInfo(poolAddress: string): Promise<IMarketInfo>;
  getPoolAccountInfo(
    poolAddress: string,
    account: string
  ): Promise<IAccountInfo>;
  getPoolCollateral(poolAddress: string): Promise<IPoolCollateralInfo[]>;
  getPoolStats(poolAddress: string): Promise<IPoolStats>;
  getPoolStatsList(pools: string[]): Promise<IPoolStats[]>;
  owner(): Promise<string>;
  registeredPools(): Promise<string[]>;
  registerPool(pool: string, isActive: boolean): Promise<void>;
  renounceOwnership(): Promise<void>;
  setActive(pool: string, isActive: boolean): Promise<void>;
  transferOwnership(newOwner: string): Promise<void>;
  unregisterPool(pool: string): Promise<void>;
}

export interface modalInfoItem {
  title: string;
  value: string | number;
}

export interface ISourceChain {
  name: string;
  logo: StaticImageData;
  chainId: number;
  key: string;
  endpointId: number;
  jsonRpcUrl: string;
  txUrlPrefix: string;
  priceFeed: string;
  ethAddress: string;
}

export interface IPositionResponse {
  account: string;
  pool: string;
  asset: IToken;
  decimals: number;
  supplied: number;
  borrowed: number;
  suppliedValue: number;
  borrowedValue: number;
  collateralValue: number;
  healthFactor: number;
  staked: number;
  locked: number;
  stakeRewardsClaimable: number;
  lockRewardsClaimable: number;
  exposure: number;
}

export interface IPoolCategory {
  label: string;
  keyword?: string | null;
  itemCount: number;
  icon: StaticImageData;
  activeIcon: StaticImageData;
  activeClass: string;
}
