"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CheddaLogo from "@/assets/logos/app-logo.svg";
import CheddaMiniLogo from "@/assets/logos/chedda-logo.svg";
import MenuIcon from "@/assets/icon/menu-icon.svg";
import { usePathname } from "next/navigation";
import { NetworkIndicator, ProfileMenu } from "./components";
import { connectorIdKey, menuItems, moreMenuItems } from "@/utils/constants";
import { useWeb3React } from "@web3-react/core";
import { metaMask } from "@/connectors/metaMask";
import { getName } from "@/connectors/getConnectorName";
import { walletConnect } from "@/connectors/walletConnect";
import { coinbaseWallet } from "@/connectors/coinbaseWallet";
import { NavDropdown, NetworkSwitchBanner, PacmanLogo } from "@/components/ui";
import { currentEnvironment } from "@/data/environments";
import { MobileNav } from "./components/MobileNav/MobileNav";

export const HeaderComponent: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
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
    if (appChainId !== chainId && !pathname.startsWith("/bridge")) {
      setIsWrongNetwork(true);
    } else {
      setIsWrongNetwork(false);
    }
  }, [chainId, appChainId, pathname]);

  return (
    <div>
      <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />
      <div
        className={`w-full fixed opacity-100 z-10 app-header items-center ${
          isScrolled && "border-b border-gray-800"
        }`}
        data-testid="header-component"
      >
        {isWrongNetwork && (
          <NetworkSwitchBanner
            currentChain={appChainId}
            chainName={currentEnvironment?.environmentName}
          />
        )}
        <div className="flex h-16 lg:h-20 xl:h-24 flex-row justify-between w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-[1600px] mx-auto items-center">
          <div>
            <Image
              style={{ color: "" }}
              src={CheddaLogo}
              width={30}
              className="lg:w-32 xl:w-40 hidden lg:flex"
              alt="App Logo"
              data-testid="app-logo"
              priority={true}
            />
            <Image
              style={{ color: "" }}
              src={CheddaMiniLogo}
              className="w-12 flex lg:hidden"
              width={70}
              height={20}
              alt="Chedda Logo"
              data-testid="chedda-logo"
            />
          </div>
          <div className="hidden md:flex flex-row text-white space-x-5 lg:space-x-10 text-[10px] lg:text-sm xl:text-lg font-bold md:ml-24 mt-4 lg:mt-4 xl:ml-0">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative hover:opacity-75 transition-all duration-300"
              >
                <div data-testid={`menu-item-${index}`}>{item.name}</div>
                {pathname.startsWith(item.path) ? (
                  <div className="mt-1">
                    <PacmanLogo />
                  </div>
                ) : null}
              </Link>
            ))}
            <NavDropdown menuItems={moreMenuItems} />
          </div>
          <div className="flex flex-row space-x-2 lg:space-x-6 text-white">
            <NetworkIndicator
              network={currentEnvironment?.environmentName}
              account={account}
              isWrongNetwork={isWrongNetwork}
            />
            <ProfileMenu account={account} data-testid="profile-menu" />
            <div className="flex md:hidden hover:opacity-75 pl-1">
              <button
                onClick={() => setNavOpen(true)}
                data-testid="mobile-menu-button"
              >
                <Image
                  style={{ color: "" }}
                  src={MenuIcon}
                  alt="Menu"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isWrongNetwork && <div className="w-full h-12"></div>}
    </div>
  );
};
