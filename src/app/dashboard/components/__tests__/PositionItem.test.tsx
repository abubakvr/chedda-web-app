import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PositionItem } from "../PositionItem";
import { IPositionResponse } from "@/utils/types";
import { StaticImageData } from "next/image";

const mockPool: IPositionResponse = {
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
  staked: 50,
  locked: 25,
  stakeRewardsClaimable: 0,
  lockRewardsClaimable: 0,
  exposure: 0,
};

const cheddaTokenPrice = 2;

test("renders PositionItem with correct data", () => {
  render(<PositionItem pool={mockPool} cheddaTokenPrice={cheddaTokenPrice} />);

  // Check if asset icon is rendered
  const assetIcon = screen.getByTestId("asset-icon");
  expect(assetIcon).toHaveAttribute("alt", mockPool.asset.symbol);

  // Check if asset symbol is rendered
  const assetSymbol = screen.getByTestId("asset-symbol");
  expect(assetSymbol).toHaveTextContent(mockPool.asset.symbol);

  // Check if supplied amount is rendered
  const suppliedAmount = screen.getByTestId("supplied-amount");
  expect(suppliedAmount).toHaveTextContent("10.00 ETH");

  // Check if supplied value is rendered
  const suppliedValue = screen.getByTestId("supplied-value");
  expect(suppliedValue).toHaveTextContent("$1.00K");

  // Check if borrowed amount is rendered
  const borrowedAmount = screen.getByTestId("borrowed-amount");
  expect(borrowedAmount).toHaveTextContent("5.00 ETH");

  // Check if borrowed value is rendered
  const borrowedValue = screen.getByTestId("borrowed-value");
  expect(borrowedValue).toHaveTextContent("$500.00");

  // Check if health factor is rendered with correct class
  const healthFactorValue = screen.getByTestId("health-factor-value");
  expect(healthFactorValue).toHaveTextContent("3");
  expect(healthFactorValue).toHaveClass("text-warning");

  // Check if staked amount is rendered
  const stakedAmount = screen.getByTestId("staked-amount");
  expect(stakedAmount).toHaveTextContent("50.00 CHEDDA");

  // Check if staked value is rendered
  const stakedValue = screen.getByTestId("staked-value");
  expect(stakedValue).toHaveTextContent("$100.00");

  // Check if locked amount is rendered
  const lockedAmount = screen.getByTestId("locked-amount");
  expect(lockedAmount).toHaveTextContent("25.00 CHEDDA");

  // Check if locked value is rendered
  const lockedValue = screen.getByTestId("locked-value");
  expect(lockedValue).toHaveTextContent("$50.00");

  // Check if arrow forward icon is rendered
  const arrowForwardIcon = screen.getByTestId("arrow-forward");
  expect(arrowForwardIcon).toBeInTheDocument();
});
