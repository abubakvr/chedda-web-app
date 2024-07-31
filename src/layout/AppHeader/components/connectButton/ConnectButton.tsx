import React, { useState } from "react";
import { ConnectModal } from "@/components/modals";

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
        className="h-8 w-28 lg:h-10 xl:h-12 lg:w-40 px-2 flex rounded-lg justify-center font-bold text-xs lg:text-lg account_button items-center hover:opacity-90"
        data-testid="connect-button"
      >
        Connect wallet
      </button>
    </>
  );
};
