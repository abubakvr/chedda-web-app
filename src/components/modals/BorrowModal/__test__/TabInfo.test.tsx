import React from "react";
import { render, screen } from "@testing-library/react";
import {
  DepositTabInfo,
  DepositTabInfoProps,
  WithdrawInfoProps,
  WithdrawTabInfo,
} from "../TabInfo";

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
