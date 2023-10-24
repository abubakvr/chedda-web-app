import { useCallback, useEffect } from "react";
import coinbase_Logo from "@/assets/images/coinbase_Logo.png";
import metamask_Logo from "@/assets/svg/metamask_Logo.svg";
import walletconnect_Logo from "@/assets/svg/walletconnect_Logo.svg";
import {
  hooks as coinbaseWallethooks,
  coinbaseWallet,
} from "@/connectors/coinbaseWallet";
import { getName } from "@/connectors/getConnectorName";
import { hooks as metaMaskhooks, metaMask } from "@/connectors/metaMask";
import {
  hooks as walletConnecthooks,
  walletConnect,
} from "@/connectors/walletConnect";

import { SelectButton } from "../selectButton/SelectButton";
import { ConnectModalProps } from "@/utils/types";
import { connectorIdKey } from "@/utils/constants";

const { useIsActivating: useMMIsActivating } = metaMaskhooks;
const { useIsActivating: useWCIsActivating } = walletConnecthooks;
const { useIsActivating: useCBIsActivating } = coinbaseWallethooks;

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const isMMActivating = useMMIsActivating();
  const isWCActivating = useWCIsActivating();
  const isCBActivating = useCBIsActivating();

  const activateConnector = useCallback(async (label: string) => {
    try {
      switch (label) {
        case "MetaMask":
          await metaMask.activate();
          window.localStorage.setItem(connectorIdKey, getName(metaMask));
          break;

        case "WalletConnect":
          console.log("Pressed");
          await walletConnect.activate();
          window.localStorage.setItem(connectorIdKey, getName(walletConnect));
          break;

        case "Coinbase Wallet":
          await coinbaseWallet.activate();
          window.localStorage.setItem(connectorIdKey, getName(coinbaseWallet));
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Failed to connect wallet. Please try again.");
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 overflow-y-auto bg-gray-900 bg-opacity-75 z-50 ${
        isModalOpen ? "" : "hidden"
      }`}
      data-testid="connect-modal"
    >
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 bg-white bg-opacity-100 rounded-lg shadow-lg p-4 space-y-4 text-center">
          <div className="font-semibold text-xl text-black relative">
            Connect Your Wallet
            <button
              className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
              data-testid="modal-close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <SelectButton
              label="MetaMask"
              image={metamask_Logo}
              onClick={() => activateConnector("MetaMask")}
              loading={isMMActivating}
            />
            <SelectButton
              label="WalletConnect"
              image={walletconnect_Logo}
              onClick={() => activateConnector("WalletConnect")}
              loading={isWCActivating}
            />
            <SelectButton
              label="Coinbase Wallet"
              image={coinbase_Logo}
              onClick={() => activateConnector("Coinbase Wallet")}
              loading={isCBActivating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
