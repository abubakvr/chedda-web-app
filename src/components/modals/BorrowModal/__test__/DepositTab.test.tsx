import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DepositTab } from "../DepositTab";
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
    },
    depositCollateral: jest.fn(() => Promise.resolve()),
    approveAsset: jest.fn(() => Promise.resolve()),
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
  allowance: BigNumber.from("50000000000000000000000000"),
  accountCollateral: undefined,
  tokenBalance: BigNumber.from("50000000000000000000000"),
  healthFactor: BigNumber.from("5000000000000000000"),
  assetPrice: "5000",
  setSelectedCollateral: jest.fn(),
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
};

const mockDepositCollateral = jest.fn();
const mockApproveCollateral = jest.fn();

// Mock other dependencies as needed

describe("DepositTab Component", () => {
  beforeEach(() => {
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isApproved: false,
        isCollateralDeposited: false,
      },
      approveAsset: mockApproveCollateral,
      depositCollateral: mockDepositCollateral,
    }));
  });

  it("renders DepositTab component", async () => {
    render(<DepositTab {...mockProps} />);

    expect(screen.getByTestId("deposit-tab-content")).toBeInTheDocument();
  });

  it("handles approving collateral", async () => {
    const customProps = {
      ...mockProps,
      allowance: BigNumber.from("500000000000000000"),
    };
    render(<DepositTab {...customProps} />);

    const amountInput = screen.getByTestId("amount-input");

    fireEvent.change(amountInput, { target: { value: "50" } });

    fireEvent.click(screen.getByText("Approve T3"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockApproveCollateral).toHaveBeenCalled();
    });
  });

  it("handles depositing collateral", async () => {
    render(<DepositTab {...mockProps} />);

    const amountInput = screen.getByTestId("amount-input");

    fireEvent.change(amountInput, { target: { value: "50" } });

    fireEvent.click(screen.getByText("Deposit T3"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockDepositCollateral).toHaveBeenCalled();
    });
  });

  it("render deposit tab section", async () => {
    render(<DepositTab {...mockProps} />);

    expect(screen.getByTestId("modal-info")).toBeInTheDocument();
  });
});
