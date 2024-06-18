import { WalletConnect } from "@web3-react/walletconnect-v2";

const mockConnector = new WalletConnect({
  actions: {
    startActivation: jest.fn(),
    update: jest.fn(),
    resetState: jest.fn(),
  },
  defaultChainId: 5,
  options: {
    metadata: {
      name: "Chedda Finance",
      description: "Cross-chain money market hub",
      url: "www.chedda.finance",
      icons: [],
    },
    projectId: "string",
    showQrModal: false,
    optionalChains: [5, 1],
  },
  timeout: 2000,
  onError: jest.fn(),
});

export const mockUseWeb3ReactData = {
  provider: undefined,
  connector: mockConnector,
  chainId: 5,
  accounts: ["0x737sddf68"],
  isActivating: false,
  account: "0x737sddf68000000000000000000000000000000000",
  isActive: false,
  ENSNames: [undefined],
  ENSName: undefined,
  hooks: {
    useSelectedStore: jest.fn(),
    useSelectedChainId: jest.fn(),
    useSelectedAccounts: jest.fn(),
    useSelectedIsActivating: jest.fn(),
    useSelectedAccount: jest.fn(),
    useSelectedIsActive: jest.fn(),
    useSelectedProvider: jest.fn(),
    useSelectedENSNames: jest.fn(),
    useSelectedENSName: jest.fn(),
    usePriorityConnector: jest.fn(),
    usePriorityStore: jest.fn(),
    usePriorityChainId: jest.fn(),
    usePriorityAccounts: jest.fn(),
    usePriorityIsActivating: jest.fn(),
    usePriorityAccount: jest.fn(),
    usePriorityIsActive: jest.fn(),
    usePriorityProvider: jest.fn(),
    usePriorityENSNames: jest.fn(),
    usePriorityENSName: jest.fn(),
  },
};
