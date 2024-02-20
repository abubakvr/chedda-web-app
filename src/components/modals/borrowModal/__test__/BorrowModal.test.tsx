import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BorrowModal, BorrowModalProps } from "../BorrowModal";
import { StaticImageData } from "next/image";
import {
  useAccountCollateral,
  useAccountHealth,
  useAllowance,
  useAvailableLiquidity,
  useSelectTokenBalance,
  useTokenCollateralValue,
  useTokenValue,
  useTransaction,
} from "@/hooks";
import { BigNumber } from "ethers";

jest.mock("ethers");
jest.mock("../../../../hooks");

const mockProps: BorrowModalProps = {
  isOpen: true,
  onClose: jest.fn(),
  asset: {
    name: "Ethereum",
    symbol: "ETH",
    address: "0xfed321",
    logo: {} as StaticImageData,
    decimals: 18,
    color: "#ffffff",
  },
  collaterals: [
    {
      name: "Ethereum",
      symbol: "ETH",
      address: "0xfed321",
      logo: {} as StaticImageData,
      decimals: 18,
      color: "#ffffff",
    },
  ],
  totalBorrowed: "20000",
  assetPrice: 90,
  fetchAccountInfo: jest.fn(),
  availableLiquidity: BigNumber.from("390"),
  openSupplyModal: jest.fn(),
};

describe("BorrowModal Component", () => {
  beforeEach(() => {
    (useAccountCollateral as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useAccountHealth as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useAllowance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));
    (useSelectTokenBalance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));
    (useTokenCollateralValue as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useTokenValue as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isApproved: false,
        isCollateralDeposited: false,
      },
      approveAsset: jest.fn(),
      depositCollateral: jest.fn(),
    }));
  });

  it("renders component with correct data-testid", () => {
    render(<BorrowModal {...mockProps} />);

    const modalContainer = screen.getByTestId("modal-container");
    expect(modalContainer).toBeInTheDocument();
  });

  it("renders Deposit tab by default", () => {
    render(<BorrowModal {...mockProps} />);

    const depositTab = screen.getByTestId("deposit-tab");
    expect(depositTab).toHaveClass("modal-button rounded");
  });

  it("switches to Borrow tab on tab click", async () => {
    render(<BorrowModal {...mockProps} />);

    const borrowTab = screen.getByTestId("borrow-tab");

    fireEvent.click(borrowTab);

    await waitFor(() => {
      expect(borrowTab).toHaveClass("modal-button rounded");
    });
  });
});
