import React from "react";
import { render, waitFor } from "@testing-library/react";
import { TabInfo } from "../TabInfo";

describe("TabInfo", () => {
  it("renders with provided props", async () => {
    const props = {
      allowance: "$100",
      lockTime: {
        value: 30,
        days: 30,
      },
      maturityDate: "2024-05-01",
      lockedAmount: "100 ETH",
      projectedLockAmount: "120 ETH",
      projectedMaturityDate: "2024-06-01",
    };

    const { getByTestId, getByText } = render(<TabInfo {...props} />);
    await waitFor(() => {
      expect(getByTestId("lock-tab-info")).toBeInTheDocument();
      expect(getByTestId("allowance-label")).toHaveTextContent("Allowance");
      expect(getByTestId("allowance-value")).toHaveTextContent("$100");
      expect(getByTestId("projected-maturity-label")).toHaveTextContent(
        "Maturity Date"
      );
      expect(getByTestId("projected-maturity-value")).toHaveTextContent(
        "2024-06-01"
      );
      expect(getByText("Amount To Lock")).toBeInTheDocument();
      expect(getByText("100 ETH")).toBeInTheDocument();
      expect(getByText("120 ETH")).toBeInTheDocument();
    });
  });

  it("renders with projected maturity date if lock time value is defined", async () => {
    const props = {
      allowance: "$100",
      lockTime: {
        value: 30,
        days: 30,
      },
      maturityDate: "2024-05-01",
      lockedAmount: "100 ETH",
      projectedLockAmount: "120 ETH",
      projectedMaturityDate: "2024-06-01",
    };

    const { getByTestId } = render(<TabInfo {...props} />);

    await waitFor(() => {
      expect(getByTestId("projected-maturity-value")).toHaveTextContent(
        "2024-06-01"
      );
    });
  });

  it("renders with actual maturity date if lock time value is undefined", async () => {
    const props = {
      allowance: "$100",
      lockTime: {
        value: undefined,
        days: undefined,
      },
      maturityDate: "2024-05-01",
      lockedAmount: "100 ETH",
      projectedLockAmount: "120 ETH",
      projectedMaturityDate: "2024-06-01",
    };

    const { getByTestId } = render(<TabInfo {...props} />);

    await waitFor(() => {
      expect(getByTestId("projected-maturity-value")).toHaveTextContent(
        "2024-05-01"
      );
    });
  });
});
