"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/common";
import { useLocalStorageGet } from "@/hooks";
import { QRCodeSVG } from "qrcode.react";
import { useWeb3React } from "@web3-react/core";
import CopyButton from "@/components/ui/copyButton/CopyButton";

interface ReferralModalProps {
  referralCode: string | undefined;
  isRefModalOpen: boolean;
  setIsRefModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsTourBoxOpen: Dispatch<SetStateAction<boolean>>;
}

export const ReferralModal = ({
  referralCode,
  isRefModalOpen,
  setIsRefModalOpen,
  setIsTourBoxOpen,
}: ReferralModalProps) => {
  const userAcceptance = useLocalStorageGet("userAcceptance");
  const getRegisteredWallet = useLocalStorageGet("registeredWallet");
  const referralModalCount = useLocalStorageGet("referralModalCount");

  const [isCopied, setIsCopied] = useState(false);
  const { account } = useWeb3React();

  const qrCodeData = `https://chedda.finance/markets?ref=${referralCode}`;

  const handleCopyClick = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(qrCodeData);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleContinue = () => {
    const checkModalCount = localStorage.getItem("referralModalCount");
    if (!checkModalCount || checkModalCount !== "3") {
      localStorage.setItem(
        "referralModalCount",
        (parseInt(checkModalCount || "0") + 1).toString()
      );
    }
    if (account) {
      localStorage.setItem("registeredWallet", account);
    }
    setIsRefModalOpen(false);
    setIsTourBoxOpen(true);
  };

  const openModal =
    isRefModalOpen ||
    (referralCode &&
      account &&
      getRegisteredWallet &&
      referralModalCount !== "3" &&
      userAcceptance === "accepted");

  useEffect(() => {
    setIsRefModalOpen(!!openModal);
  }, [openModal, account, setIsRefModalOpen]);

  return (
    <div
      data-testid="welcomeModal"
      className={`fixed inset-0 transition-all duration-500 ${
        isRefModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="app-modal p-4 md:p-8 rounded shadow-lg w-11/12 max-w-[320px] sm:max-w-[330px] md:max-w-[450px] lg:max-w-[560px] text-white">
          <h1 className="flex justify-center text-lg md:text-2xl lg:text-3xl font-bold">
            Referral Guide
          </h1>
          <div>
            <p className="text-center text-2xs md:text-sm lg:text-[18px] mt-2 md:mt-4 lg:mt-6 terms-text">
              Refer new users, gain referral points and earn Chedda rewards
            </p>
            <div className="flex justify-center py-4 md:py-6">
              <QRCodeSVG value={qrCodeData} size={200} level="H" />
            </div>
            <div className="flex items-center flex-grow">
              <div className="border-b border-b-[#FFFFFF70] w-1/3 md:w-1/2 flex-shrink"></div>
              <p className="w-full text-xs md:text-lg text-center text-[#FFFFFF70]">
                Or copy your referral link
              </p>
              <div className="border-b border-b-[#FFFFFF70] w-1/3 md:w-1/2 flex-shrink"></div>
            </div>
            <div className="text-xs lg:text-sm xl:text-lg relative mt-4 flex items-center justify-between p-2 md:px-4 md:py-3 border rounded-md border-[#8080CC] bg-[#FFFFFF0A]">
              <p className="hidden md:flex">{qrCodeData}</p>
              <p className="md:hidden">
                {qrCodeData.substring(0, 20) +
                  "..." +
                  qrCodeData.substring(qrCodeData.length - 17)}
              </p>
              <div className="hidden md:flex">
                <Button
                  type="tertiary"
                  size="mobile"
                  className="text-sm px-2 py-2"
                  onClick={handleCopyClick}
                  disabled={false}
                  ignoreChecks={true}
                >
                  {isCopied ? "Copied" : "Copy Link"}
                </Button>
              </div>
              <div className="flex md:hidden">
                <CopyButton
                  onClick={handleCopyClick}
                  copyLabel={isCopied ? "Copied" : "Copy Link"}
                />
              </div>
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            className="mt-4"
            onClick={handleContinue}
            disabled={false}
            ignoreChecks={true}
          >
            Continue
          </Button>
          <Button
            type="secondary"
            size="large"
            className="mt-2 md:mt-4"
            onClick={() => {}}
            disabled={false}
            ignoreChecks={true}
          >
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};
