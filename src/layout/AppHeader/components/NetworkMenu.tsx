import React, { useCallback, useEffect, useMemo, useState } from "react";
import Arbitrum_Logo from "@/assets/logos/arbitrum-logo.png";
import Ethereum_Logo from "@/assets/logos/ethereum-logo.png";
import ArrowDown from "@/assets/icon/arrow-down.svg";
import Image, { StaticImageData } from "next/image";
import { chainIds } from "@/data/chainIds";
import { useSwitchChain } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { defaultNetwork } from "@/utils/constants";

interface networkList {
  label: string;
  key: string;
  icon: StaticImageData;
}

export const NetworkMenu: React.FC = () => {
  const [isOpenNetworkMenu, setIsOpenNetworkMenu] = useState(false);
  const switchChain = useSwitchChain();
  const [selected, setSelected] = useState<networkList>(defaultNetwork);

  const { chainId } = useWeb3React();

  const openNetworkMenu = () => {
    setIsOpenNetworkMenu(!isOpenNetworkMenu);
  };

  const networkList: networkList[] = useMemo(
    () => [
      {
        label: "Arbitrum ",
        key: chainIds.arbitrumtest,
        icon: Arbitrum_Logo,
      },
      {
        label: "Goerli",
        key: chainIds.goerli,
        icon: Ethereum_Logo,
      },
    ],
    []
  );

  const onClick = useCallback(
    ({ key }: { key: string }) => {
      switchChain(Number(key)).catch((error) => {
        console.error(`Failed to switch chains: ${error}`);
      });
    },
    [switchChain]
  );

  const onDocumentClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest(".network-menu-container")) {
      setIsOpenNetworkMenu(false);
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
      (item) => item.key === chainId.toString()
    );

    setSelected(selectedNetwork ? selectedNetwork : networkList[0]);
  }, [chainId, networkList]);

  return (
    <div className="relative network-menu-container">
      <button
        onClick={openNetworkMenu}
        className="h-10 w-36 sm:h-11 lg:w-36 p-1 rounded sm:rounded-lg network_button flex justify-evenly items-center text-sm lg:text-[16px] font-semibold hover:opacity-90"
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
        <div>{selected?.label}</div>
        <div>
          <Image src={ArrowDown} alt="Arrow" className="w-2.5 h-2.5" />
        </div>
      </button>
      <div
        className={`absolute mt-1 w-full bg-[#13161F] text-white menu-bg rounded-[10px] shadow-lg z-10 ${
          isOpenNetworkMenu ? "" : "hidden"
        }`}
        id="mySelectMenu"
      >
        <ul className="list-reset">
          {networkList.map((network, index) => (
            <li
              key={index}
              onClick={() => onClick({ key: network.key })}
              className={`py-2 px-2 border-b border-gray-700 hover:bg-gray-700 hover:rounded-t-md cursor-pointer flex items-center text-sm sm:text-[16px] font-semibold gap-2 ${
                index === networkList.length - 1
                  ? "last:border-none hover:last:rounded-t-none last:rounded-b-md"
                  : ""
              }`}
            >
              <Image
                src={network.icon}
                alt={`${network.label} Icon`}
                className="w-6 h-6 lg:h-7 lg:w-7"
                width={24}
                height={24}
              />
              {network.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
