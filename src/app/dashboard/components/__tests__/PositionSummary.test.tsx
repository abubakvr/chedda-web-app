import { render, screen } from "@testing-library/react";

import PositionSummary from "../PositionSummary";
import { usePositionSummary } from "@/hooks";
import { formatCurrency, formatNumber } from "@/utils/formatters";
import { IPositionResponse } from "@/utils/types";
import { StaticImageData } from "next/image";
import { NonceProvider } from "@/contexts/NonceContext";

// Mock the usePositionSummary hook
jest.mock("../../../../hooks");

// Mock data for the tests
const mockPositionSummary = {
  netValue: BigInt("1000000000000000000"),
  suppliedValue: BigInt("2000000000000000000"),
  borrowedValue: BigInt("500000000000000000"),
  lockedValue: BigInt("300000000000000000"),
};

const mockAllPositions: IPositionResponse[] = [
  {
    account: "0x123",
    pool: "pool1",
    asset: {
      symbol: "USDT",
      name: "Tether",
      decimals: 6,
      address: "0x123456",
      bridgeToken: true,
      type: "stablecoin",
      oftAdapter: "0x123",
      bridgedOft: "0x456",
      nativeChain: "Ethereum",
      source: "DeFi",
      logo: {} as StaticImageData,
      sourceLogo: {} as StaticImageData,
      color: "#36C693",
    },
    decimals: 6,
    supplied: 25539,
    borrowed: 0,
    suppliedValue: 25539,
    borrowedValue: 0,
    collateralValue: 25539,
    healthFactor: 1.5,
    staked: 0,
    locked: 0,
    stakeRewardsClaimable: 0,
    lockRewardsClaimable: 0,
    exposure: 1,
  },
  {
    account: "0x123",
    pool: "pool1",
    asset: {
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      address: "0x654321",
      bridgeToken: true,
      type: "stablecoin",
      oftAdapter: "0x654",
      bridgedOft: "0x987",
      nativeChain: "Ethereum",
      source: "DeFi",
      logo: {} as StaticImageData,
      sourceLogo: {} as StaticImageData,
      color: "#F4C042",
    },
    decimals: 6,
    supplied: 25539,
    borrowed: 0,
    suppliedValue: 26539,
    borrowedValue: 0,
    collateralValue: 25539,
    healthFactor: 1.5,
    staked: 0,
    locked: 0,
    stakeRewardsClaimable: 0,
    lockRewardsClaimable: 0,
    exposure: 1,
  },
  {
    account: "0x123",
    pool: "pool1",
    asset: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      address: "0xabcdef",
      bridgeToken: false,
      type: "cryptocurrency",
      oftAdapter: "0xabc",
      bridgedOft: "0xdef",
      nativeChain: "Ethereum",
      source: "DeFi",
      logo: {} as StaticImageData,
      sourceLogo: {} as StaticImageData,
      color: "#885AF8",
    },
    decimals: 18,
    supplied: 12043,
    borrowed: 0,
    suppliedValue: 12143,
    borrowedValue: 0,
    collateralValue: 12043,
    healthFactor: 1.5,
    staked: 0,
    locked: 0,
    stakeRewardsClaimable: 0,
    lockRewardsClaimable: 0,
    exposure: 1,
  },
  {
    account: "0x123",
    pool: "pool1",
    asset: {
      symbol: "USDC.e",
      name: "USD Coin Extended",
      decimals: 6,
      address: "0xfedcba",
      bridgeToken: true,
      type: "stablecoin",
      oftAdapter: "0xdef",
      bridgedOft: "0xcba",
      nativeChain: "Avalanche",
      source: "DeFi",
      logo: {} as StaticImageData,
      sourceLogo: {} as StaticImageData,
      color: "#4ACBD3",
    },
    decimals: 6,
    supplied: 5534.6,
    borrowed: 0,
    suppliedValue: 5544.6,
    borrowedValue: 0,
    collateralValue: 5534.6,
    healthFactor: 1.5,
    staked: 0,
    locked: 0,
    stakeRewardsClaimable: 0,
    lockRewardsClaimable: 0,
    exposure: 1,
  },
];

describe("PositionSummary", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (usePositionSummary as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
  });

  test("renders loading states correctly", () => {
    (usePositionSummary as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <NonceProvider nonce="0x0xf89">
        <PositionSummary
          isWalletConnected={true}
          allPositions={undefined}
          allPositionsLoading={true}
        />
      </NonceProvider>
    );

    expect(screen.getByTestId("net-value-loading")).toBeInTheDocument();
    expect(screen.getByTestId("total-supplied-loading")).toBeInTheDocument();
    expect(screen.getByTestId("total-borrowed-loading")).toBeInTheDocument();
    expect(screen.getByTestId("locked-loading")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart-loading")).toBeInTheDocument();
    expect(screen.getAllByTestId(/position-item-loading-/i)).toHaveLength(4);
  });

  test("renders data correctly when loaded", () => {
    (usePositionSummary as jest.Mock).mockReturnValue({
      data: mockPositionSummary,
      isLoading: false,
    });

    render(
      <NonceProvider nonce="0x0xf89">
        <PositionSummary
          isWalletConnected={true}
          allPositions={mockAllPositions}
          allPositionsLoading={false}
        />
      </NonceProvider>
    );

    expect(screen.getByText("$1.00")).toBeInTheDocument(); // netValue
    expect(screen.getByText("$2.00")).toBeInTheDocument(); // suppliedValue
    expect(screen.getByText("$0.50")).toBeInTheDocument(); // borrowedValue
    expect(screen.getByText("$0.30")).toBeInTheDocument(); // lockedValue

    // Check if the bars are rendered correctly
    mockAllPositions.forEach((position, index) => {
      const bar = screen.getByTestId(`bar-${index}`);
      expect(bar).toHaveStyle(`background-color: ${position.asset.color}`);
    });

    // Check if the position items are rendered correctly
    mockAllPositions.forEach((position, index) => {
      const suppliedText = screen.getByText(
        `${formatNumber(position.supplied)} ${position.asset.symbol}`
      );
      const suppliedValueText = screen.getByText(
        `${formatCurrency(position.suppliedValue)}`
      );
      expect(suppliedText).toBeInTheDocument();
      expect(suppliedValueText).toBeInTheDocument();
    });
  });

  test("show supply asset text when position list is empty", () => {
    render(
      <NonceProvider nonce="0x0xf89">
        <PositionSummary
          isWalletConnected={true}
          allPositions={[]}
          allPositionsLoading={false}
        />
      </NonceProvider>
    );

    expect(screen.getByTestId("no-open-positions")).toBeInTheDocument();
  });

  test("renders ConnectWalletBox when wallet is not connected", () => {
    render(
      <NonceProvider nonce="0x0xf89">
        <PositionSummary
          isWalletConnected={false}
          allPositions={undefined}
          allPositionsLoading={false}
        />
      </NonceProvider>
    );

    expect(
      screen.getByText("Connect your wallet to see your position summary")
    ).toBeInTheDocument();
  });
});
