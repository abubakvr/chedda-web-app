import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WithdrawTab } from "../Tabs/WithdrawTab";
import { StaticImageData } from "next/image";
import { useTransaction } from "@/hooks";
import { BigNumber } from "ethers";

jest.spyOn(window, "alert").mockImplementation(() => {});

// Mock the useTransaction hook
jest.mock("../../../../hooks", () => ({
  useTransaction: jest.fn(() => ({
    borrowTxStatus: {
      isLoading: false,
      isApproved: false,
      isCollaterDeposited: false,
      isCollaterWithdrawn: false,
    },
    withdrawCollateral: jest.fn(() => Promise.resolve()),
  })),
}));

// Mock the Toast component
jest.mock("../../../../components/ui", () => ({
  Toast: jest.fn(() => null),
}));

const mockProps = {
  selectedCollateral: {
    name: "Token3",
    symbol: "T3",
    address: "0xfed321",
    logo: {} as StaticImageData,
    decimals: 18,
    color: "#ffffff",
  },
  collaterals: [],
  isLoading: {},
  accountCollateral: {
    accountCollateralAmount: BigNumber.from("50000000000000000000000"),
    totalAccountCollateralValue: BigNumber.from(
      "500000000000000000000000000000"
    ),
  },
  healthFactor: BigNumber.from("5000000000000000000"),
  assetPrice: "5000",
  setSelectedCollateral: jest.fn(),
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
};

const mockWithdrawCollateral = jest.fn();

describe("WithdrawTab Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isApproved: false,
        isCollaterDeposited: false,
        isCollaterWithdrawn: false,
      },
      withdrawCollateral: mockWithdrawCollateral,
    }));
  });

  it("renders WithdrawTab component", async () => {
    render(<WithdrawTab {...mockProps} />);

    expect(screen.getByTestId("withdraw-tab-content")).toBeInTheDocument();
  });

  it("handles withdrawing collateral", async () => {
    render(<WithdrawTab {...mockProps} />);

    const amountInput = screen.getByTestId("amount-input");

    fireEvent.change(amountInput, { target: { value: "50" } });

    fireEvent.click(screen.getByText("Withdraw T3"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockWithdrawCollateral).toHaveBeenCalled();
    });
  });

  it("render deposit tab section", async () => {
    render(<WithdrawTab {...mockProps} />);

    expect(screen.getByTestId("modal-info")).toBeInTheDocument();
  });
});
