import React from "react";
import InfoIcon from "@/assets/icon/info-icon-white.svg";
import Image from "next/image";
import { useSwitchChain } from "@/hooks";

export const NetworkSwitchBanner = ({
  currentChain,
  chainName,
}: {
  currentChain: number | undefined;
  chainName: string | undefined;
}) => {
  const switchChain = useSwitchChain();

  const switchNetwork = () => {
    if (currentChain !== undefined && currentChain !== null) {
      switchChain(currentChain);
    }
  };

  return (
    <div
      className="w-full px-3 bg-error h-9 md:h-10 lg:h-[50px] flex text-[9px] md:text-sm lg:text-lg justify-center items-center gap-x-1 md:gap-x-2 text-white font-bold"
      data-testid="network-switch-banner"
    >
      <Image
        src={InfoIcon}
        width={30}
        className="w-4 h-4 lg:w-5 lg:h-5 hidden md:flex"
        alt="Info Icon"
        data-testid="info-icon"
        priority={true}
      />
      <span>
        You are on the wrong network. Please switch network to {chainName}
      </span>
      <button
        className="text-white modal-button rounded text-[10px] md:text-xs px-2 py-1 lg:px-3 lg:py-2 lg:text-sm ml-2 hover:opacity-90"
        onClick={switchNetwork}
        data-testid="switch-button"
      >
        Switch
      </button>
    </div>
  );
};
