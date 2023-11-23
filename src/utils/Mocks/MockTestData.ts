import { StaticImageData } from "next/image";
import { IPoolStatsResponse } from "../types";
import { BigNumber, ethers } from "ethers";
import { IPoolStats } from "@/chedda-sdk";

export const mockPoolStats: IPoolStatsResponse[] = [
  {
    pool: "Pool1",
    asset: {
      name: "Token1",
      symbol: "T1",
      address: "0x123abc",
      logo: {} as StaticImageData,
      decimals: 18,
    },
    characterization: "Characterization1",
    supplied: "1000",
    suppliedValue: 5000,
    borrowed: 200,
    borrowedValue: 1000,
    baseSupplyAPY: 5,
    maxSupplyAPY: 8,
    baseBorrowAPY: 2,
    maxBorrowAPY: 4,
    utilization: 50,
    feesPaid: 10,
    tvl: 15000,
    collaterals: [
      {
        name: "CollateralToken1",
        symbol: "CT1",
        address: "0x456def",
        logo: {} as StaticImageData,
        decimals: 18,
      },
      {
        name: "CollateralToken2",
        symbol: "CT2",
        address: "0x789ghi",
        logo: {} as StaticImageData,
        decimals: 18,
      },
    ],
  },
  {
    pool: "Pool3",
    asset: {
      name: "Token3",
      symbol: "T3",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
    },
    characterization: "Characterization3",
    supplied: "1200",
    suppliedValue: 6000,
    borrowed: 180,
    borrowedValue: 900,
    baseSupplyAPY: 6,
    maxSupplyAPY: 9,
    baseBorrowAPY: 2.5,
    maxBorrowAPY: 4.5,
    utilization: 60,
    feesPaid: 12,
    tvl: 18000,
    collaterals: [
      {
        name: "CollateralToken5",
        symbol: "CT5",
        address: "0x321fed",
        logo: {} as StaticImageData,
        decimals: 18,
      },
      {
        name: "CollateralToken6",
        symbol: "CT6",
        address: "0x987cba",
        logo: {} as StaticImageData,
        decimals: 18,
      },
    ],
  },
];

export const mockGetPoolStats: IPoolStats[] = [
  {
    pool: "Pool1",
    asset: "Asset1",
    characterization: "Characterization1",
    supplied: BigNumber.from(100),
    suppliedValue: BigNumber.from(200),
    borrowed: BigNumber.from(50),
    borrowedValue: BigNumber.from(100),
    baseSupplyAPY: BigNumber.from(5),
    maxSupplyAPY: BigNumber.from(10),
    baseBorrowAPY: BigNumber.from(3),
    maxBorrowAPY: BigNumber.from(8),
    utilization: BigNumber.from(89),
    feesPaid: BigNumber.from(1),
    tvl: BigNumber.from(300),
    collaterals: ["Collateral1", "Collateral2"],
  },
  {
    pool: "Pool1",
    asset: "Asset1",
    characterization: "Characterization1",
    supplied: BigNumber.from(100),
    suppliedValue: BigNumber.from(200),
    borrowed: BigNumber.from(50),
    borrowedValue: BigNumber.from(100),
    baseSupplyAPY: BigNumber.from(5),
    maxSupplyAPY: BigNumber.from(10),
    baseBorrowAPY: BigNumber.from(3),
    maxBorrowAPY: BigNumber.from(8),
    utilization: BigNumber.from(89),
    feesPaid: BigNumber.from(1),
    tvl: BigNumber.from(300),
    collaterals: ["Collateral1", "Collateral2"],
  },
];

export const mockCurrentEnvironment = {
  production: false,
  environmentName: "mockEnvironment",
  jsonRpcUrl: "https://mock-json-rpc-url",
  webSocketUrl: "wss://mock-websocket-url",
  chainId: 1,
  contracts: {
    LendingPool: "mockLendingPoolAddress",
    LendingPoolLens: "mockLendingPoolLensAddress",
    PriceFeed: "mockPriceFeedAddress",
    Chedda: "mockCheddaAddress",
    xChedda: "mockXCheddaAddress",
    veChedda: "mockVeCheddaAddress",
    Faucet: "mockFaucetAddress",
    GaugeController: "mockGaugeControllerAddress",
  },
  tokens: {
    4334: {
      name: "CollateralToken5",
      symbol: "CT5",
      address: "0x321fed",
      logo: {} as StaticImageData,
      decimals: 18,
    },
    35234: {
      name: "CollateralToken6",
      symbol: "CT6",
      address: "0x987cba",
      logo: {} as StaticImageData,
      decimals: 18,
    },
  },
};
const mockProvider = {
  getSigner: jest.fn(),
};

export const mockUseCheddaReturnValue = {
  chedda: {
    provider: new ethers.providers.WebSocketProvider("wss://testgoerliurl"),
    poolLens: jest.fn().mockReturnValue({
      activePools: jest.fn().mockResolvedValue(["pool1", "pool2"]),
      getPoolStatsList: mockPoolStats,
    }),

    lendingPool: jest.fn(),
    erc20token: jest.fn(),
    priceOracle: jest.fn(),
    closeProvider: jest.fn(),
  },
  signer: mockProvider.getSigner(),
};

export const mockAggregateStats = {
  totalSuppliedValue: BigNumber.from(5000),
  totalBorrowedValue: BigNumber.from(5000),
  totalAvailableValue: BigNumber.from(5000),
  totalFeesPaid: BigNumber.from(5000),
  numberOfVaults: BigNumber.from(5000),
  tvl: BigNumber.from(5000),
};
