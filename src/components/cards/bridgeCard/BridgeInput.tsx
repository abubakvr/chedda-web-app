"use client";
import Image from "next/image";
import layerZeroLogo from "@/assets/logos/layer-zero-logo.svg";
import refreshIcon from "@/assets/icon/refresh-icon.svg";
import { BridgeAmountField } from "@/components/common/input/BridgeAmountField";
import { Button } from "@/components/common";
import { BridgeCardInfo } from "./BridgeCardInfo";
import { IBridgeToken, IConfigToken } from "@/utils/types";
import { bridgeChains } from "@/utils/constants";
import { Dispatch, SetStateAction } from "react";
import { useSwitchChain, useTokenPrice } from "@/hooks";

interface TokenBalances {
  [key: string]: number | null;
}

interface BridgeInputProps {
  handleActiveScreen: (term: string) => void;
  selectedChain: IBridgeToken;
  selectedToken: IConfigToken;
  tokenList: IConfigToken[];
  setSelectedChain: Dispatch<SetStateAction<IBridgeToken>>;
  tokenBalances: TokenBalances;
}

export const BridgeInput = ({
  handleActiveScreen,
  selectedChain,
  selectedToken,
  setSelectedChain,
  tokenBalances,
}: BridgeInputProps) => {
  const destinationChain =
    bridgeChains.find((item) => item.symbol !== selectedChain.symbol) ||
    selectedChain;
  const switchChain = useSwitchChain();
  const { data: tokenPrice } = useTokenPrice(selectedToken.address || "");

  const parsedTokenPrice = Number(tokenPrice);

  const switchNetwork = (chain: IBridgeToken) => {
    if (chain !== undefined && chain !== null) {
      switchChain(chain.chainId);
      setSelectedChain(chain);
    }
  };

  const handleChainSwitch = () => {
    setSelectedChain(destinationChain);
    switchNetwork(destinationChain);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Transfer</h1>
        <div className="flex gap-x-2 items-center font-bold text-lg">
          <p>Powered By</p>
          <Image src={layerZeroLogo} alt="layer-zero" className="h-8" />
        </div>
      </div>
      <div className="mt-6 flex gap-x-2">
        <div className="w-full">
          <p className="text-lg text-[#FFFFFF70] font-bold">From</p>
          <button
            onClick={() => handleActiveScreen("tokenselect")}
            className="token-select relative flex w-full rounded-2xl px-7 py-5 mt-2 items-center gap-x-4"
          >
            <Image
              src={selectedChain.logo}
              alt="icon-logo"
              className="w-9 h-9"
            />
            <span className="text-xl font-bold">{selectedChain.name}</span>
          </button>
        </div>
        <div className="relative w-max flex items-center">
          <button
            className="relative mt-6 w-9 h-9 hover:opacity-75"
            onClick={() => handleChainSwitch()}
          >
            <Image src={refreshIcon} alt="icon-logo" />
          </button>
        </div>
        <div className="w-full">
          <p className="text-lg text-[#FFFFFF70] font-bold">To</p>
          <button className="token-select flex w-full px-7 py-5 mt-2 items-center gap-x-4">
            <Image
              src={destinationChain?.logo}
              alt="icon-logo"
              className="w-9 h-9"
            />
            <span className="text-xl font-bold">{destinationChain.name}</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <p className="text-xs text-[#FFFFFF70] font-bold">Select Amount:</p>
        <p className="text-xs text-[#FFFFFF] font-bold">
          Balance:{" "}
          {tokenBalances[selectedToken?.address]
            ? tokenBalances[selectedToken?.address]
            : 0}
        </p>
      </div>
      <div>
        <BridgeAmountField
          onChange={(e) => {}}
          maxValue={
            selectedToken?.address &&
            tokenBalances[selectedToken.address] !== undefined
              ? tokenBalances[selectedToken.address]?.toString() || ""
              : ""
          }
          clearInputField={false}
          assetPrice={parsedTokenPrice}
          setClearInputField={() => {}}
          selectedToken={selectedToken}
          selectedChain={selectedChain}
        />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => handleActiveScreen("confirmation")}
        className="mt-8"
      >
        Approve
      </Button>
      <div>
        <h2 className="mt-8 text-xl font-bold">Summary</h2>
        <div className="mt-5">
          <BridgeCardInfo
            amountToreceive="100 USDC.e ($100.00)"
            gasFee="0.00018 ETH ($0.44)"
            transferTime="~ 3 Mintues"
          />
        </div>
      </div>
    </>
  );
};
