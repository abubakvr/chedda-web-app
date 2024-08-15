import React from "react";
import BridgeCard, { IBridgeCardProps } from "../BridgeCard";
import { render, screen, waitFor } from "@testing-library/react";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { useBridge } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useLocalStorageGet } from "@/hooks";
import { ISourceChain, IToken } from "@/utils/types";
import { StaticImageData } from "next/image";

jest.mock("@web3-react/core", () => ({
  useWeb3React: jest.fn(),
}));

jest.mock("../../../../hooks", () => ({
  useBridge: jest.fn(() => ({
    quoteSend: jest.fn().mockResolvedValue([[]]),
    getTokenPrice: jest.fn(),
    getEthPrice: jest.fn(),
  })),
  useSwitchChain: jest.fn(),
  useLocalStorageGet: jest.fn(),
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

const mockUseBridge = {
  sendOFT: jest.fn(),
  quoteSend: jest.fn().mockResolvedValue([]),
  approveAsset: jest.fn(),
  getTokenPrice: jest.fn(),
  getTokenAllowance: jest.fn(),
  getTokenBalance: jest.fn(),
  getEthPrice: jest.fn(),
};

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/bridge"),
  useRouter: jest.fn(() => ({
    prefetch: jest.fn(),
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(),
}));

const props: IBridgeCardProps = {
  estimatedGasFee: {
    gasETHFee: 90,
    gasUSDFee: 20,
  },
  tokenDataLoading: false,
  allowance: 90,
  tokenPrice: 11,
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
  ] as IToken[],
  getEstimatedGas: () => {},
  fetchTokenData: () => {},
  selectedToken: {
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
    sourceLogo: {} as StaticImageData,
    color: "#26a17b",
  },
  selectedChain: {
    chainId: 5,
    key: "BNB",
    name: "Binance",
    logo: {} as StaticImageData,
    endpointId: 200,
    jsonRpcUrl: "https://bsc-dataseed.binance.org/",
    priceFeed: "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",
    ethAddress: "0x0000000000000000000000000000000000000000",
  } as ISourceChain,
  setSelectedToken: () => {},
  setSelectedChain: () => {},
};

describe("BridgeCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalStorageGet as jest.Mock).mockReturnValue("Base");
    (useBridge as jest.Mock).mockReturnValue(mockUseBridge);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === "screen") return null;
        return null;
      }),
    });
  });

  test("renders TokenSelect component when activeScreen is 'tokenselect'", async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key) => {
        if (key === "screen") return "tokenselect";
        return null;
      }),
    });
    render(
      <MockAppProviders>
        <BridgeCard {...props} />
      </MockAppProviders>
    );
    await waitFor(() => {
      expect(
        screen.getByText("Select a Network and Token")
      ).toBeInTheDocument();
    });
  });

  test("renders BridgeInput component when activeScreen is default", async () => {
    const customProps = { ...props, activeScreen: "" };
    render(
      <MockAppProviders>
        <BridgeCard {...customProps} />
      </MockAppProviders>
    );
    await waitFor(() => {
      expect(screen.getByTestId("bridge-input-title")).toHaveTextContent(
        "Transfer"
      );
    });
  });
});
