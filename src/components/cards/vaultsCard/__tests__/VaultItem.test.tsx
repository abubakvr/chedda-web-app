import React from "react";
import { render, screen } from "@testing-library/react";
import { VaultItem } from "../VaultItem";
import {
  formatAsPercentage,
  formatCurrency,
  formatLargeNumber,
} from "@/utils/formatters";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");

describe("VaultItem Component", () => {
  const mockPool = mockPoolStats[0];
  it("renders VaultItem component with correct data", () => {
    render(<VaultItem pool={mockPool} />);

    // Asset information
    expect(screen.getByTestId("asset-name")).toHaveAttribute(
      "alt",
      mockPool.asset.symbol
    );
    expect(screen.getByTestId("asset-symbol")).toHaveTextContent(
      mockPool.asset.symbol
    );

    // Collaterals information
    expect(screen.getAllByTestId("collateral-logo")).toHaveLength(
      mockPool.collaterals.length
    );
    expect(screen.getByTestId("collaterals-list")).toHaveTextContent(
      mockPool.collaterals.map((collateral) => collateral.symbol).join(",")
    );

    // Supplied information
    expect(screen.getByTestId("supplied")).toHaveTextContent(
      formatLargeNumber(mockPool.supplied) + " " + mockPool.asset.symbol
    );
    expect(screen.getByTestId("supplied-value")).toHaveTextContent(
      formatCurrency(mockPool.suppliedValue)
    );

    // Max Supply APY information
    expect(screen.getByTestId("max-supply-apy")).toHaveTextContent(
      formatAsPercentage(mockPool.maxSupplyAPY)
    );

    // Borrowed information
    expect(screen.getByTestId("borrowed")).toHaveTextContent(
      formatLargeNumber(mockPool.borrowed) + " " + mockPool.asset.symbol
    );
    expect(screen.getByTestId("borrowed-value")).toHaveTextContent(
      formatCurrency(mockPool.borrowedValue)
    );

    // Max Borrow APY information
    expect(screen.getByTestId("max-borrow-apy")).toHaveTextContent(
      formatAsPercentage(mockPool.maxBorrowAPY)
    );

    // Utilization information
    expect(screen.getByTestId("utilization")).toHaveTextContent(
      formatAsPercentage(mockPool.utilization)
    );

    expect(screen.getByTestId("rewards")).toHaveTextContent(
      formatAsPercentage(mockPool.rewardsAPY)
    );
  });
});
