import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import leftIcon from "@/assets/icon/left-icon.svg";
import linkOut from "@/assets/icon/link-out-grey.svg";
import loadingIcon from "@/assets/icon/gradient-loading-icon.svg";
import checkIcon from "@/assets/icon/green-check.svg";
import failIcon from "@/assets/icon/fail-icon.svg";
import errorIcon from "@/assets/icon/error-icon.svg";
import blockIcon from "@/assets/icon/blocked-icon.svg";
import { Button } from "@/components/common";
import { useRouter } from "next/navigation";
import { ISourceChain, IToken } from "@/utils/types";
import { createClient } from "@layerzerolabs/scan-client";
import { LAYERZERO_TESTNET } from "@/utils/constants";
import { sendGAEvent } from "@next/third-parties/google";

interface TransactionDetailsProps {
  handleActiveScreen: (term: string) => void;
  returnToInput: () => void;
  selectedToken: IToken;
  selectedChain: ISourceChain;
  destinationChain: ISourceChain;
  amountToSend: number;
  tokenPrice: number;
  txHash: string;
}

export enum MessageStatus {
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

  const [txCompleted, setTxCompleted] = useState(false);
  const getTxMessages = useCallback(async () => {
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
          setTxCompleted(true);
          break;
        case MessageStatus.FAILED:
          message = "Transaction Failed";
          icon = failIcon;
          setTxCompleted(true);
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
          setTxCompleted(true);
          break;
        case undefined:
          message = "Processing Transaction";
          icon = loadingIcon;
          break;
        default:
          message = "Transaction Error";
          setTxCompleted(true);
          icon = errorIcon;
          break;
      }

      setTxDetails({
        dstTxHash,
        status: status || MessageStatus.INFLIGHT,
        message,
        icon,
      });
      sendGAEvent("event", `Bridge Success`, {
        value: `Bridge Success`,
      });
    } catch (error) {
      console.error("Error fetching transaction messages:", error);
      setTxDetails({
        dstTxHash: undefined,
        status: MessageStatus.FAILED,
        message: "Transaction Error",
        icon: errorIcon,
      });
      sendGAEvent("event", `Bridge Error`, {
        value: `Bridge Error`,
      });
    }
  }, [txHash, setTxCompleted, setTxDetails]);

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
  }, [txCompleted, getTxMessages]);

  return (
    <div>
      <div className="flex gap-x-3 md:gap-x-4 lg:gap-x-6">
        <button
          className="relative hover:opacity-75"
          onClick={() => returnToInput()}
          data-testid="back-button"
        >
          <Image
            style={{ color: "" }}
            src={leftIcon}
            alt="image-icon"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </button>
        <div
          className="text-lg md:text-2xl lg:text-3xl font-bold"
          data-testid="transaction-details-title"
        >
          Transaction Details
        </div>
      </div>
      <div className="mt-3 md:mt-4 lg:mt-6 px-4 lg:px-8 border border-frost bg-[#ffffff07] rounded-xl">
        <div
          className="relative flex justify-between py-1 md:py-2 lg:py-3"
          data-testid="source-chain"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image
                style={{ color: "" }}
                src={selectedToken.logo}
                alt="icon image"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
              <Image
                style={{ color: "" }}
                src={selectedChain.logo}
                alt="icon image"
                className="absolute w-[14px] h-[14px] md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 top-0 left-0"
              />
            </div>
            <div>
              <p className="font-bold text-sm md:text-lg uppercase">
                {amountToSend} {selectedToken.symbol}
              </p>
              <p className="font-bold text-2xs md:text-xs mt-0.5 text-mist">
                ~ ${(amountToSend * tokenPrice).toFixed(2)} •{" "}
                {selectedToken.symbol} on {selectedChain.name}
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative flex justify-between py-1 md:py-2 lg:py-3"
          data-testid="transaction-status"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              {txHash ? (
                <Image
                  style={{ color: "" }}
                  src={checkIcon}
                  alt="icon image"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
              ) : (
                <Image
                  style={{ color: "" }}
                  src={loadingIcon}
                  alt="icon image"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 animate-spin-slow"
                />
              )}
            </div>
            <div className="flex items-center">
              <p className="font-bold text-sm md:text-lg">
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
            <Image
              style={{ color: "" }}
              src={linkOut}
              alt="icon-logo"
              className="w-3 h-3 md:w-4 md:h-4"
            />
            <p className="font-bold text-mist text-2xs md:text-xs lg:text-sm">
              on {selectedChain.name}
            </p>
          </a>
        </div>
        <div
          className="relative flex justify-between py-1 md:py-2 lg:py-3"
          data-testid="destination-chain"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image
                style={{ color: "" }}
                src={txDetails.icon}
                alt="icon image"
                className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${txDetails.icon === loadingIcon && "animate-spin-slow"}`}
              />
            </div>
            <div className="flex items-center">
              <p className="font-bold text-sm md:text-lg ">
                {txDetails.message}
              </p>
            </div>
          </div>
          <a
            href={`${destinationChain.txUrlPrefix}/${txDetails.dstTxHash}`}
            target="_blank"
            className={`flex flex-col justify-center items-end hover:opacity-70 ${!txCompleted && "hidden"}`}
            data-testid="destination-chain-link"
          >
            <Image
              style={{ color: "" }}
              src={linkOut}
              alt="icon-logo"
              className="w-3 h-3 md:w-4 md:h-4"
            />
            <p className="font-bold text-mist text-2xs md:text-xs lg:text-sm">
              on {destinationChain.name}
            </p>
          </a>
        </div>
        <div
          className="relative flex justify-between py-1 md:py-2 lg:py-3"
          data-testid="destination-chain-info"
        >
          <div className="w-max flex font-bold items-center py-2 space-x-4">
            <div className="w-max flex relative">
              <Image
                style={{ color: "" }}
                src={selectedToken.logo}
                alt="icon image"
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
              <Image
                style={{ color: "" }}
                src={destinationChain.logo}
                alt="icon image"
                className="absolute w-[14px] h-[14px] md:w-[18px] md:h-[18px] lg:w-5 lg:h-5  top-0 left-0"
              />
            </div>
            <div>
              <p className="font-bold text-sm md:text-lg uppercase">
                {amountToSend} {selectedToken.symbol}
              </p>
              <p className="font-bold text-2xs md:text-xs mt-0.5 text-mist">
                ~ ${(amountToSend * tokenPrice).toFixed(2)} •{" "}
                {selectedToken.symbol} on {destinationChain.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-mist text-2xs md:text-xs lg:text-lg text-center mt-2 md:mt-4 lg:mt-6 relative">
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
          className="mt-3 md:mt-6 lg:mt-8"
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
            className="mt-3 md:mt-6 lg:mt-8"
            data-testid="go-to-markets-button"
          >
            GO TO MARKETS
          </Button>
          <p className="flex justify-center text-sm md:text-lg lg:text-2xl text-center py-1.5 md:py-3 lg:py-4">
            or
          </p>
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
