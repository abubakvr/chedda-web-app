import { ConnectModal } from "@/layout/AppHeader/components/connectModal/ConnectModal";
import React, { useState } from "react";

export const ConnectButton = ({}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  return (
    <>
      <ConnectModal
        isModalOpen={isAuthModalOpen}
        setIsModalOpen={setIsAuthModalOpen}
      />
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="h-9 w-32 sm:h-11 sm:w-40 px-2 flex rounded-lg justify-center font-bold text-xs sm:text-lg account_button items-center hover:opacity-90"
        data-testid="connect-button"
      >
        Connect wallet
      </button>
    </>
  );
};
