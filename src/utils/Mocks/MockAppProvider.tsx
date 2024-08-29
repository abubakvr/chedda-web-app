import connectors from "@/connectors";
import { NonceProvider } from "@/contexts/NonceContext";
import { Web3ReactProvider } from "@web3-react/core";

export function MockAppProviders({ children }: { children: React.ReactNode }) {
  jest.mock("@web3-react/core", () => ({
    ...jest.requireActual("@web3-react/core"),
    Web3ReactProvider: jest.fn(({ children }) => <div>{children}</div>),
  }));

  return (
    <Web3ReactProvider connectors={connectors}>
      <NonceProvider nonce={"0cx90"}>{children}</NonceProvider>
    </Web3ReactProvider>
  );
}
