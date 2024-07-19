import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { WithdrawTab, WithdrawTabProps } from "../Tabs/WithdrawTab";
import { StaticImageData } from "next/image";
import { useTransaction } from "@/hooks";

import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 84532,
    isActivating: false,
  })),
}));
jest.spyOn(window, "alert").mockImplementation(() => {});
jest.mock("../../../../hooks");
jest.mock("../../../../components/ui", () => ({
  Toast: jest.fn(() => null),
  Button: jest.fn(() => null),
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
  accountCollateralAmount: BigInt("50000000000000000000000"),
  totalCollateralValue: 500000000000000000000000000000,
  healthFactor: BigInt("5000000000000000000"),
  assetPrice: 5000,
  totalBorrowed: 9000,
  tokenValue: 9000,
  tokenCollateralValue: BigInt("5000000000000000000"),
  setSelectedCollateral: jest.fn(),
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
  openSupplyModal: jest.fn(),
};

const mockWithdrawCollateral = jest.fn().mockResolvedValue({ hash: "0x00" });
JSON.parse = jest.fn().mockReturnValue({
  errorMessage: "",
  fullText: "",
});

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
    render(
      <MockAppProviders>
        <WithdrawTab {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("withdraw-tab-content")).toBeInTheDocument();
    });
  });

  it("handles withdrawing collateral", async () => {
    render(
      <MockAppProviders>
        <WithdrawTab {...mockProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input");

    act(() => {
      fireEvent.change(amountInput, { target: { value: "50" } });
      fireEvent.click(screen.getByText("Withdraw T3"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockWithdrawCollateral).toHaveBeenCalled();
    });
  });

  it("blocks depositing asset if selected collateral is same as asset", async () => {
    let componentProps = mockProps;

    componentProps.selectedCollateral["symbol"] = "T1";

    render(
      <MockAppProviders>
        <WithdrawTab {...componentProps} />
      </MockAppProviders>
    );

    act(() => {
      const amountInput = screen.getByTestId("amount-input");
      fireEvent.change(amountInput, { target: { value: "50" } });
      fireEvent.click(screen.getByText("Withdraw T1"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(screen.getByTestId("custom-button")).toHaveAttribute("disabled");
    });
  });

  it("renders info tab section", async () => {
    render(
      <MockAppProviders>
        <WithdrawTab {...mockProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByTestId("deposit-tab-info")).toBeInTheDocument();
    });
  });
});
