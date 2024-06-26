import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MyPositions } from "../MyPositions";
import { IPositionResponse } from "@/utils/types";
import { StaticImageData } from "next/image";

const mockPositions: IPositionResponse[] = [
  {
    account: "0x1",
    pool: "pool1",
    asset: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      address: "0x123",
      bridgeToken: true,
      type: "erc20",
      oftAdapter: "adapter1",
      bridgedOft: "oft1",
      nativeChain: "Ethereum",
      source: "source1",
      logo: {} as StaticImageData,
      color: "blue",
    },
    decimals: 18,
    supplied: 10,
    borrowed: 5,
    suppliedValue: 1000,
    borrowedValue: 500,
    collateralValue: 800,
    healthFactor: 3.0,
    staked: 0,
    locked: 0,
    stakeRewardsClaimable: 0,
    lockRewardsClaimable: 0,
    exposure: 0,
  },
  {
    account: "0x2",
    pool: "pool2",
    asset: {
      symbol: "DAI",
      name: "DAI",
      decimals: 6,
      address: "0x456",
      bridgeToken: true,
      type: "erc20",
      oftAdapter: "adapter2",
      bridgedOft: "oft2",
      nativeChain: "Ethereum",
      source: "source2",
      logo: {} as StaticImageData,
      color: "green",
    },
    decimals: 6,
    supplied: 20,
    borrowed: 10,
    suppliedValue: 2000,
    borrowedValue: 1000,
    collateralValue: 1600,
    healthFactor: 2.5,
    staked: 0,
    locked: 0,
    stakeRewardsClaimable: 0,
    lockRewardsClaimable: 0,
    exposure: 0,
  },
];

describe("MyPositions", () => {
  test("renders loading state", () => {
    render(
      <MyPositions
        isWalletConnected={true}
        allPositions={undefined}
        allPositionsLoading={true}
        cheddaTokenPrice={undefined}
        cheddaTokenPriceLoading={true}
      />
    );

    expect(screen.getByTestId("vault-skeleton")).toBeInTheDocument();
  });

  test("renders positions when wallet is connected", () => {
    render(
      <MyPositions
        isWalletConnected={true}
        allPositions={mockPositions}
        allPositionsLoading={false}
        cheddaTokenPrice={2}
        cheddaTokenPriceLoading={false}
      />
    );

    expect(screen.getByTestId("position-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("position-item-1")).toBeInTheDocument();
  });

  test("renders connect wallet box when wallet is not connected", () => {
    render(
      <MyPositions
        isWalletConnected={false}
        allPositions={undefined}
        allPositionsLoading={false}
        cheddaTokenPrice={undefined}
        cheddaTokenPriceLoading={false}
      />
    );

    expect(screen.getByTestId("connect-wallet-box")).toBeInTheDocument();
  });

  test("filters positions based on search input", () => {
    render(
      <MyPositions
        isWalletConnected={true}
        allPositions={mockPositions}
        allPositionsLoading={false}
        cheddaTokenPrice={2}
        cheddaTokenPriceLoading={false}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "eth" } });

    expect(screen.getByTestId("position-item-0")).toBeInTheDocument();
    expect(screen.queryByTestId("position-item-1")).not.toBeInTheDocument();
  });

  test("render empty position card when list is empty", () => {
    render(
      <MyPositions
        isWalletConnected={true}
        allPositions={[]}
        allPositionsLoading={false}
        cheddaTokenPrice={2}
        cheddaTokenPriceLoading={false}
      />
    );

    expect(screen.getByTestId("empty-position-card")).toBeInTheDocument();
  });
});
