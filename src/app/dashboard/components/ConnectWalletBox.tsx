"use client";
import { ConnectModal } from "@/components/modals";
import { useState } from "react";

export const ConnectWalletBox = ({ title }: { title: string }) => {
  const [openWalletModal, setOpenWalletModal] = useState(false);
  return (
    <>
      <ConnectModal
        isModalOpen={openWalletModal}
        setIsModalOpen={setOpenWalletModal}
      />
      <div className="hazy-bg w-full flex flex-col items-center justify-center h-48 text-white relative">
        <p>Connect your wallet to see your {title}</p>
        <button
          className="modal-button text-white rounded-lg p-2.5 px-3 text-sm font-bold mt-4 hover:opacity-80"
          onClick={() => setOpenWalletModal(true)}
        >
          Connect Wallet
        </button>
      </div>
    </>
  );
};
