import { useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { getAddChainParameters } from "@/data/networks";
import { useEnvironment } from "./useEnviroment";

export function useSwitchChain() {
  const { chainId, connector } = useWeb3React();
  const { switchEnvironment } = useEnvironment();

  const switchChain = async (desiredChain: number) => {
    if (chainId && connector) {
      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(
          desiredChain === -1 ? undefined : desiredChain
        );
      } else {
        await connector.activate(
          desiredChain === -1 ? undefined : getAddChainParameters(desiredChain)
        );
      }
    }
    switchEnvironment(desiredChain);
  };

  return switchChain;
}
