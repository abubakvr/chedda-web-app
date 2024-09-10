"use client";
import React, { FC, ReactNode, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectModal } from "@/components/modals";
import { Dialog } from "../../dialog/Dialog";
import { LoadingIcon } from "./LoadingIcon";
import { useSwitchChain } from "@/hooks";
import { currentEnvironment } from "@/data/environments";
import { usePathname } from "next/navigation";

interface ButtonProps {
  children: ReactNode;
  type: "primary" | "secondary" | "tertiary";
  className?: string;
  size?: "mobile" | "small" | "large";
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  type,
  className,
  size,
  isLoading,
  disabled,
  onClick,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [
    { dialogMessage, dialogTitle, buttonAction, actionTitle },
    setDialogDetails,
  ] = useState({
    dialogMessage: "",
    dialogTitle: "",
    buttonAction: () => {},
    actionTitle: "",
  });
  const { account, chainId } = useWeb3React();
  const appChainId = currentEnvironment?.chainId;
  const switchChain = useSwitchChain();
  const pathname = usePathname();

  const handleButtonClick = () => {
    if (!account) {
      setOpenDialog(true);
      setDialogDetails({
        dialogMessage: "Please connect your wallet to proceed.",
        dialogTitle: "Connect Wallet",
        buttonAction: () => {
          setOpenDialog(false);
          setOpenWalletModal(true);
        },
        actionTitle: "Connect",
      });
    } else if (
      appChainId &&
      appChainId !== chainId &&
      !pathname.startsWith("/bridge")
    ) {
      setOpenDialog(true);
      setDialogDetails({
        dialogMessage: "Please switch to the correct network and try again.",
        dialogTitle: "Switch Network",
        buttonAction: () => {
          setOpenDialog(false);
          switchChain(appChainId);
        },
        actionTitle: "Switch Network",
      });
    } else {
      onClick();
    }
  };

  return (
    <>
      <Dialog
        isOpen={openDialog}
        title={dialogTitle}
        actionTitle={actionTitle}
        message={dialogMessage}
        buttonAction={buttonAction}
        onClose={() => setOpenDialog(false)}
      />
      <ConnectModal
        isModalOpen={openWalletModal}
        setIsModalOpen={setOpenWalletModal}
      />
      <button
        data-testid="custom-button"
        className={`${
          type === "primary"
            ? "primary-button text-xs md:text-sm xl:text-xl uppercase"
            : type === "secondary"
              ? "secondary-button button-gradient-text text-xs md:text-sm xl:text-xl uppercase"
              : type === "tertiary"
                ? "modal-button text-[8px] md:text-[8px] xl:text-sm h-auto"
                : ""
        } w-full text-center ${
          size === "large"
            ? "h-8 sm:h-9 md:h-10 lg:h-12 xl:h-[56px]"
            : size === "small"
              ? "h-8 sm:h-9 md:h-10 lg:h-12 xl:h-12"
              : size === "mobile" && "h-9 text-xs md:text-sm xl:text-xl"
        } items-center rounded-md lg:rounded-lg text-white text-opacity-100 ${
          isLoading || disabled
            ? "opacity-50 hover:opacity-50"
            : "hover:opacity-80 "
        }  font-bold flex justify-center gap-x-3 ${className} transition-all duration-500`}
        onClick={handleButtonClick}
        disabled={isLoading || disabled}
      >
        <div data-testid="loading-button-icon" role="status">
          {isLoading ? (
            <LoadingIcon size={type === "tertiary" ? "small" : "large"} />
          ) : (
            children
          )}
        </div>
      </button>
    </>
  );
};
