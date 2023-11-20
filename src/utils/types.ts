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
}

export interface ITokenConfig {
  [tokenAddress: string]: IToken;
}

export interface IEnvironment {
  production: boolean;
  environmentName: string;
  jsonRpcUrl: string;
  webSocketUrl: string;
  chainId: number;
  contracts: {
    LendingPool: string;
    LendingPoolLens: string;
    PriceFeed: string;
    Chedda: string;
    xChedda: string;
    veChedda: string;
    Faucet: string;
    GaugeController: string;
  };
  tokens: ITokenConfig;
}

export interface IConvertedPoolStats {
  pool: string;
  asset: any;
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
  supplied: string | number;
  suppliedValue: string | number;
  borrowed: string | number;
  borrowedValue: string | number;
  baseSupplyAPY: string | number;
  maxSupplyAPY: string | number;
  baseBorrowAPY: string | number;
  maxBorrowAPY: string | number;
  utilization: string | number;
  feesPaid: string | number;
  tvl: string | number;
  collaterals: IToken[];
}
