import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BorrowTab, BorrowTabProps } from "../Tabs";
import { StaticImageData } from "next/image";
import { BigNumber } from "ethers";
import { useTransaction } from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
jest.spyOn(window, "alert").mockImplementation(() => {});
jest.mock("../../../../hooks");
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
  accountCollateralAmount: BigNumber.from("50000000000000000000000"),
  totalCollateralValue: "50000000000000000000000",
  healthFactor: BigNumber.from("39000000000000000"),
  tokenValue: "1000",
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
  assetPrice: 100,
  tokenCollateralValue: BigNumber.from("390"),
  totalBorrowed: "1000",
  availableLiquidity: BigNumber.from("390000000000000000000"),
};

const mockBorrowAsset = jest.fn().mockResolvedValue({ hash: "0x00" });
JSON.parse = jest.fn().mockReturnValue({
  errorMessage: "",
  fullText: "",
});

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
    render(
      <MockAppProviders>
        <BorrowTab {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("withdraw-tab-content")).toBeInTheDocument();
    });
  });

  it("handles borrowing asset", async () => {
    render(
      <MockAppProviders>
        <BorrowTab {...mockProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    act(() => {
      fireEvent.change(amountInput, { target: { value: "10" } });
      fireEvent.click(screen.getByText("Borrow MOCK"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockBorrowAsset).toHaveBeenCalled();
    });
  });

  it("renders deposit tab section", async () => {
    render(
      <MockAppProviders>
        <BorrowTab {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("borrow-tab-info")).toBeInTheDocument();
    });
  });
});
