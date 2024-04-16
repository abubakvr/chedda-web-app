"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CheddaLogo from "@/assets/logos/app-logo.svg";
import TwitterIcon from "@/assets/icon/twitter-icon.svg";
import DiscordIcon from "@/assets/icon/discord-icon.svg";
import DocumentIcon from "@/assets/icon/document-icon.svg";
import CheddaMiniLogo from "@/assets/logos/chedda-logo.svg";
import { usePathname } from "next/navigation";
import { NetworkIndicator, ProfileMenu } from "./components";
import {
  connectorIdKey,
  DISCORD_URL,
  DOCS_URL,
  menuItems,
  TWITTER_URL,
} from "@/utils/constants";
import { useWeb3React } from "@web3-react/core";
import { metaMask } from "@/connectors/metaMask";
import { getName } from "@/connectors/getConnectorName";
import { walletConnect } from "@/connectors/walletConnect";
import { coinbaseWallet } from "@/connectors/coinbaseWallet";
import { NavDropdown, NetworkSwitchBanner, PacmanLogo } from "@/components/ui";
import { currentEnvironment } from "@/data/environments";

const moreDropdownItems = [
  { label: "Docs", url: DOCS_URL, icon: DocumentIcon },
  { label: "Discord", url: DISCORD_URL, icon: DiscordIcon },
  { label: "Twitter", url: TWITTER_URL, icon: TwitterIcon },
];

const navMenuItems = [
  {
    label: "Docs",
    url: "https://docs.chedda.finance",
    icon: DocumentIcon,
  },
  {
    label: "Discord",
    url: "https://discord.gg/4ZMWVez73A",
    icon: DiscordIcon,
  },
  {
    label: "Twitter",
    url: "https://twitter.com/chedda_crypto",
    icon: TwitterIcon,
  },
];

export const HeaderComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNetworkBanner, setShowNetworkBanner] = useState(false);
  const { account, chainId } = useWeb3React();
  const pathname = usePathname();

  const appChainId = currentEnvironment?.chainId;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem(connectorIdKey) === getName(metaMask)) {
      void metaMask.connectEagerly().catch(() => {
        console.log("Failed to connect eagerly to metamask");
      });
    } else if (
      localStorage.getItem(connectorIdKey) === getName(walletConnect)
    ) {
      void walletConnect.connectEagerly().catch(() => {
        console.log("Failed to connect eagerly to wallet connect");
      });
    } else if (
      localStorage.getItem(connectorIdKey) === getName(coinbaseWallet)
    ) {
      void coinbaseWallet.connectEagerly().catch(() => {
        console.log("Failed to connect eagerly to coinbase wallet");
      });
    }
  }, []);

  useEffect(() => {
    if (!chainId || !appChainId) return;
    if (appChainId !== chainId) {
      setShowNetworkBanner(true);
    } else {
      setShowNetworkBanner(false);
    }
  }, [chainId, appChainId]);

  return (
    <div>
      <div
        className={`w-full fixed opacity-100 z-10 app-header items-center ${
          isScrolled && "border-b border-gray-800"
        }`}
        data-testid="header-component"
      >
        {showNetworkBanner && (
          <NetworkSwitchBanner
            currentChain={appChainId}
            chainName={currentEnvironment?.environmentName}
          />
        )}
        <div className="flex h-20 xl:h-24 flex-row justify-between w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto items-center">
          <div>
            <Image
              src={CheddaLogo}
              width={30}
              className="w-40 hidden lg:flex"
              alt="App Logo"
              data-testid="app-logo"
              priority={true}
            />
            <Image
              src={CheddaMiniLogo}
              className="w-16 flex lg:hidden"
              width={70}
              height={20}
              alt="Chedda Logo"
              data-testid="chedda-logo"
            />
          </div>
          <div className="hidden lg:flex flex-row text-white space-x-10  mt-2 text-lg sm:text-lg font-bold">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative hover:opacity-80"
              >
                <div data-testid={`menu-item-${index}`}>{item.name}</div>
                {pathname === item.path ? (
                  <div className="mt-1">
                    <PacmanLogo />
                  </div>
                ) : null}
              </Link>
            ))}
            <NavDropdown menuItems={moreDropdownItems} />
          </div>
          <div className="flex flex-row space-x-6 text-white">
            <NetworkIndicator
              network={currentEnvironment?.environmentName}
              account={account}
            />
            <ProfileMenu account={account} data-testid="profile-menu" />
          </div>
        </div>
      </div>
      {showNetworkBanner && <div className="w-full h-12"></div>}
    </div>
  );
};
