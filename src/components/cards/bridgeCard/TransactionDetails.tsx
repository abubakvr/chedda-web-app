import Image from "next/image";
import React, { useEffect, useState } from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import linkOut from "@/assets/icon/link-out-grey.svg";
import loadingIcon from "@/assets/icon/gradient-loading-icon.svg";
import checkIcon from "@/assets/icon/green-check.svg";
import { Button } from "@/components/common";
import { useRouter } from "next/navigation";
import { IBridgeChain, IConfigToken } from "@/utils/types";
import { createClient } from "@layerzerolabs/scan-client";
import { LAYERZERO_TESTNET } from "@/utils/constants";

interface TransactionDetailsProps {
  handleActiveScreen: (term: string) => void;
  returnToInput: () => void;
  selectedToken: IConfigToken;
  selectedChain: IBridgeChain;
  destinationChain: IBridgeChain;
  amountToSend: number;
  tokenPrice: number;
  txHash: string;
}

enum MessageStatus {
  INFLIGHT = "INFLIGHT",
  DELIVERED = "DELIVERED",
  FAILED = "FAILED",
  PAYLOAD_STORED = "PAYLOAD_STORED",
  BLOCKED = "BLOCKED",
  CONFIRMING = "CONFIRMING",
}

export const TransactionDetails = ({
  returnToInput,
  selectedToken,
  selectedChain,
  destinationChain,
  amountToSend,
  tokenPrice,
  txHash,
}: TransactionDetailsProps) => {
  const [{ dstTxHash, sourceTxHash, txStatus }, setTxDetails] = useState<{
    dstTxHash: string | undefined;
    sourceTxHash: string | undefined;
    txStatus: MessageStatus;
  }>({
    dstTxHash: "",
    sourceTxHash: "",
    txStatus: MessageStatus.INFLIGHT,
  });
  const router = useRouter();
  const navigateToMarkets = () => {
    router.push("/markets");
  };

  const txCompleted = txStatus === MessageStatus.DELIVERED;

  const getTxMessages = async () => {
    const client = createClient("testnet");
    const { messages } = await client.getMessagesBySrcTxHash(txHash);
    setTxDetails({
      dstTxHash: messages[0]?.dstTxHash,
      sourceTxHash: messages[0]?.srcTxHash,
      txStatus: messages[0]?.status,
    });
  };

  useEffect(() => {
    const pollingInterval = 5000;
    const maxPollingTime = 300000;

    const intervalId = setInterval(() => {
      getTxMessages();
      if (txCompleted) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    }, pollingInterval);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, maxPollingTime);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <div className="flex gap-x-6">
        <button
          className="relative hover:opacity-75"
          onClick={() => returnToInput()}
          data-testid="back-button"
        >
          <Image src={leftIcon} alt="image-icon" className="w-8 h-8" />
        </button>
        <div
          className="text-3xl font-bold"
          data-testid="transaction-details-title"
        >
          Transaction Details
        </div>
      </div>
      <div className="mt-6 border border-[#ffffff20] bg-[#ffffff07] rounded-xl">
        <div
          className="relative flex justify-between px-8 py-3"
          data-testid="source-chain"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image
                src={selectedToken.logo}
                alt="icon image"
                className="w-12 h-12"
              />
              <Image
                src={selectedChain.logo}
                alt="icon image"
                className="absolute w-5 h-5 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">
                {amountToSend} {selectedToken.symbol}
              </p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ ${(amountToSend * tokenPrice).toFixed(4)} •{" "}
                {selectedToken.symbol} on {selectedChain.name}
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative flex justify-between px-8 py-3"
          data-testid="transaction-status"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              {txHash ? (
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
              <p className="font-bold text-lg">
                {txHash ? "Transaction Confirmed" : "Transaction Processing"}
              </p>
            </div>
          </div>
          <a
            href={`${selectedChain.txUrlPrefix}/${txHash}`}
            target="_blank"
            className={`flex flex-col justify-center items-end hover:opacity-70 ${!txHash && "hidden"}`}
            data-testid="source-chain-link"
          >
            <Image src={linkOut} alt="icon-logo" className="w-4 h-4" />
            <p className="font-bold text-[#FFFFFF70] text-sm">
              on {selectedChain.name}
            </p>
          </a>
        </div>
        <div
          className="relative flex justify-between px-8 py-3"
          data-testid="destination-chain"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              {txCompleted ? (
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
                {txStatus === MessageStatus.DELIVERED
                  ? "Bridged Processed"
                  : "Processing Bridge"}
              </p>
            </div>
          </div>
          <a
            href={`${destinationChain.txUrlPrefix}/${dstTxHash}`}
            target="_blank"
            className={`flex flex-col justify-center items-end hover:opacity-70 ${!txCompleted && "hidden"}`}
            data-testid="destination-chain-link"
          >
            <Image src={linkOut} alt="icon-logo" className="w-4 h-4" />
            <p className="font-bold text-[#FFFFFF70] text-sm">
              on {destinationChain.name}
            </p>
          </a>
        </div>
        <div
          className="relative flex justify-between px-8 py-3"
          data-testid="destination-chain-info"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image
                src={selectedToken.logo}
                alt="icon image"
                className="w-12 h-12"
              />
              <Image
                src={destinationChain.logo}
                alt="icon image"
                className="absolute w-5 h-5 bottom-0 -right-0.5"
              />
            </div>
            <div>
              <p className="font-bold text-lg uppercase">
                {amountToSend} {selectedToken.symbol}
              </p>
              <p className="font-bold text-xs mt-0.5 text-[#FFFFFF70]">
                ~ ${(amountToSend * tokenPrice).toFixed(4)} •{" "}
                {selectedToken.symbol} on {destinationChain.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[#FFFFFF70] text-lg text-center mt-6 relative">
        Transaction is processing. You can track your transaction on{" "}
        <a
          href={`${LAYERZERO_TESTNET}/${txHash}`}
          target="_blank"
          className="text-[#C142F0]"
          data-testid="layerzero-link"
        >
          LayerZero
        </a>
        .
      </p>
      {!txCompleted ? (
        <Button
          type="primary"
          size="large"
          onClick={() => returnToInput()}
          className="mt-8"
          data-testid="continue-button"
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
            data-testid="go-to-markets-button"
          >
            GO TO MARKETS
          </Button>
          <p className="flex justify-center text-2xl text-center py-4">or</p>
          <Button
            type="secondary"
            size="large"
            onClick={() => returnToInput()}
            className=""
            data-testid="continue-after-completion-button"
          >
            CONTINUE
          </Button>
        </>
      )}
    </div>
  );
};
