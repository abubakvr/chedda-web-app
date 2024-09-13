import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { StaticImageData } from "next/image";
import { SupplyModal } from "../SupplyModal";
import {
  useAllowance,
  useAssetBalance,
  useAvailableLiquidity,
  useToast,
  useTokenBalance,
  useTransaction,
} from "@/hooks";

import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("../../../../hooks", () => ({
  ...jest.requireActual("../../../../hooks"), // Use the actual implementation of the hooks module
  useTransaction: jest.fn().mockImplementation(() => ({
    depositAsset: jest.fn(),
    approveAsset: jest.fn(),
    withdrawAsset: jest.fn(),
  })),
  useAllowance: jest.fn().mockReturnValue({
    isLoading: false,
    data: BigInt("10000000000000000000000000"),
  }),
  useAssetBalance: jest.fn().mockReturnValue({
    isLoading: false,
    data: BigInt("10000000000000000000000000"),
  }),
  useTokenBalance: jest.fn().mockReturnValue({
    isLoading: false,
    data: BigInt("1000000000000000000000"),
  }),
  useAvailableLiquidity: jest.fn(),
  useToast: jest.fn(),
  useSwitchChain: jest.fn(),
}));

jest.mock("chedda-sdk");

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 1,
    isActivating: false,
  })),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/markets"),
}));

jest.mock("../../../../data/environments", () => ({
  currentEnvironment: {
    chainId: 1,
  },
}));

const mockAsset = {
  name: "Token3",
  symbol: "T3",
  address: "0xfed321",
  logo: {} as StaticImageData,
  decimals: 18,
  color: "#ffffff",
  bridgeToken: false,
  bridgedOft: "0xbridgedOftAddress",
  sourceLogo: {} as StaticImageData,
};

const mockProps = {
  asset: mockAsset,
  assetPrice: 100,
  isOpen: true,
  tokenBalance: BigInt("100000000000000000000000000000"),
  baseSupplyAPY: "500000000000000000",
  supplied: BigInt("50000000000000000000000000000"),
  available: BigInt("30000000000000000000000000000"),
  onClose: jest.fn(),
  fetchPoolInfo: jest.fn(),
  setActivePoolTab: jest.fn(),
};

jest.spyOn(window, "alert").mockImplementation(() => {});

const MockDepositAsset = jest.fn();
const MockApproveAsset = jest.fn();
const MockWithdrawAsset = jest.fn();

describe("SupplyModal", () => {
  beforeEach(() => {
    (useAllowance as jest.Mock).mockReturnValue({
      isLoading: false,
      data: BigInt("10000000000000000000000"),
    });

    (useAssetBalance as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useTokenBalance as jest.Mock).mockReturnValue({
      isLoading: false,
      data: BigInt("10000000000000000000000000"),
    });
    (useAvailableLiquidity as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: "1000",
    }));

    (useTransaction as jest.Mock).mockImplementation(() => ({
      depositAsset: MockDepositAsset,
      approveAsset: MockApproveAsset,
      withdrawAsset: MockWithdrawAsset,
    }));
    (useToast as jest.Mock).mockImplementation(() => ({
      addToast: jest.fn(),
    }));
  });

  it("renders deposit tab content correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    waitFor(() => {
      // Check if the modal title is rendered
      expect(screen.getByTestId("supply-modal-title")).toHaveTextContent(
        "Supply Asset"
      );

      // Check if the deposit tab is initially active
      expect(screen.getByTestId("deposit-tab")).toHaveClass(
        "modal-button rounded"
      );

      // Check if the deposit content is rendered
      expect(screen.getByTestId("deposit-content")).toBeInTheDocument();

      // Check if the withdrawal content is not rendered
      expect(screen.queryByTestId("withdraw-content")).not.toBeInTheDocument();
    });
  });

  it("renders withdraw tab content correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    act(() => {
      // Switch to the Withdraw tab
      fireEvent.click(screen.getByTestId("withdraw-tab"));
    });

    waitFor(() => {
      // Check if the modal title is rendered
      expect(screen.getByTestId("supply-modal-title")).toHaveTextContent(
        "Supply Asset"
      );

      // Check if the Withdraw tab is now active
      expect(screen.getByTestId("withdraw-tab")).toHaveClass(
        "modal-button rounded"
      );

      // Check if the withdrawal content is rendered
      expect(screen.getByTestId("withdraw-content")).toBeInTheDocument();

      // Check if the deposit content is not rendered
      expect(screen.queryByTestId("deposit-content")).not.toBeInTheDocument();
    });
  });

  it("handles deposit action correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    // Check if the deposit tab is initially active
    expect(screen.getByTestId("deposit-tab")).toHaveClass(
      "modal-button rounded"
    );

    // Enter a valid supply amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    act(() => {
      // Type a value into the input
      fireEvent.input(input, { target: { value: "1000" } });

      // Click the deposit button
      fireEvent.click(screen.getByTestId("custom-button"));
    });

    // Ensure the success modal is opened
    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(MockDepositAsset).toHaveBeenCalled();
    });
  });

  it("handles approve action correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    // Check if the deposit tab is initially active
    expect(screen.getByTestId("deposit-tab")).toHaveClass(
      "modal-button rounded"
    );

    // Enter a valid supply amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    act(() => {
      // Type a value into the input
      fireEvent.input(input, { target: { value: "1000000000" } });

      // Click the deposit button
      fireEvent.click(screen.getByTestId("custom-button"));
    });

    // Ensure the success modal is opened
    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(MockApproveAsset).toHaveBeenCalled();
    });
  });

  it("handles withdraw action correctly", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    // Switch to the Withdraw tab
    fireEvent.click(screen.getByTestId("withdraw-tab"));

    // Check if the Withdraw tab is now active
    expect(screen.getByTestId("withdraw-tab")).toHaveClass(
      "modal-button rounded"
    );

    // Enter a valid withdraw amount
    const input = screen.queryByTestId("amount-input") as HTMLInputElement;

    // Type a value into the input
    fireEvent.input(input, { target: { value: "100000" } });

    // Click the withdraw button
    fireEvent.click(screen.getByText("Withdraw T3"));

    // Ensure the success modal is opened
    await waitFor(() => {
      expect(screen.getByTestId("loading-button-icon")).toBeInTheDocument();
      expect(MockWithdrawAsset).toHaveBeenCalled();
    });
  });

  it("displays error when trying to deposit invalid amount", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    const input = screen.getByTestId("amount-input") as HTMLInputElement;

    act(() => {
      fireEvent.input(input, { target: { value: "0" } });
      fireEvent.click(screen.getByText("Supply T3"));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Enter valid amount");
    });
  });

  it("displays error when trying to withdraw invalid amount", async () => {
    render(
      <MockAppProviders>
        <SupplyModal {...mockProps} />
      </MockAppProviders>
    );

    fireEvent.click(screen.getByTestId("withdraw-tab"));

    const input = screen.getByTestId("amount-input") as HTMLInputElement;

    act(() => {
      fireEvent.input(input, { target: { value: "0" } });
      fireEvent.click(screen.getByText("Withdraw T3"));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Enter valid amount");
    });
  });
});
