import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BorrowModal, BorrowModalProps } from "../BorrowModal";
import { StaticImageData } from "next/image";
import {
  useAccountCollateral,
  useAccountHealth,
  useAllowance,
  useAvailableLiquidity,
  useEnvironment,
  useSelectTokenBalance,
  useTokenCollateralValue,
  useTokenValue,
  useTransaction,
} from "@/hooks";
import { BigNumber } from "ethers";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
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
  totalCollateralValue: "1000",
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
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
    (useTransaction as jest.Mock).mockImplementation(() => ({
      borrowTxStatus: {
        isLoading: false,
        isApproved: false,
        isCollateralDeposited: false,
      },
      approveAsset: jest.fn().mockResolvedValue({ hash: "0x00" }),
      depositCollateral: jest.fn().mockResolvedValue({ hash: "0x00" }),
    }));
  });

  it("renders component with correct data-testid", () => {
    render(
      <MockAppProviders>
        <BorrowModal {...mockProps} />
      </MockAppProviders>
    );

    const modalContainer = screen.getByTestId("modal-container");

    waitFor(() => {
      expect(modalContainer).toBeInTheDocument();
    });
  });

  it("renders Deposit tab by default", () => {
    render(
      <MockAppProviders>
        <BorrowModal {...mockProps} />
      </MockAppProviders>
    );

    const depositTab = screen.getByTestId("deposit-tab");
    waitFor(() => {
      expect(depositTab).toHaveClass("modal-button rounded");
    });
  });

  it("switches to Borrow tab on tab click", async () => {
    render(
      <MockAppProviders>
        <BorrowModal {...mockProps} />
      </MockAppProviders>
    );

    const borrowTab = screen.getByTestId("borrow-tab");

    act(() => {
      fireEvent.click(borrowTab);
    });

    await waitFor(() => {
      expect(borrowTab).toHaveClass("modal-button rounded");
    });
  });
});
