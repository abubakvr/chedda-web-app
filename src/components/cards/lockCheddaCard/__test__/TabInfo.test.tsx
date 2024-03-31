import React from "react";
import { render } from "@testing-library/react";
import { TabInfo } from "../TabInfo";

describe("TabInfo Component", () => {
  test("renders TabInfo component when Chedda is not locked", () => {
    const props = {
      allowance: "100",
      amountToLock: "50",
      maturityDate: "2024-04-01",
      lockedAmount: "3000",
      projectedMaturityDate: "2024-04-01",
      isCheddaLocked: false,
    };

    const { getByTestId } = render(<TabInfo {...props} />);

    expect(getByTestId("lock-tab-info")).toBeInTheDocument();
    expect(getByTestId("allowance-label")).toHaveTextContent("Allowance");
    expect(getByTestId("allowance-value")).toHaveTextContent("100");
    expect(getByTestId("amount-to-lock-label")).toHaveTextContent(
      "Amount to Lock"
    );
    expect(getByTestId("amount-to-lock-value")).toHaveTextContent("50");
    expect(getByTestId("projected-maturity-label")).toHaveTextContent(
      "Maturity Date"
    );
    expect(getByTestId("projected-maturity-value")).toHaveTextContent(
      "2024-04-01"
    );
  });

  test("renders TabInfo component when Chedda is locked", () => {
    const props = {
      allowance: "",
      amountToLock: "",
      maturityDate: "2024-04-01",
      lockedAmount: "50",
      projectedMaturityDate: "",
      isCheddaLocked: true,
    };

    const { getByTestId } = render(<TabInfo {...props} />);

    expect(getByTestId("lock-tab-info")).toBeInTheDocument();
    expect(getByTestId("locked-amount-label")).toHaveTextContent(
      "Locked Amount"
    );
    expect(getByTestId("locked-amount-value")).toHaveTextContent("50");
    expect(getByTestId("maturity-label")).toHaveTextContent("Maturity Date");
    expect(getByTestId("maturity-value")).toHaveTextContent("2024-04-01");
  });
});
