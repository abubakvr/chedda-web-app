import React, { FC, ReactNode, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectModal } from "@/components/modals";
import { Dialog } from "../../dialog/Dialog";
import { LoadingIcon } from "./LoadingIcon";

interface ButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  className?: string;
  size?: "small" | "large";
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
  const { account } = useWeb3React();

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
        className={`${className} ${
          type === "primary"
            ? "primary-button"
            : type === "secondary"
              ? "secondary-button button-gradient-text"
              : ""
        } w-full text-center ${
          size === "large" ? "h-[56px]" : size === "small" ? "h-12" : ""
        } items-center rounded-lg text-white text-opacity-100 ${
          isLoading || disabled
            ? "opacity-50 hover:opacity-50"
            : "hover:opacity-80 "
        } uppercase font-bold text-xl flex justify-center gap-x-3 `}
        onClick={handleButtonClick}
        disabled={isLoading || disabled}
      >
        <div data-testid="loading-button-icon" role="status">
          {isLoading && <LoadingIcon />}
        </div>
        {children}
      </button>
    </>
  );
};
