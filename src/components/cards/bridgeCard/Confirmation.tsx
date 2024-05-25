import Image from "next/image";
import React from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import arbitrumLogo from "@/assets/logos/arbitrum-logo.png";
import ethereumLogo from "@/assets/logos/ethereum-logo.png";
import usdcLogo from "@/assets/logos/usdc-logo.png";
import arrowLogo from "@/assets/icon/arrow-block-right.svg";
import { BridgeCardInfo } from "./BridgeCardInfo";
import { Button } from "@/components/common";

interface ConfirmationScreenProps {
  handleActiveScreen: (term: string) => void;
}

export const ConfirmationScreen = ({
  handleActiveScreen,
}: ConfirmationScreenProps) => {
  return (
    <div>
      <div className="flex gap-x-6">
        <button
          className="relative hover:opacity-75"
          onClick={() => handleActiveScreen("bridge")}
        >
          <Image src={leftIcon} alt="image-icon" className="w-8 h-8" />
        </button>
        <div className="text-3xl font-bold">Confirmation</div>
      </div>

      <div className="mt-6">
        <div className="relative flex justify-between items-center py-3">
          <div className="w-max flex  font-bold items-center py-2 space-x-2">
            <div className="w-max flex relative">
              <Image src={usdcLogo} alt="icon image" className="w-12 h-12" />
              <Image
                src={arbitrumLogo}
                alt="icon image"
                className="absolute w-6 h-6 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">15.20 USDC</p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ $15.20
              </p>
            </div>
          </div>
          <Image src={arrowLogo} alt="" className="w-12 h-12" />
          <div className="w-max flex  font-bold items-center py-2 space-x-2">
            <div className="w-max flex relative">
              <Image src={usdcLogo} alt="icon image" className="w-12 h-12" />
              <Image
                src={ethereumLogo}
                alt="icon image"
                className="absolute w-6 h-6 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">15.20 USDC</p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ $15.20
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <BridgeCardInfo
          amountToreceive="$1000"
          gasFee="$10"
          transferTime="3-minutes"
        />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => handleActiveScreen("details")}
        className="mt-8"
      >
        Bridge
      </Button>
    </div>
  );
};
