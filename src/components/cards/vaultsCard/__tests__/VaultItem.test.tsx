import React from "react";
import { render, screen } from "@testing-library/react";
import { VaultItem } from "../VaultItem";
import { formatAsPercentage, formatCurrency } from "@/utils/formatters";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

describe("VaultItem Component", () => {
  const mockPool = mockPoolStats[0];

  it("renders VaultItem in list view with correct data", () => {
    render(<VaultItem layout="list" pool={mockPool} />);

    // Asset information
    expect(screen.getByTestId("asset-name-list")).toHaveAttribute(
      "alt",
      mockPool.asset.symbol
    );
    expect(screen.getByTestId("asset-symbol-list")).toHaveTextContent(
      mockPool.asset.symbol
    );

    // Check APR values
    expect(screen.getByTestId("max-supply-a")).toHaveTextContent(
      formatAsPercentage(mockPool.maxSupplyAPY)
    );
    expect(screen.getByTestId("max-borrow-apy-list")).toHaveTextContent(
      formatAsPercentage(mockPool.maxBorrowAPY)
    );

    // Check values
    expect(screen.getByTestId("supplied-value")).toHaveTextContent(
      formatCurrency(mockPool.suppliedValue)
    );
    expect(screen.getByTestId("borrowed-value")).toHaveTextContent(
      formatCurrency(mockPool.borrowedValue)
    );

    // Check collaterals
    const collateralLogos = screen.getAllByTestId("collateral-logo-list");
    expect(collateralLogos.length).toBeGreaterThan(0);
  });

  it("renders VaultItem in grid view with correct data", () => {
    render(<VaultItem layout="grid" pool={mockPool} />);

    // Asset information
    expect(screen.getByTestId("asset-name-list-mobile")).toHaveAttribute(
      "alt",
      mockPool.asset.symbol
    );
    expect(screen.getByTestId("asset-symbol-list-mobile")).toHaveTextContent(
      mockPool.asset.symbol
    );

    // Check APR values
    expect(screen.getByTestId("max-supply-a-mobile")).toHaveTextContent(
      formatAsPercentage(mockPool.maxSupplyAPY)
    );
    expect(screen.getByTestId("max-borrow-apy-list-mobile")).toHaveTextContent(
      formatAsPercentage(mockPool.maxBorrowAPY)
    );

    // Check values
    expect(screen.getByTestId("supplied-value-mobile")).toHaveTextContent(
      formatCurrency(mockPool.suppliedValue)
    );
    expect(screen.getByTestId("borrowed-value-mobile")).toHaveTextContent(
      formatCurrency(mockPool.borrowedValue)
    );

    // Check collaterals
    const collateralLogos = screen.getAllByTestId(
      "collateral-logo-list-mobile"
    );
    expect(collateralLogos.length).toBeGreaterThan(0);
  });
});
