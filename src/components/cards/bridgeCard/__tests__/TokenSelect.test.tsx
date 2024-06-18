import { MockAppProviders } from "@/utils/Mocks/MockAppProvider";
import { IConfigToken } from "@/utils/types";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { StaticImageData } from "next/image";
import { TokenSelect } from "../TokenSelect";

const mockTokenList = [
  {
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
  },
  {
    address: "0x003",
    symbol: "DAI",
    decimals: 18,
    source: "ETH",
    type: "OFT",
    oftAdapter: "0x451",
    bridgeToken: true,
    bridgedOft: "0x781",
    name: "DAI",
    logo: {} as StaticImageData,
    color: "#26a17b",
  },
  {
    address: "0x004",
    symbol: "SAND",
    decimals: 18,
    source: "ETH",
    type: "OFT",
    oftAdapter: "0x450",
    bridgeToken: true,
    bridgedOft: "0x780",
    name: "SAND",
    logo: {} as StaticImageData,
    color: "#26a17b",
  },
];

const mockSelectedChain = {
  chainId: 1,
  key: "ETH",
  name: "Ethereum",
  logo: {} as StaticImageData,
  endpointId: 100,
  jsonRpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
  priceFeed: "https://api.etherscan.io/api?module=stats&action=ethprice",
  ethAddress: "0x0000000000000000000000000000000000000000",
};

const mockSelectedToken = {
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
} as IConfigToken; // Assuming the first token is selected initially
const mockFetchTokenBalanceLoading = false;
const mockTokenBalances = { "0x...": 100 }; // Mock token balances
const mockHandleActiveScreen = jest.fn();
const mockSwitchToSelectedChain = jest.fn();
const mockSetSelectedToken = jest.fn();

describe("TokenSelect component", () => {
  //   it("renders without crashing", () => {
  //     render(
  //       <MockAppProviders>
  //         <TokenSelect
  //           selectedChain={mockSelectedChain}
  //           tokenList={mockTokenList}
  //           selectedToken={mockSelectedToken}
  //           fetchTokenBalanceLoading={mockFetchTokenBalanceLoading}
  //           tokenBalances={mockTokenBalances}
  //           handleActiveScreen={mockHandleActiveScreen}
  //           switchToSelectedChain={mockSwitchToSelectedChain}
  //           setSelectedToken={mockSetSelectedToken}
  //         />
  //       </MockAppProviders>
  //     );
  //   });

  it("renders back button", async () => {
    const { getByTestId } = render(
      <MockAppProviders>
        <TokenSelect
          selectedChain={mockSelectedChain}
          tokenList={mockTokenList}
          selectedToken={mockSelectedToken}
          fetchTokenBalanceLoading={mockFetchTokenBalanceLoading}
          tokenBalances={mockTokenBalances}
          handleActiveScreen={mockHandleActiveScreen}
          switchToSelectedChain={mockSwitchToSelectedChain}
          setSelectedToken={mockSetSelectedToken}
        />
      </MockAppProviders>
    );
    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(mockHandleActiveScreen).toHaveBeenCalledWith("bridge");
    });
  });

  it("renders token list without search input", async () => {
    const { getByTestId, getAllByTestId } = render(
      <MockAppProviders>
        <TokenSelect
          selectedChain={mockSelectedChain}
          tokenList={mockTokenList}
          selectedToken={mockSelectedToken}
          fetchTokenBalanceLoading={mockFetchTokenBalanceLoading}
          tokenBalances={mockTokenBalances}
          handleActiveScreen={mockHandleActiveScreen}
          switchToSelectedChain={mockSwitchToSelectedChain}
          setSelectedToken={mockSetSelectedToken}
        />
      </MockAppProviders>
    );
    const tokenList = getAllByTestId("token-list-item");
    await waitFor(() => {
      expect(tokenList.length).toBe(mockTokenList.length);
    });
  });

  it("filters token list based on search input", async () => {
    const { getByTestId, getAllByTestId } = render(
      <MockAppProviders>
        <TokenSelect
          selectedChain={mockSelectedChain}
          tokenList={mockTokenList}
          selectedToken={mockSelectedToken}
          fetchTokenBalanceLoading={mockFetchTokenBalanceLoading}
          tokenBalances={mockTokenBalances}
          handleActiveScreen={mockHandleActiveScreen}
          switchToSelectedChain={mockSwitchToSelectedChain}
          setSelectedToken={mockSetSelectedToken}
        />
      </MockAppProviders>
    );

    const searchInput = getByTestId("search-input-field");
    fireEvent.change(searchInput, { target: { value: "SAND" } });

    await waitFor(() => {
      const filteredTokenList = getAllByTestId("token-list-item");
      expect(filteredTokenList.length).toBe(1);
    });
  });
});
