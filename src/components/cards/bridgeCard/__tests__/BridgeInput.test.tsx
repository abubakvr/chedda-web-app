import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useBridge, useSwitchChain } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { BridgeInput } from "../BridgeInput";
import { IBridgeChain, IConfigToken } from "@/utils/types";
import { StaticImageData } from "next/image";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { WalletConnect } from "@web3-react/walletconnect-v2";

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

jest.mock("../../../../hooks", () => ({
  useBridge: jest.fn(),
  useSwitchChain: jest.fn(),
}));

jest.mock("@web3-react/core", () => ({
  ...jest.requireActual("@web3-react/core"),
  useWeb3React: jest.fn(() => ({
    account: "0x123",
    connector: WalletConnect as any,
    chainId: 4,
    isActivating: false,
  })),
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(() => "/bridge"),
}));

const mockUseBridge = {
  sendOFT: jest.fn(),
  approveAsset: jest.fn(),
  getTokenPrice: jest.fn(),
  getTokenAllowance: jest.fn(),
  quoteSend: jest.fn(),
  getTokenBalance: jest.fn(),
  getEthPrice: jest.fn(),
};
const mockUseSwitchChain = jest.fn();

const defaultProps = {
  selectedChain: {
    chainId: 1,
    key: "ETH",
    name: "Ethereum",
    logo: {} as StaticImageData,
    endpointId: 100,
    jsonRpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    priceFeed: "https://api.etherscan.io/api?module=stats&action=ethprice",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as IBridgeChain,
  selectedToken: {
    address: "0x123",
    symbol: "USDT",
    decimals: 18,
    source: "ETH",
    type: "OFT",
    oftAdapter: "0x456",
    bridgeToken: true,
    bridgedOft: "0x789",
    name: "Tether USD",
    logo: {} as StaticImageData,
    color: "#26a17b",
  } as IConfigToken,
  tokenList: [
    {
      address: "0x123",
      symbol: "USDT",
      decimals: 18,
      source: "ETH",
      type: "oftAdapter",
      oftAdapter: "0x456",
      bridgeToken: true,
      bridgedOft: "0x789",
      name: "Tether USD",
      logo: {} as StaticImageData,
      color: "#26a17b",
    },
  ] as IConfigToken[],
  fetchTokenBalanceLoading: false,
  tokenBalances: { "0x123": 1000 },
  estimatedGasFee: { gasETHFee: 0.01, gasUSDFee: 5 },
  tokenDataLoading: false,
  allowance: 0,
  tokenPrice: 120,
  destinationChain: {
    chainId: 5,
    key: "BNB",
    name: "Binance",
    logo: {} as StaticImageData,
    endpointId: 200,
    jsonRpcUrl: "https://bsc-dataseed.binance.org/",
    priceFeed: "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as IBridgeChain,
  handleActiveScreen: jest.fn(),
  switchToSelectedChain: jest.fn(),
  fetchBalances: jest.fn(),
  getEstimatedGas: jest.fn(),
  fetchTokenData: jest.fn(),
};

const mockApproveAdapter = jest.fn();

describe("BridgeInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWeb3React as jest.Mock).mockReturnValue({
      account: "0xABC",
      chainId: 1,
    });
    (useBridge as jest.Mock).mockReturnValue(mockUseBridge);
    (useSwitchChain as jest.Mock).mockReturnValue(mockUseSwitchChain);
  });

  test("renders BridgeInput component correctly", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByText("Transfer")).toBeInTheDocument();
      expect(screen.getByText("From")).toBeInTheDocument();
      expect(screen.getByText("To")).toBeInTheDocument();
      expect(screen.getByText("Select Amount:")).toBeInTheDocument();
      expect(screen.getByText("Summary")).toBeInTheDocument();
    });
  });

  test("renders the component correctly", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(screen.getByTestId("bridge-input-title")).toHaveTextContent(
        "Transfer"
      );
      expect(screen.getByTestId("bridge-input-chains")).toBeInTheDocument();
      expect(
        screen.getByTestId("bridge-input-amount-section")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("bridge-input-summary-title")
      ).toHaveTextContent("Summary");
    });
  });

  test("calls handleChainSwitch when the refresh button is clicked", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    fireEvent.click(screen.getByTestId("bridge-input-refresh-button"));
    await waitFor(() => {
      expect(defaultProps.switchToSelectedChain).toHaveBeenCalledWith(
        defaultProps.destinationChain
      );
      expect(defaultProps.fetchBalances).toHaveBeenCalled();
    });
  });

  test("handles amount input change", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    const amountInput = screen
      .getByTestId("bridge-input-amount-field")
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: "500" } });

    await waitFor(() => {
      expect(amountInput.value).toBe("500");
    });
  });

  test("displays the correct summary information", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    const amountInput = screen
      .getByTestId("bridge-input-amount-field")
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: "500" } });

    await waitFor(() => {
      expect(screen.getByText("500.00 USDT ($60,000.00)")).toBeInTheDocument();
      expect(screen.getByText("0.01 ETH ($5.00)")).toBeInTheDocument();
    });
  });

  test("displays the correct balance and token symbols", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );
    await waitFor(() => {
      expect(screen.getByText("Balance: 1,000.00 USDT")).toBeInTheDocument();
    });
  });

  test("calls handleBridgeToken when the bridge button is clicked", async () => {
    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    const amountInput = screen
      .getByTestId("bridge-input-amount-field")
      .querySelector("input") as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "500" } });
    fireEvent.click(screen.getByTestId("custom-button"));

    await waitFor(() => {
      expect(screen.getByText("Confirmation")).toBeInTheDocument();
    });
  });

  test("displays wrong network message and switch button", async () => {
    (useWeb3React as jest.Mock).mockImplementation(() => ({
      account: "0x123",
      connector: WalletConnect as any,
      chainId: 2,
      isActivating: false,
    }));

    render(
      <MockAppProviders>
        <BridgeInput {...defaultProps} />
      </MockAppProviders>
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("bridge-input-wrong-network")
      ).toHaveTextContent("You are on the wrong network. Switch to Ethereum");
    });
  });

  test("handle approve token button click", async () => {
    (useBridge as jest.Mock).mockImplementation(() => ({
      approveAsset: mockApproveAdapter,
      getTokenPrice: jest.fn(),
      getTokenAllowance: jest.fn(),
      quoteSend: jest.fn(),
      getTokenBalance: jest.fn(),
      getEthPrice: jest.fn(),
    }));

    const approveProps = {
      ...defaultProps,
      selectedToken: {
        ...defaultProps.selectedToken,
        type: "oftAdapter",
      },
    };

    render(
      <MockAppProviders>
        <BridgeInput {...approveProps} />
      </MockAppProviders>
    );

    const amountInput = screen
      .getByTestId("bridge-input-amount-field")
      .querySelector("input") as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "500" } });
    fireEvent.click(screen.getByRole("button", { name: /Approve/i }));

    await waitFor(() => {
      expect(mockApproveAdapter).toHaveBeenCalled();
    });
  });
});
