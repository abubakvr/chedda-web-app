import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import arbitrumLogo from "@/assets/logos/arbitrum-logo.png";
import ethereumLogo from "@/assets/logos/ethereum-logo.png";
import usdcLogo from "@/assets/logos/usdc-logo.png";
import arrowLogo from "@/assets/icon/arrow-block-right.svg";
import { BridgeCardInfo } from "./BridgeCardInfo";
import { Button } from "@/components/common";
import { IBridgeChain, IConfigToken } from "@/utils/types";

interface ConfirmationScreenProps {
  setConfirmBridge: Dispatch<SetStateAction<boolean>>;
  bridgeToken: () => void;
  selectedToken: IConfigToken;
  selectedChain: IBridgeChain;
  destinationChain: IBridgeChain;
  amountToSend: number;
  tokenPrice: number;
  estimatedGasFee: any;
  isLoading: boolean;
}

export const ConfirmationScreen = ({
  setConfirmBridge,
  bridgeToken,
  selectedToken,
  selectedChain,
  amountToSend,
  tokenPrice,
  destinationChain,
  estimatedGasFee,
  isLoading,
}: ConfirmationScreenProps) => {
  return (
    <div>
      <div className="flex gap-x-6">
        <button className="relative hover:opacity-75" onClick={() => setConfirmBridge(false)}>
          <Image src={leftIcon} alt="image-icon" className="w-8 h-8" />
        </button>
        <div className="text-3xl font-bold">Confirmation</div>
      </div>

      <div className="mt-6">
        <div className="relative flex justify-between items-center py-3">
          <div className="w-max flex  font-bold items-center py-2 space-x-2">
            <div className="w-max flex relative">
              <Image src={selectedToken.logo} alt="icon image" className="w-12 h-12" />
              <Image
                src={selectedChain.logo}
                alt="icon image"
                className="absolute w-6 h-6 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">
                {amountToSend} {selectedToken.symbol}
              </p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ ${amountToSend * tokenPrice}
              </p>
            </div>
          </div>
          <Image src={arrowLogo} alt="" className="w-12 h-12" />
          <div className="w-max flex  font-bold items-center py-2 space-x-2">
            <div className="w-max flex relative">
              <Image src={selectedToken.logo} alt="icon image" className="w-12 h-12" />
              <Image
                src={destinationChain.logo}
                alt="icon image"
                className="absolute w-6 h-6 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">
                {amountToSend} {selectedToken.symbol}
              </p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ ${amountToSend * tokenPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <BridgeCardInfo
          amountToreceive={`${amountToSend || 0} ${selectedToken.symbol} ($${((amountToSend || 0) * tokenPrice).toFixed(2)})`}
          gasFee={`${estimatedGasFee.gasETHFee.toFixed(4) || 0} ETH ($${estimatedGasFee.gasUSDFee.toFixed(4)})`}
          transferTime="~ 5 Mintues"
        />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => bridgeToken()}
        className="mt-8"
        isLoading={isLoading}
      >
        Bridge
      </Button>
    </div>
  );
};
