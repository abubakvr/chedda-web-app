import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { DepositTab, DepositTabProps } from "../Tabs";
import { StaticImageData } from "next/image";
import { useTransaction } from "@/hooks";
import { BigNumber } from "ethers";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    chainId: 84532,
    isActivating: false,
  })),
}));
jest.mock("../../../../hooks");
jest.mock("../../../../components/ui", () => ({
  Toast: jest.fn(() => null),
}));

const mockProps: DepositTabProps = {
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
  allowance: BigNumber.from("50000000000000000000000000"),
  accountCollateralAmount: BigNumber.from("50000000000000000000000"),
  totalCollateralValue: 1000,
  tokenBalance: BigNumber.from("50000000000000000000000"),
  healthFactor: BigNumber.from("5000000000000000000"),
  assetPrice: 5000,
  totalBorrowed: 9000,
  tokenValue: 9000,
  tokenCollateralValue: BigNumber.from("5000000000000000000"),
  setSelectedCollateral: jest.fn(),
  fetchAllowance: jest.fn(),
  refreshModal: jest.fn(),
  openSupplyModal: jest.fn(),
};

const mockDepositCollateral = jest.fn().mockResolvedValue({ hash: "0x00" });
const mockApproveCollateral = jest.fn().mockResolvedValue({ hash: "0x00" });
JSON.parse = jest.fn().mockReturnValue({
  errorMessage: "",
  fullText: "",
});

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
    render(
      <MockAppProviders>
        <DepositTab {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("deposit-tab-content")).toBeInTheDocument();
    });
  });

  it("handles approving collateral", async () => {
    const customProps = {
      ...mockProps,
      allowance: BigNumber.from("500000000000000000"),
    };
    render(
      <MockAppProviders>
        <DepositTab {...customProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input");

    act(() => {
      fireEvent.change(amountInput, { target: { value: "50" } });
      fireEvent.click(screen.getByText("Approve T3"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockApproveCollateral).toHaveBeenCalled();
    });
  });

  it("handles depositing collateral", async () => {
    render(
      <MockAppProviders>
        <DepositTab {...mockProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input");

    act(() => {
      fireEvent.change(amountInput, { target: { value: "50" } });
      fireEvent.click(screen.getByText("Deposit T3"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(mockDepositCollateral).toHaveBeenCalled();
    });
  });

  it("blocks depositing asset if selected collateral is same as asset", async () => {
    let componentProps = mockProps;

    componentProps.selectedCollateral["symbol"] = "T1";
    render(
      <MockAppProviders>
        <DepositTab {...componentProps} />
      </MockAppProviders>
    );

    const amountInput = screen.getByTestId("amount-input");

    act(() => {
      fireEvent.change(amountInput, { target: { value: "50" } });
      fireEvent.click(screen.getByText("Deposit T1"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(screen.getByText("Deposit T1")).toHaveAttribute("disabled");
    });
  });

  it("renders deposit info tab section", async () => {
    render(
      <MockAppProviders>
        <DepositTab {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      expect(screen.getByTestId("deposit-tab-info")).toBeInTheDocument();
    });
  });
});
