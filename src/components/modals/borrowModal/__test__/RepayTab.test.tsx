import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RepayTab, RepayTabProps } from "../Tabs";
import { StaticImageData } from "next/image";
import { BigNumber } from "ethers";
import { useTransaction } from "@/hooks";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("../../../../hooks", () => ({
  useTransaction: jest.fn(() => ({
    borrowTxStatus: {
      isLoading: false,
      isApproved: false,
      isAssetRepaid: false,
    },
    borrowAsset: jest.fn(() => Promise.resolve()),
  })),
}));

// Mock the Toast component
jest.mock("../../../../components/ui", () => ({
  Toast: jest.fn(() => null),
}));

const mockProps: RepayTabProps = {
  isLoading: {},
  asset: {
    name: "Token3",
    address: "mockAddress",
    decimals: 18,
    symbol: "MOCK",
    logo: {} as StaticImageData,
    color: "#ffffff",
  },
  accountCollateralAmount: BigNumber.from("50000000000000000000000"),
  totalCollateralValue: "1000",
  healthFactor: BigNumber.from("39000000000000000"),
  tokenValue: "1000",
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
  assetPrice: 100,
  allowance: BigNumber.from("390000000000000000000"),
  tokenBalance: BigNumber.from("390000000000000000000"),
  tokenCollateralValue: BigNumber.from("390"),
  totalBorrowed: "1000",
  availableLiquidity: BigNumber.from("390000000000000000000"),
};

const mockRepayAsset = jest.fn();

describe("RepayTab Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isApproved: false,
        isAssetRepaid: false,
      },
      repayAsset: mockRepayAsset,
    }));
  });
  it("renders BorrowTab component", async () => {
    render(<RepayTab {...mockProps} />);

    expect(screen.getByTestId("repay-tab-content")).toBeInTheDocument();
  });

  it("handles borrowing asset", async () => {
    render(<RepayTab {...mockProps} />);

    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "10" } });

    fireEvent.click(screen.getByText("Repay MOCK"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockRepayAsset).toHaveBeenCalled();
    });
  });

  it("renders borrow tab info section", async () => {
    render(<RepayTab {...mockProps} />);

    expect(screen.getByTestId("borrow-tab-info")).toBeInTheDocument();
  });
});
