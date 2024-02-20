import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WithdrawTab, WithdrawTabProps } from "../Tabs/WithdrawTab";
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

const mockProps: WithdrawTabProps = {
  asset: {
    name: "Token1",
    symbol: "T1",
    address: "0xfed321",
    logo: {} as StaticImageData,
    decimals: 18,
    color: "#ffffff",
  },
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
  accountCollateralAmount: BigNumber.from("50000000000000000000000"),
  totalCollateralValue: "500000000000000000000000000000",
  healthFactor: BigNumber.from("5000000000000000000"),
  assetPrice: 5000,
  totalBorrowed: "9000",
  tokenValue: "9000",
  tokenCollateralValue: BigNumber.from("5000000000000000000"),
  setSelectedCollateral: jest.fn(),
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
  openSupplyModal: jest.fn(),
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

  it("blocks depositing asset if selected collateral is same as asset", async () => {
    let componentProps = mockProps;

    componentProps.selectedCollateral["symbol"] = "T1";

    render(<WithdrawTab {...componentProps} />);

    const amountInput = screen.getByTestId("amount-input");

    fireEvent.change(amountInput, { target: { value: "50" } });

    fireEvent.click(screen.getByText("Withdraw T1"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(screen.getByText("Withdraw T1")).toHaveAttribute("disabled");
    });
  });

  it("renders info tab section", async () => {
    render(<WithdrawTab {...mockProps} />);

    expect(screen.getByTestId("deposit-tab-info")).toBeInTheDocument();
  });
});
