import { render, screen } from "@testing-library/react";
import { MobileVaultItem } from "../MobileVaultItem";
import { mockPoolStats } from "@/utils/Mocks/MockTestData";

jest.mock("ethers");

describe("MobileVaultItem Component", () => {
  const pool = mockPoolStats[0];

  it("renders MobileVaultItem with pool data", () => {
    render(<MobileVaultItem pool={pool} />);

    // First row
    expect(screen.getByTestId("mobile-vault-item")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-asset-symbol")).toHaveTextContent(
      pool.asset.symbol
    );
    expect(screen.getByAltText(pool.asset.symbol)).toBeInTheDocument();

    // Collateral section
    pool.collaterals.forEach((collateral, i) => {
      expect(screen.getByAltText(collateral.symbol)).toBeInTheDocument();
      // Add more assertions for the collaterals section
    });

    // Second row
    expect(screen.getByText("Total Supply")).toBeInTheDocument();
    expect(screen.getByText(`${pool.maxSupplyAPY}%`)).toBeInTheDocument();

    expect(screen.getByText("Supply APY")).toBeInTheDocument();
    expect(screen.getByText(pool.supplied)).toBeInTheDocument();

    // Third row
    expect(screen.getByText("Total Borrow")).toBeInTheDocument();
    expect(screen.getByText(`${pool.maxBorrowAPY}%`)).toBeInTheDocument();

    expect(screen.getByText("Borrow APY")).toBeInTheDocument();
    expect(screen.getByText(pool.borrowed)).toBeInTheDocument();

    // Fourth row
    expect(screen.getByText("Utilization")).toBeInTheDocument();
    expect(screen.getByText(`${pool.utilization}%`)).toBeInTheDocument();
  });

  // Add more test cases as needed
});
