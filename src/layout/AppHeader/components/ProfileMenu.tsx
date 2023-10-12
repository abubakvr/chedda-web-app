import Image from "next/image";
import React, { useEffect, useState, MouseEvent, useCallback } from "react";
import ArrowDown from "@/assets/icon/arrow-down.svg";
import CopyIcon from "@/assets/icon/copy-icon.svg";
import AccountIcon from "@/assets/logos/account-img.svg";

import { metaMask } from "@/connectors/metaMask";
import { walletConnect } from "@/connectors/walletConnect";

interface ProfileMenuProps {
  address: string | undefined;
}

export function ProfileMenu({ address }: ProfileMenuProps) {
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const openProfileMenu = () => {
    setIsOpenProfileMenu(!isOpenProfileMenu);
  };

  const cheddaBalance = 123.456;
  const stakedCheddaBalance = 789.012;
  const addressCopyText = "Copy Address";

  const copyAddress = () => {
    console.log("Address copied to clipboard");
  };

  const onDocumentClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest(".profile-menu-container")) {
      setIsOpenProfileMenu(false);
    }
  };

  const disconnectWallet = useCallback(async () => {
    const connector = metaMask || walletConnect;
    localStorage.removeItem("connectorId");
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
  }, []);

  useEffect(() => {
    // @ts-expect-error close can be returned by wallet
    document.addEventListener("click", onDocumentClick);

    return () => {
      // @ts-expect-error close can be returned by wallet
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <div className="relative profile-menu-container">
      <button
        onClick={openProfileMenu}
        className="h-9 w-32 sm:h-11 sm:w-40 px-2 rounded-lg text-sm account_button flex justify-evenly items-center hover:opacity-90 font-semibold"
      >
        <div>
          <Image
            src={AccountIcon}
            alt="Blockie"
            className="rounded-full w-7 h-7"
          />
        </div>
        <div>
          {address?.substring(0, 6)}...{address?.substring(address?.length - 4)}
        </div>
        <div>
          <Image src={ArrowDown} alt="Arrow" className="w-2.5 h-2.5" />
        </div>
      </button>
      <div
        className={`absolute mt-1 w-56 right-0 bg-[#13161F] menu-bg text-white rounded-md shadow-lg z-10 ${
          isOpenProfileMenu ? "" : "hidden"
        }`}
        id="mySelectMenu"
      >
        <ul className="list-reset text-center font-semibold">
          <li
            className="py-4 px-2 rounded-t-md border-b border-gray-700"
            onClick={copyAddress}
          >
            <div className="flex gap-3 justify-center items-center">
              <Image
                src={AccountIcon}
                alt="Blockie"
                className="rounded-full w-7 h-7"
              />
              {address?.substring(0, 6)}...
              {address?.substring(address?.length - 4)}
              <button className="relative address-container hover:opacity-70">
                <Image src={CopyIcon} width={17} alt="Copy" />
                <div className="tooltip">{addressCopyText}</div>
              </button>
            </div>
          </li>
          <li className="py-2 px-2 border-b border-gray-700">
            {cheddaBalance.toFixed(4)} CHEDDA
          </li>
          <li className="py-2 px-2 border-b border-gray-700">
            {stakedCheddaBalance.toFixed(4)} xCHEDDA
          </li>
          <li className="py-4 px-5 rounded-b-md cursor-pointer flex items-center">
            <button
              onClick={disconnectWallet}
              className="h-8 primary-button-bg w-full rounded-lg font-bold uppercase text-md hover:opacity-90"
            >
              Disconnect
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
