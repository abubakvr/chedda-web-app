import Image from "next/image";
import React, {
  useEffect,
  useState,
  MouseEvent,
  useCallback,
  useRef,
} from "react";
import ArrowDown from "@/assets/icon/arrow-down.svg";
import CopyIcon from "@/assets/icon/copy-icon-white.svg";
import LinkOut from "@/assets/icon/link-out-gradient.svg";
import { metaMask } from "@/connectors/metaMask";
import { walletConnect } from "@/connectors/walletConnect";
import { coinbaseWallet } from "@/connectors/coinbaseWallet";
import { ConnectButton } from "../connectButton/ConnectButton";
import { copyToClipboard } from "@/utils/copyToClipboard";
import {
  alchemyKey,
  BASE_CHEDDA_API_URL,
  connectorIdKey,
} from "@/utils/constants";
import { Blockie } from "@/components/ui";
import { useCheddaBalance } from "@/hooks";
import { formatNumber, parseBigNumberToFloat } from "@/utils/formatters";
import { sendGAEvent } from "@next/third-parties/google";
import { useUserReferralCode } from "@/hooks/useReferralCode";
import { ReferralModal } from "@/components/modals";
import { useWeb3React } from "@web3-react/core";
import { generateSignature, getReferrerFromUrl } from "@/utils/helpers";
import TourStep from "@/components/ui/tourStep/TourStep";
import { currentEnvironment } from "@/data/environments";

const SIGN_MESSAGE = "Sign this message to authenticate your wallet.";
const recvWindow = 5000;

interface ProfileMenuProps {
  account: string | undefined;
}

