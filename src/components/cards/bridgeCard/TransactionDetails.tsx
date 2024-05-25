import Image from "next/image";
import React, { useEffect, useState } from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import arbitrumLogo from "@/assets/logos/arbitrum-logo.png";
import ethereumLogo from "@/assets/logos/ethereum-logo.png";
import usdcLogo from "@/assets/logos/usdc-logo.png";
import linkOut from "@/assets/icon/link-out-grey.svg";
import loadingIcon from "@/assets/icon/gradient-loading-icon.svg";
import checkIcon from "@/assets/icon/green-check.svg";
import { Button } from "@/components/common";
import { useRouter } from "next/navigation";

interface TransactionDetailsProps {
  handleActiveScreen: (term: string) => void;
}

export const TransactionDetails = ({
  handleActiveScreen,
}: TransactionDetailsProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const navigateToMarkets = () => {
    router.push("/markets");
  };
  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(true);
    }, 1500);
  });

  return (
    <div>
      <div className="flex gap-x-6">
        <button
          className="relative hover:opacity-75"
          onClick={() => handleActiveScreen("bridge")}
        >
          <Image src={leftIcon} alt="image-icon" className="w-8 h-8" />
        </button>
        <div className="text-3xl font-bold">Transaction Details</div>
      </div>
      <div className="mt-6 border-2 border-[#ffffff20] bg-[#ffffff07] rounded-xl">
        <div className="relative flex justify-between px-8 py-3">
          <div className="w-max flex  font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image src={usdcLogo} alt="icon image" className="w-12 h-12" />
              <Image
                src={arbitrumLogo}
                alt="icon image"
                className="absolute w-5 h-5 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">USDC</p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ $15.20 • USDC on Optimism
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex justify-between px-8 py-3">
          <div className="w-max flex  font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              {isSuccess ? (
                <Image src={checkIcon} alt="icon image" className="w-12 h-12" />
              ) : (
                <Image
                  src={loadingIcon}
                  alt="icon image"
                  className="w-12 h-12 animate-spin-slow"
                />
              )}
            </div>
            <div className="flex items-center">
              <p className="font-bold text-lg uppercase">
                {isSuccess ? "Transaction Confirmed" : "Transaction Processing"}
              </p>
            </div>
          </div>
          <a
            href=""
            className="flex flex-col justify-center items-end hover:opacity-70"
          >
            <Image src={linkOut} alt="icon-logo" className="w-4 h-4" />
            <p className="font-bold text-[#FFFFFF70] text-sm">on Optimism</p>
          </a>
        </div>
        <div className="relative flex justify-between px-8 py-3">
          <div className="w-max flex  font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative ">
              {isSuccess ? (
                <Image src={checkIcon} alt="icon image" className="w-12 h-12" />
              ) : (
                <Image
                  src={loadingIcon}
                  alt="icon image"
                  className="w-12 h-12 animate-spin-slow"
                />
              )}
            </div>
            <div className="flex items-center">
              <p className="font-bold text-lg ">
                {isSuccess ? "Bridged Processed" : "Processing Bridge"}
              </p>
            </div>
          </div>
          <a
            href=""
            className="flex flex-col justify-center items-end hover:opacity-70"
          >
            <Image src={linkOut} alt="icon-logo" className="w-4 h-4" />
            <p className="font-bold text-[#FFFFFF70] text-sm">on Optimism</p>
          </a>
        </div>
        <div className="relative flex justify-between px-8 py-3">
          <div className="w-max flex  font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image src={usdcLogo} alt="icon image" className="w-12 h-12" />
              <Image
                src={ethereumLogo}
                alt="icon image"
                className="absolute w-5 h-5 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">USDC</p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ $15.20 • USDC on Optimism
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[#FFFFFF70] text-lg text-center mt-6">
        Transaction is processing. You can track your transaction in the{" "}
        <a className="text-[#C142F0]">Transaction history</a> page or on{" "}
        <a className="text-[#C142F0]">LayerZero</a>.
      </p>
      {!isSuccess ? (
        <Button
          type="primary"
          size="large"
          onClick={() => handleActiveScreen("input")}
          className="mt-8"
        >
          Continue
        </Button>
      ) : (
        <>
          <Button
            type="primary"
            size="large"
            onClick={navigateToMarkets}
            className="mt-8"
          >
            GO TO MARKETS
          </Button>
          <p className="flex justify-center text-2xl text-center py-4">or</p>
          <Button
            type="secondary"
            size="large"
            onClick={() => handleActiveScreen("input")}
            className=""
          >
            CONTINUE
          </Button>
        </>
      )}
    </div>
  );
};
