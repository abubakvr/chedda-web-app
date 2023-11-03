import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import ArrowDown from "@/assets/icon/arrow-down.svg";
import { useSwitchChain } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { supportedNetworksConfig as networkList } from "@/utils/constants";
import { INetworkList } from "@/utils/types";

export const NetworkMenu: React.FC = () => {
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const switchChain = useSwitchChain();
  const [selected, setSelected] = useState<INetworkList>(networkList[0]);

  const { chainId } = useWeb3React();

  const openNetworkMenu = () => {
    setIsNetworkMenuOpen(!isNetworkMenuOpen);
  };

  const onClick = useCallback(
    ({ key }: { key: string }) => {
      switchChain(Number(key)).catch((error) => {
        console.error(`Failed to switch chains: ${error}`);
      });
      setIsNetworkMenuOpen(false);
    },
    [switchChain]
  );

  const onDocumentClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest(".network-menu-container")) {
      setIsNetworkMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (!chainId) return;

    const selectedNetwork = networkList.find(
      (item) => item.chainId === chainId.toString()
    );

    setSelected(selectedNetwork ? selectedNetwork : networkList[0]);
  }, [chainId]);

  return (
    <div
      className="hidden sm:block relative network-menu-container"
      data-testid="network-menu-container"
    >
      <button
        onClick={openNetworkMenu}
        className="h-10 w-36 xl:h-12 lg:w-36 p-1 rounded-lg network_button flex justify-evenly items-center text-sm lg:text-[16px] font-semibold hover:opacity-90"
        data-testid="network-menu-button"
      >
        <div>
          <Image
            src={selected?.icon ?? ""}
            alt="Logo"
            className="w-6 h-6 lg:h-7 lg:w-7"
            width={24}
            height={24}
          />
        </div>
        <div data-testid="selected-network-label">{selected?.name}</div>
        <div>
          <Image
            src={ArrowDown}
            alt="Arrow"
            className="w-2.5 h-2.5"
            width={10}
            height={10}
          />
        </div>
      </button>
      <div
        className={`absolute mt-1 w-full bg-[#13161F] text-white menu-bg rounded-[10px] shadow-lg z-10 ${
          isNetworkMenuOpen ? "" : "hidden"
        }`}
        id="mySelectMenu"
        data-testid="network-menu-dropdown"
      >
        <ul className="list-reset">
          {networkList.map((network, index) => (
            <li
              key={index}
              onClick={() => onClick({ key: network.chainId })}
              className={`py-2 px-2 border-b border-gray-700 hover:bg-gray-700 hover:rounded-t-md cursor-pointer flex items-center text-sm sm:text-[16px] font-semibold gap-2 ${
                index === networkList.length - 1
                  ? "last:border-none hover:last:rounded-t-none last:rounded-b-md"
                  : ""
              }`}
              data-testid={`network-item-${index}`}
            >
              <Image
                src={network.icon}
                alt={`${network.name} Icon`}
                className="w-6 h-6 lg:h-7 lg:w-7"
                width={24}
                height={24}
              />
              {network.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
