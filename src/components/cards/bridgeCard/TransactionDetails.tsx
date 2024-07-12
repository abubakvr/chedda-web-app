import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import linkOut from "@/assets/icon/link-out-grey.svg";
import loadingIcon from "@/assets/icon/gradient-loading-icon.svg";
import checkIcon from "@/assets/icon/green-check.svg";
import failIcon from "@/assets/icon/fail-icon.svg";
import errorIcon from "@/assets/icon/error-icon.svg";
import blockIcon from "@/assets/icon/blocked-icon.svg";
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
  const [txDetails, setTxDetails] = useState<{
    dstTxHash: string | undefined;
    status: MessageStatus | undefined;
    message: string;
    icon: StaticImageData;
  }>({
    dstTxHash: "",
    status: undefined,
    message: "Processing Bridge",
    icon: loadingIcon,
  });

  const router = useRouter();
  const navigateToMarkets = () => {
    router.push("/markets");
  };

  const txCompleted =
    txDetails.status === MessageStatus.DELIVERED ||
    txDetails.status === MessageStatus.FAILED;

  const getTxMessages = async () => {
    try {
      const client = createClient("testnet");
      const { messages } = await client.getMessagesBySrcTxHash(txHash);
      const status = messages[0]?.status;
      const dstTxHash = messages[0]?.dstTxHash;

      let message = "Processing Transaction";
      let icon = errorIcon;

      switch (status as MessageStatus) {
        case MessageStatus.INFLIGHT:
          message = "Transaction Inflight";
          icon = loadingIcon;
          break;
        case MessageStatus.DELIVERED:
          message = "Transaction Delivered";
          icon = checkIcon;
          break;
        case MessageStatus.FAILED:
          message = "Transaction Failed";
          icon = failIcon;
          break;
        case MessageStatus.BLOCKED:
          message = "Transaction Blocked";
          icon = blockIcon;
          break;
        case MessageStatus.CONFIRMING:
          message = "Confirming Transaction";
          icon = loadingIcon;
          break;
        case MessageStatus.PAYLOAD_STORED:
          message = "Transaction Error";
          icon = errorIcon;
          break;
        case undefined:
          message = "Processing Transaction";
          icon = loadingIcon;
          break;
        default:
          message = "Transaction Error";
          icon = errorIcon;
          break;
      }

      setTxDetails({
        dstTxHash,
        status: status || MessageStatus.INFLIGHT,
        message,
        icon,
      });
    } catch (error) {
      console.error("Error fetching transaction messages:", error);
      setTxDetails({
        dstTxHash: undefined,
        status: MessageStatus.FAILED,
        message: "Transaction Error",
        icon: errorIcon,
      });
    }
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
      setTxDetails({
        dstTxHash: undefined,
        status: MessageStatus.PAYLOAD_STORED,
        message: "Transaction timed out. Check History",
        icon: errorIcon,
      });
    }, maxPollingTime);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  });

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
                ~ ${(amountToSend * tokenPrice).toFixed(2)} •{" "}
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
              <Image
                src={txDetails.icon}
                alt="icon image"
                className={`w-12 h-12 ${txDetails.icon === loadingIcon && "animate-spin-slow"}`}
              />
            </div>
            <div className="flex items-center">
              <p className="font-bold text-lg ">{txDetails.message}</p>
            </div>
          </div>
          <a
            href={`${destinationChain.txUrlPrefix}/${txDetails.dstTxHash}`}
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
                ~ ${(amountToSend * tokenPrice).toFixed(2)} •{" "}
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
          className="text-[#C142F0] hover:opacity-70"
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
