import React from "react";
import { render, screen } from "@testing-library/react";
import { TabInfo, TabInfoProps } from "../TabInfo";

describe("TabInfo", () => {
  const testProps: TabInfoProps = {
    allowance: "100",
    exchangeRate: "1.5",
    myStake: "50",
  };

  it("renders without crashing", () => {
    render(<TabInfo {...testProps} />);
  });

  it("displays the provided props correctly", () => {
    render(<TabInfo {...testProps} />);

    // Check if allowance label and value are rendered correctly
    expect(screen.getByTestId("allowance-label")).toHaveTextContent(
      "Allowance"
    );
    expect(screen.getByTestId("allowance-value")).toHaveTextContent(
      testProps.allowance
    );

    // Check if exchange rate label and value are rendered correctly
    expect(screen.getByTestId("exchange-rate-label")).toHaveTextContent(
      "Exchange Rate"
    );
    expect(screen.getByTestId("exchange-rate-value")).toHaveTextContent(
      testProps.exchangeRate
    );

    // Check if my stake label and value are rendered correctly
    expect(screen.getByTestId("my-stake-label")).toHaveTextContent("My Stake");
    expect(screen.getByTestId("my-stake-value")).toHaveTextContent(
      testProps.myStake
    );
  });
});
