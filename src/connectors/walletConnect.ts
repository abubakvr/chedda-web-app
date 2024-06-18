import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import { CHAINS } from "../data/networks";

const [mainnet, ...optionalChains] = Object.keys(CHAINS).map(Number);

const projectId = process.env.WALLECONNECT_PROJECT_ID ?? "";

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        metadata: {
          name: "Chedda Finance",
          description: "Cross-chain money market hub",
          url: "www.chedda.finance",
          icons: [],
        },
        projectId: projectId,
        chains: [mainnet],
        optionalChains,
        showQrModal: true,
      },
    })
);
