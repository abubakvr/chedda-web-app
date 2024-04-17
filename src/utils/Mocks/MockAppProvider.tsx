import connectors from "@/connectors";
import { Web3ReactProvider } from "@web3-react/core";

export function MockAppProviders({ children }: { children: React.ReactNode }) {
  jest.mock("@web3-react/core", () => ({
    ...jest.requireActual("@web3-react/core"),
    Web3ReactProvider: jest.fn(({ children }) => <div>{children}</div>),
  }));

  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
