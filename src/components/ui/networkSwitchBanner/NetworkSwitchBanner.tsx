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
      className="w-full bg-error h-[50px] flex justify-center items-center gap-x-2 text-white font-bold"
      data-testid="network-switch-banner"
    >
      <Image
        src={InfoIcon}
        width={30}
        className="w-5 hidden lg:flex"
        alt="Info Icon"
        data-testid="info-icon"
        priority={true}
      />
      <span>
        You are on the wrong network. please switch network to {chainName}
      </span>
      <button
        className="text-white modal-button rounded px-3 py-2 text-sm ml-2 hover:opacity-90"
        onClick={switchNetwork}
        data-testid="switch-button"
      >
        Switch
      </button>
    </div>
  );
};
