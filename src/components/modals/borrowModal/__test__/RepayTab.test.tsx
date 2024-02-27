import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RepayTab, RepayTabProps } from "../Tabs";
import { StaticImageData } from "next/image";
import { useEnvironment, useTransaction } from "@/hooks";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { mockCurrentEnvironment } from "@/utils/Mocks/MockTestData";
import { BigNumber } from "ethers";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 1,
    isActivating: false,
  })),
}));
jest.mock("../../../../hooks");
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
  allowance: BigNumber.from("390000000000000000000000000000000000"),
  tokenBalance: BigNumber.from("3900000000000000000000000000000000000000"),
  tokenCollateralValue: BigNumber.from("39000000000000000000000"),
  totalBorrowed: "1000",
  availableLiquidity: BigNumber.from("390000000000000000000"),
};
const mockRepayAsset = jest.fn().mockResolvedValue({ hash: "0x00" });
JSON.parse = jest.fn().mockReturnValue({
  errorMessage: "",
  fullText: "",
});

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
    (useEnvironment as jest.Mock).mockReturnValue({
      currentEnvironment: mockCurrentEnvironment,
      switchEnvironment: jest.fn(),
    });
  });
  it("renders BorrowTab component", async () => {
    render(<RepayTab {...mockProps} />);

    expect(screen.getByTestId("repay-tab-content")).toBeInTheDocument();
  });

  it("handles repaying asset", async () => {
    render(
      <MockAppProviders>
        <RepayTab {...mockProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "10" } });

    fireEvent.click(screen.getByText("Repay MOCK"));

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockRepayAsset).toHaveBeenCalled();
    });
  });

  it("renders borrow tab info section", async () => {
    render(
      <MockAppProviders>
        <RepayTab {...mockProps} />
      </MockAppProviders>
    );

    expect(screen.getByTestId("borrow-tab-info")).toBeInTheDocument();
  });
});
