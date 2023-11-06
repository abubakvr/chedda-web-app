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

export interface Token {
  name: string;
  symbol: string;
  address: string;
  logo: StaticImageData;
}

export interface TokenConfig {
  [tokenAddress: string]: Token;
}

export interface IEnvironment {
  production: boolean;
  environmentName: string;
  jsonRpcUrl: string;
  webSocketUrl: string;
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
  tokens: TokenConfig;
}

export interface EnvironmentConfig {
  [networkId: number]: IEnvironment;
}
