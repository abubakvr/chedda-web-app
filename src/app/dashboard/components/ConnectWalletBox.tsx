"use client";
import { ConnectModal } from "@/components/modals";
import { useState } from "react";

export const ConnectWalletBox = ({
  title,
  height = 48,
}: {
  title: string;
  height?: number;
}) => {
  const [openWalletModal, setOpenWalletModal] = useState(false);
  return (
    <>
      <ConnectModal
        isModalOpen={openWalletModal}
        setIsModalOpen={setOpenWalletModal}
        data-testid="connect-modal"
      />
      <div
        className={`hazy-bg w-full flex flex-col items-center justify-center h-20 md:h-${height} lg:h-48 text-white relative`}
        data-testid="connect-wallet-box"
      >
        <p
          data-testid="connect-wallet-message"
          className="text-white text-[10px] lg:text-lg"
        >
          Connect your wallet to see your {title}
        </p>
        <button
          className="modal-button text-white rounded-md lg:rounded-lg p-2 py-1.5 lg:p-2.5 lg:px-3 text-[8px] lg:text-sm font-bold mt-3 lg:mt-4 hover:opacity-80"
          onClick={() => setOpenWalletModal(true)}
          data-testid="connect-wallet-button"
        >
          Connect Wallet
        </button>
      </div>
    </>
  );
};
