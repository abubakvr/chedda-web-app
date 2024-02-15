import React from "react";
import { render, screen } from "@testing-library/react";
import { DepositTabInfo, DepositTabInfoProps, BorrowTabInfo } from "../TabInfo";

describe("DepositTabInfo Component", () => {
  const mockProps: DepositTabInfoProps = {
    isLoading: false,
    symbol: "ETH",
    totalCollateralValue: "1000",
    projectedTotalCollateralValue: "1200",
    collateralAmount: "900",
    projectedCollateralAmount: "1100",
    healthFactor: "1.5",
    projectedHealthFactor: 1.7,
  };

  it("renders component with correct data-testid", () => {
    render(<DepositTabInfo {...mockProps} />);

    const component = screen.getByTestId("deposit-tab-info");
    expect(component).toBeInTheDocument();
  });

  it("renders symbol and collateral value correctly", () => {
    render(<DepositTabInfo {...mockProps} />);

    expect(screen.getByTestId("symbol-label")).toHaveTextContent(
      "ETH Collateral"
    );
    expect(screen.getByTestId("collateral-amount")).toHaveTextContent("900");
    expect(screen.getByTestId("projected-collateral-amount")).toHaveTextContent(
      "1100"
    );
    expect(screen.getByTestId("total-collateral-value")).toHaveTextContent(
      "1000"
    );

    expect(
      screen.getByTestId("projected-total-collateral-value")
    ).toHaveTextContent("1200");
    expect(screen.getByTestId("health-factor")).toHaveTextContent("1.5");
    expect(screen.getByTestId("projected-health-factor")).toHaveTextContent(
      "1.7"
    );
  });
});

describe("BorrowTabInfo Component", () => {
  const mockProps = {
    isLoading: false,
    totalBorrowed: "1000",
    collateralValue: "$5000",
    healthFactor: "2.5",
    liquidity: "$3000",
    projectedTotalBorrowed: "1500",
    projectedHealthFactor: 2.7,
    projectedLiquidity: "$2800",
  };

  it("renders BorrowTabInfo component", () => {
    render(<BorrowTabInfo {...mockProps} />);
    const component = screen.getByTestId("borrow-tab-info");
    expect(component).toBeInTheDocument();

    expect(screen.getByTestId("total-borrowed-label")).toHaveTextContent(
      "Borrowed"
    );
    expect(screen.getByTestId("total-borrowed")).toHaveTextContent("1000");
    expect(screen.getByTestId("projected-total-borrowed")).toHaveTextContent(
      "1500"
    );

    expect(screen.getByTestId("collateral-value-label")).toHaveTextContent(
      "Collateral Value"
    );
    expect(screen.getByTestId("collateral-value")).toHaveTextContent("$5000");

    expect(screen.getByTestId("health-factor-label")).toHaveTextContent(
      "Health Factor"
    );
    expect(screen.getByTestId("health-factor")).toHaveTextContent("2.5");
    expect(screen.getByTestId("projected-health-factor")).toHaveTextContent(
      "2.7"
    );

    expect(screen.getByTestId("liquidity-label")).toHaveTextContent(
      "Liquidity"
    );
    expect(screen.getByTestId("liquidity")).toHaveTextContent("$3000");
    expect(screen.getByTestId("projected-liquidity")).toHaveTextContent(
      "$2800"
    );
  });

  it("renders with loading state", () => {
    const loadingProps = { ...mockProps, isLoading: true };
    render(<BorrowTabInfo {...loadingProps} />);
    const component = screen.getByTestId("borrow-tab-info");
    expect(component).toBeInTheDocument();

    expect(screen.getByTestId("total-borrowed-label")).toHaveTextContent(
      "Borrowed"
    );
    expect(screen.getByTestId("total-borrowed")).toHaveTextContent("-");
    expect(screen.getByTestId("projected-total-borrowed")).toHaveTextContent(
      "-"
    );

    expect(screen.getByTestId("collateral-value-label")).toHaveTextContent(
      "Collateral Value"
    );
    expect(screen.getByTestId("collateral-value")).toHaveTextContent("-");

    expect(screen.getByTestId("health-factor-label")).toHaveTextContent(
      "Health Factor"
    );
    expect(screen.getByTestId("health-factor")).toHaveTextContent("-");
    expect(screen.getByTestId("projected-health-factor")).toHaveTextContent(
      "-"
    );

    expect(screen.getByTestId("liquidity-label")).toHaveTextContent(
      "Liquidity"
    );
    expect(screen.getByTestId("liquidity")).toHaveTextContent("-");
    expect(screen.getByTestId("projected-liquidity")).toHaveTextContent("-");
  });
});
