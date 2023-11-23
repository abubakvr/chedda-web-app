"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CheddaLogo from "@/assets/logos/app-logo.svg";
import CheddaMiniLogo from "@/assets/logos/chedda-logo.svg";
import { NetworkMenu } from "./components";
import { ProfileMenu } from "./components";
import { connectorIdKey, menuItems } from "@/utils/constants";
import { useWeb3React } from "@web3-react/core";
import { metaMask } from "@/connectors/metaMask";
import { getName } from "@/connectors/getConnectorName";
import { walletConnect } from "@/connectors/walletConnect";
import { coinbaseWallet } from "@/connectors/coinbaseWallet";

export const HeaderComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { account } = useWeb3React();

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

  return (
    <div
      className={`h-20 xl:h-24 flex app-header items-center w-full border-b border-gray-800 ${
        isScrolled && " w-full fixed -mt-5 opacity-100 z-50"
      }`}
      data-testid="header-component"
    >
      <div className="flex flex-row justify-between w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto items-center">
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
        <div className="hidden lg:flex flex-row text-white space-x-10 mt-2 text-sm sm:text-lg font-normal">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="relative hover:opacity-80"
            >
              <div data-testid={`menu-item-${index}`}>{item.name}</div>
              <div className="hidden pacman-loader">
                {/* Include your Pacman Loader component */}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-2 text-white">
          <NetworkMenu data-testid="network-menu" />
          <ProfileMenu account={account} data-testid="profile-menu" />
        </div>
      </div>
    </div>
  );
};
