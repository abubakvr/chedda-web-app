import React, { useState } from "react";
import { ConnectModal } from "@/components/modals";
import { sendGAEvent } from "@next/third-parties/google";

export const ConnectButton = ({}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const handleConnectWallet = () => {
    setIsAuthModalOpen(true);
    sendGAEvent("event", `Connect Wallet`, {
      value: `Connect Wallet Event`,
    });
  };

  return (
    <>
      <ConnectModal
        isModalOpen={isAuthModalOpen}
        setIsModalOpen={setIsAuthModalOpen}
      />
      <button
        onClick={handleConnectWallet}
        className="h-8 w-28 lg:h-10 xl:h-12 lg:w-40 px-2 flex rounded-lg justify-center font-bold text-xs lg:text-lg account_button items-center hover:opacity-90"
        data-testid="connect-button"
      >
        Connect wallet
      </button>
    </>
  );
};