export const ProfileMenu = ({ account }: ProfileMenuProps) => {
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);
  const [isTourBoxOpen, setIsTourBoxOpen] = useState(false);
  const { data: cheddaTokenBalance } = useCheddaBalance();
  const { referralCode, getUserReferralCode } = useUserReferralCode();
  const { isActive, provider } = useWeb3React();
  const isRegisteredRef = useRef(false);

  const referralUrl = `${currentEnvironment.hostUrl}/markets?ref=${referralCode}`;
  const parsedCheddaBalance = parseBigNumberToFloat(cheddaTokenBalance, 18, 5);

  const copyAddress = (field: "refcode" | "wallet") => {
    copyToClipboard(field === "wallet" ? (account ?? "") : referralUrl)
      .then(() => {
        setCopyLabel("Copied");
        setTimeout(() => {
          setCopyLabel("Copy");
        }, 1500);
      })
      .catch((error) => {
        console.log("error copying text", error);
      });
  };

  const registerUser = useCallback(
    async (walletAddress: string, referrer: string | undefined) => {
      if (!provider) return;
      try {
        const signer = provider.getSigner();
        const signature = await signer.signMessage(SIGN_MESSAGE);

        const timestamp = Date.now().toString(); // Move inside the function
        const parameters = JSON.stringify({
          walletAddress,
          message: SIGN_MESSAGE,
          signature,
          referralCode: referrer,
        });

        const apiSignature = await generateSignature(
          parameters,
          alchemyKey!,
          timestamp,
          recvWindow
        );

        const response = await fetch(`${BASE_CHEDDA_API_URL}/register`, {
          method: "POST",
          headers: {
            "X-Signature": apiSignature,
            "X-Timestamp": timestamp,
            "X-Recv-Window": recvWindow.toString(),
            "Content-Type": "application/json",
          },
          body: parameters,
        });

        if (response.ok) {
          const refCode = await getUserReferralCode();
          if (refCode) {
            setIsRefModalOpen(true);
          }
          return true;
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    },
    [provider, getUserReferralCode]
  );

  const openProfileMenu = () => {
    setIsOpenProfileMenu(!isOpenProfileMenu);
    setIsTourBoxOpen(false);
    sendGAEvent("event", `Profile Menu`, {
      value: `Opened Profile Menu`,
    });
  };

  const onDocumentClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest(".profile-menu-container")) {
      setIsOpenProfileMenu(false);
      setIsTourBoxOpen(false);
    }
  };

  const clearWeb3ConnectorCache = () => {
    for (const key in window.localStorage) {
      if (key.startsWith("wc@2")) {
        window.localStorage.removeItem(key);
      }
    }
  };

  const disconnectWallet = useCallback(async () => {
    const connector = metaMask || walletConnect || coinbaseWallet;
    clearWeb3ConnectorCache();
    localStorage.removeItem(connectorIdKey);
    if (connector.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      await connector.close();
    }
    setIsConnected(false);
    sendGAEvent("event", `Disconnect Wallet`, {
      value: `Disconnect Wallet Event`,
    });
  }, []);

  useEffect(() => {
    // @ts-expect-error
    document.addEventListener("click", onDocumentClick);

    return () => {
      // @ts-expect-error
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  const checkAndRegister = useCallback(async () => {
    if (isRegisteredRef.current) return;

    const paramRefCode = getReferrerFromUrl();
    if (!account || !isActive) return;

    const registeredWallet = localStorage.getItem("registeredWallet");
    if (registeredWallet === account) return;

    try {
      const refCode = await getUserReferralCode();
      if (refCode?.length) {
        localStorage.setItem("referralModalCount", "0");
        setIsRefModalOpen(true);
        return;
      }

      const registrationSuccess = await registerUser(account, paramRefCode);
      if (registrationSuccess) {
        localStorage.setItem("registeredWallet", account);
        localStorage.setItem("referralModalCount", "0");
        isRegisteredRef.current = true;
      }
    } catch (error) {
      console.error("Error checking and registering:", error);
    }
  }, [account, isActive, registerUser, getUserReferralCode]);

  useEffect(() => {
    if (account !== undefined) setIsConnected(true);
  }, [account]);

  useEffect(() => {
    checkAndRegister();
  }, [checkAndRegister]);

  return (
    <>
      {isConnected && account ? (
        <div
          className="relative profile-menu-container"
          data-testid="profile-menu-container"
        >
          <ReferralModal
            referralCode={referralCode}
            isRefModalOpen={isRefModalOpen}
            setIsRefModalOpen={setIsRefModalOpen}
            setIsTourBoxOpen={setIsTourBoxOpen}
          />
          <button
            onClick={openProfileMenu}
            className="h-8 w-28 lg:h-10 xl:h-12 lg:w-36 xl:w-40 p-2 px-1 rounded-md md:rounded-lg text-3xs lg:text-sm account_button flex justify-evenly items-center hover:opacity-90 font-bold"
            data-testid="profile-menu-button"
          >
            <div className="rounded-full flex items-center">
              <Blockie accountAddress={account} size={7} />
            </div>
            <div data-testid="profile-menu-address">
              {account?.substring(0, 6)}...
              {account?.substring(account?.length - 4)}
            </div>
            <div>
              <Image
                style={{ color: "" }}
                src={ArrowDown}
                alt="Arrow"
                className="w-2 h-2 lg:w-2.5 lg:h-2.5"
              />
            </div>
          </button>
          <div
            className={`absolute mt-4 min-w-[230px] right-0 text-white rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform ${
              isTourBoxOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <TourStep
              closeModal={() => setIsTourBoxOpen(false)}
              position="top"
            />
          </div>
          <div
            className={`absolute mt-2.5 min-w-[230px] right-0 bg-[#13161F] menu-bg text-white rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform ${
              isOpenProfileMenu ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            id="mySelectMenu"
            data-testid="profile-menu-dropdown"
          >
            <ul className="more-dropdown list-reset font-semibold px-4">
              <li
                className="py-4 rounded-t-md border-b border-[#2D2A6B]"
                onClick={() => copyAddress("wallet")}
              >
                <div className="flex gap-3 justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Blockie accountAddress={account} size={11} />
                    <span className="text-[18px] font-bold">
                      {account?.substring(0, 6)}...
                      {account?.substring(account?.length - 4)}
                    </span>
                  </div>
                  <button
                    className="relative address-container hover:opacity-70"
                    data-testid="copy-address-button"
                    onClick={() => copyAddress("wallet")}
                  >
                    <Image
                      style={{ color: "" }}
                      src={CopyIcon}
                      width={21}
                      alt="Copy"
                    />
                    <div className="tooltip" data-testid="address-copy-tooltip">
                      {copyLabel}
                    </div>
                  </button>
                </div>
              </li>
              <li
                className="pt-2 pb-4 border-b border-[#2D2A6B] font-bold"
                data-testid="chedda-balance"
              >
                <p className="text-lg text-mist">Balance:</p>
                <p className="text-[18px]">
                  {formatNumber(parsedCheddaBalance)} CHEDDA
                </p>
                <a
                  href=""
                  className="text-xs card-gradient-text relative flex mt-1.5 items-center gap-x-1"
                >
                  <span>Buy CHEDDA</span>
                  <Image
                    style={{ color: "" }}
                    src={LinkOut}
                    width={12}
                    alt="Link Out"
                  />
                </a>
              </li>
              <li>
                <p className="text-sm text-[#FFFFFF70] mt-3">
                  Your Referral Link:{" "}
                </p>
                <div className="text-xs lg:text-sm xl:text-sm relative mt-2 flex items-center justify-between px-2 py-2 border rounded-[4px] border-[#8080CC] bg-[#FFFFFF0A]">
                  <p>
                    {referralUrl.substring(0, 10) +
                      "..." +
                      referralUrl.substring(referralUrl.length - 9)}
                  </p>
                  <button
                    className="relative address-container hover:opacity-70"
                    data-testid="copy-refcode-button"
                    onClick={() => copyAddress("refcode")}
                  >
                    <Image
                      style={{ color: "" }}
                      src={CopyIcon}
                      width={21}
                      alt="Copy"
                    />
                    <div className="tooltip" data-testid="address-copy-tooltip">
                      {copyLabel}
                    </div>
                  </button>
                </div>
              </li>
              <li className="py-4 rounded-b-md cursor-pointer flex items-center">
                <button
                  onClick={disconnectWallet}
                  className="h-11 primary-button w-full rounded font-bold uppercase text-lg hover:opacity-90"
                  data-testid="disconnect-button"
                >
                  Disconnect Wallet
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <ConnectButton data-testid="connect-button" />
      )}
    </>
  );
};
