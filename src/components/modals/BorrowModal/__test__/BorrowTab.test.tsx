import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BorrowTab, BorrowTabProps } from "../Tabs";
import { StaticImageData } from "next/image";
import { BigNumber } from "ethers";
import { useTransaction } from "@/hooks";

jest.spyOn(window, "alert").mockImplementation(() => {});

jest.mock("../../../../hooks", () => ({
  useTransaction: jest.fn(() => ({
    borrowTxStatus: {
      isLoading: false,
      isAssetBorrowed: false,
    },
    borrowAsset: jest.fn(() => Promise.resolve()),
  })),
}));

// Mock the Toast component
jest.mock("../../../../components/ui", () => ({
  Toast: jest.fn(() => null),
}));

const mockProps: BorrowTabProps = {
  isLoading: {},
  asset: {
    name: "Token3",
    address: "mockAddress",
    decimals: 18,
    symbol: "MOCK",
    logo: {} as StaticImageData,
    color: "#ffffff",
  },
  accountCollateral: {
    totalAccountCollateralValue: BigNumber.from("50000000000000000000000"),
  },
  healthFactor: BigNumber.from("39000000000000000"),
  tokenValue: "1000",
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
  assetPrice: 100,
  tokenCollateralValue: BigNumber.from("390"),
  totalBorrowed: "1000",
  availableLiquidity: BigNumber.from("390000000000000000000"),
};

const mockBorrowAsset = jest.fn();

describe("BorrowTab Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isAssetBorrowed: false,
      },
      borrowAsset: mockBorrowAsset,
    }));
  });
  it("renders BorrowTab component", async () => {
    render(<BorrowTab {...mockProps} />);

    expect(screen.getByTestId("withdraw-tab-content")).toBeInTheDocument();
  });

  it("handles borrowing asset", async () => {
    render(<BorrowTab {...mockProps} />);

    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "10" } });

    fireEvent.click(screen.getByText("Borrow MOCK"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockBorrowAsset).toHaveBeenCalled();
    });
  });

  it("renders deposit tab section", async () => {
    render(<BorrowTab {...mockProps} />);

    expect(screen.getByTestId("borrow-tab-info")).toBeInTheDocument();
  });
});
