// Define a mock for CoinbaseWallet connector
const mockCoinbaseWalletConnector = {
  activate: jest.fn(),
  deactivate: jest.fn(),
  getProvider: jest.fn(),
};

// Define hooks for CoinbaseWallet
const mockCoinbaseWalletHooks = {
  useEagerConnect: jest.fn(),
  useInactiveListener: jest.fn(),
  useIsActivating: jest.fn(),
  useChainId: jest.fn(), // Added useChainId
  useAccounts: jest.fn(), // Added useAccounts
};

// Define a mock for MetaMask connector
const mockMetaMaskConnector = {
  activate: jest.fn(),
  deactivate: jest.fn(),
  getProvider: jest.fn(),
};

// Define hooks for MetaMask
const mockMetaMaskHooks = {
  useEagerConnect: jest.fn(),
  useInactiveListener: jest.fn(),
  useIsActivating: jest.fn(),
  useChainId: jest.fn(), // Added useChainId
  useAccounts: jest.fn(), // Added useAccounts
};

// Define a mock for Network connector
const mockNetworkConnector = {
  activate: jest.fn(),
  deactivate: jest.fn(),
  getProvider: jest.fn(),
};

// Define hooks for Network
const mockNetworkHooks = {
  useEagerConnect: jest.fn(),
  useInactiveListener: jest.fn(),
  useIsActivating: jest.fn(),
  useChainId: jest.fn(), // Added useChainId
  useAccounts: jest.fn(), // Added useAccounts
};

// Define a mock for WalletConnect connector
const mockWalletConnectConnector = {
  activate: jest.fn(),
  deactivate: jest.fn(),
  getProvider: jest.fn(),
};

// Define hooks for WalletConnect
const mockWalletConnectHooks = {
  useEagerConnect: jest.fn(),
  useInactiveListener: jest.fn(),
  useIsActivating: jest.fn(),
  useChainId: jest.fn(), // Added useChainId
  useAccounts: jest.fn(), // Added useAccounts
};

const mockConnectors: [any, any][] = [
  [mockMetaMaskConnector, mockMetaMaskHooks],
  [mockWalletConnectConnector, mockWalletConnectHooks],
  [mockCoinbaseWalletConnector, mockCoinbaseWalletHooks],
  [mockNetworkConnector, mockNetworkHooks],
];

export default mockConnectors;
