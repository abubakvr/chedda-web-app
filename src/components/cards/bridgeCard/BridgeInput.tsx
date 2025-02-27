"use client";
import Image from "next/image";
import layerZeroLogo from "@/assets/logos/layer-zero-logo.svg";
import refreshIcon from "@/assets/icon/refresh-icon.svg";
import InfoIcon from "@/assets/icon/info-gradient-icon.svg";
import { ethers } from "ethers";
import { BridgeAmountField } from "@/components/common/input/BridgeAmountField";
import { Button } from "@/components/common";
import { BridgeCardInfo } from "./BridgeCardInfo";
import { ISourceChain, IBridgeToken } from "@/utils/types";
import { useState } from "react";
import { useBridge, useSwitchChain, useToast } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { formatNumber } from "@/utils/formatters";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { getTokenBalanceAddress, getTokenBridgeAddress } from "@/utils/helpers";
import { TransactionDetails } from "./TransactionDetails";
import { isPostToken } from "@/utils/constants";

interface TokenBalances {
  [key: string]: number | null;
}

interface BridgeInputProps {
  selectedChain: ISourceChain;
  selectedToken: IBridgeToken;
  tokenList: IBridgeToken[];
  tokenBalances: TokenBalances;
  estimatedGasFee: any;
  destinationChain: ISourceChain;
  fetchTokenBalanceLoading: boolean;
  tokenDataLoading: boolean;
  allowance: number;
  tokenPrice: number;
  handleActiveScreen: (term: string) => void;
  switchToSelectedChain: (chain: ISourceChain) => void;
  fetchBalances: (chain: ISourceChain) => void;
  getEstimatedGas: () => void;
  fetchTokenData: () => void;
}

export const BridgeInput = ({
  selectedChain,
  selectedToken,
  tokenBalances,
  estimatedGasFee,
  destinationChain,
  fetchTokenBalanceLoading,
  allowance,
  tokenPrice,
  tokenDataLoading,
  handleActiveScreen,
  switchToSelectedChain,
  fetchBalances,
  fetchTokenData,
}: BridgeInputProps) => {
  const [showMore, setShowMore] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmBridge, setConfirmBridge] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const switchChain = useSwitchChain();
  const { sendOFT, approveAsset } = useBridge(selectedChain);
  const { account, chainId } = useWeb3React();
  const { addToast } = useToast();

  const balanceAddress = getTokenBalanceAddress(selectedToken, selectedChain);
  const tokenAddress = getTokenBridgeAddress(selectedToken, selectedChain);
  const wrongChain = (chainId && selectedChain.chainId) !== chainId;

  const switchNetwork = (chain: ISourceChain) => {
    if (chain !== undefined && chain !== null) {
      switchChain(chain.chainId);
      switchToSelectedChain(chain);
    }
  };

  const handleChainSwitch = () => {
    switchToSelectedChain(destinationChain);
    switchNetwork(destinationChain);
  };

  const buttonName =
    selectedToken.source === selectedChain.key &&
    selectedToken.type === "oftAdapter" &&
    allowance < amount
      ? "approve"
      : "bridge";

  const returnToInput = () => {
    setAmount(0);
    setConfirmBridge(false);
    setShowDetails(false);
  };

  const handleSendToken = async () => {
    setIsLoading(true);
    try {
      if (!amount || !account) {
        console.error("Amount or account is not defined");
        return;
      }

      const amountToSend = ethers.parseUnits(
        `${amount}`,
        selectedToken.decimals
      );
      const tx = await sendOFT(
        tokenAddress,
        destinationChain.endpointId,
        amountToSend,
        account
      );

      if (tx) {
        const result = await tx.wait();
        if (result.status === 1) {
          setTxHash(tx.hash);
          setShowDetails(true);
          setConfirmBridge(false);
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          addToast({
            message: txMessage,
            txHash: tx.hash,
            txPrefix: selectedChain.txUrlPrefix,
            type: "error",
          });
        }
      }
      fetchBalances(selectedChain);
      fetchTokenData();
      setIsLoading(false);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
      setIsLoading(false);
    }
  };

  const approveAdapter = async () => {
    setIsLoading(true);
    try {
      if (!amount || !account) {
        console.error("Amount or account is not defined");
        return;
      }

      const amountToSend = ethers.parseUnits(
        `${amount}`,
        selectedToken.decimals
      );

      const tx = await approveAsset(
        selectedToken.address,
        selectedToken.oftAdapter ?? "",
        amountToSend
      );

      if (tx) {
        const result = await tx.wait();
        if (result.status === 1) {
          const txMessage = `You've successfully approved ${formatNumber(
            amount
          )} ${selectedToken.symbol}`;
          addToast({
            message: txMessage,
            txHash: tx.hash,
            txPrefix: selectedChain.txUrlPrefix,
            type: "success",
          });
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          addToast({
            message: txMessage,
            txHash: tx.hash,
            txPrefix: selectedChain.txUrlPrefix,
            type: "error",
          });
        }
      }
      setIsLoading(false);
      fetchTokenData();
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      addToast({
        message: errorObject.errorMessage,
        copyText: errorObject.fullText,
        type: "error",
      });
      setIsLoading(false);
    }
  };

  const handleBridgeToken = () => {
    if (!amount) {
      alert("Input field cannot be empty");
      return;
    }

    if (amount > tokenBalances[balanceAddress]!) {
      alert("Enter Valid Amount");
      return;
    }

    try {
      if (
        selectedToken.source === selectedChain.key &&
        selectedToken.type === "oftAdapter" &&
        allowance < amount
      ) {
        approveAdapter();
      } else {
        setConfirmBridge(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return !confirmBridge && !showDetails ? (
    <>
      <div className="flex justify-between" data-testid="bridge-input-title">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">Transfer</h1>
        <div className="flex gap-x-2 items-center font-bold text-xs md:text-lg">
          <p>Powered By</p>
          <Image
            style={{ color: "" }}
            src={layerZeroLogo}
            alt="layer-zero"
            className="w-fit h-5 md:h-7 lg:h-8"
          />
        </div>
      </div>
      <div
        className={`hidden w-full md:flex items-center space-x-2 border p-4 border-frost bg-glass rounded-lg mt-6`}
      >
        <Image
          style={{ color: "" }}
          src={InfoIcon}
          alt="info icon"
          className="w-4 h-4 md:w-[18px] md:h-[18px] xl:w-6 xl:h-6"
        />
        <div
          className={`${
            showMore ? "max-h-[500px]" : "max-h-[40px] transition-max-height"
          } overflow-hidden transition-max-height transition- duration-1000 ease-in-out text-sm lg:text-lg text-[#B5B5B5]`}
        >
          {showMore ? (
            <p>
              Bridge assets from other networks to use on Chedda. Bridged assets
              can be supplied or used as collateral in Chedda lending pools.
              Bridged assets can be bridged back at any time.{" "}
              <button
                className="card-gradient-text hover:opacity-80 relative"
                onClick={() => setShowMore(false)}
              >
                Less
              </button>
            </p>
          ) : (
            <p>
              Bridge assets to use on Chedda...{" "}
              <button
                className="card-gradient-text hover:opacity-80 relative"
                onClick={() => setShowMore(true)}
              >
                More
              </button>
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex gap-x-2" data-testid="bridge-input-chains">
        <div className="w-full">
          <p className="text-xs md:text-sm lg:text-lg text-mist font-bold">
            From
          </p>
          <button
            onClick={() => handleActiveScreen("tokenselect")}
            className={`${isPostToken ? "token-select" : "text-2xl rounded-2xl border-2 border-white/20 bg-white/4 opacity-40"} relative flex w-full py-3 px-3 sm:py-4 md:px-4 lg:px-7 lg:py-5 mt-2 items-center gap-x-2 md:gap-x-3 lg:gap-x-4`}
            disabled={!isPostToken}
            data-testid="bridge-input-from-chain"
          >
            <Image
              style={{ color: "" }}
              src={selectedChain.logo}
              alt="icon-logo"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
            <span className="text-sm md:text-lg lg:text-xl font-bold">
              {selectedChain.name}
            </span>
          </button>
        </div>
        <div className="relative w-max flex items-center">
          <button
            className={`${!isPostToken && "opacity-40"} relative mt-6 w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 hover:opacity-75`}
            onClick={() => handleChainSwitch()}
            disabled={!isPostToken}
            data-testid="bridge-input-refresh-button"
          >
            <Image
              style={{ color: "" }}
              src={refreshIcon}
              alt="icon-logo"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"
            />
          </button>
        </div>
        <div className="w-full">
          <p className="text-xs md:text-sm lg:text-lg text-mist font-bold">
            To
          </p>
          <button
            className={`${isPostToken ? "token-select" : "text-2xl rounded-2xl border-2 border-white/20 bg-white/4 opacity-40"} flex w-full py-3 px-3 sm:py-4 md:px-4 lg:px-7 lg:py-5 mt-2 items-center gap-x-2 md:gap-x-3 lg:gap-x-4`}
            data-testid="bridge-input-to-chain"
            disabled={!isPostToken}
          >
            <Image
              style={{ color: "" }}
              src={destinationChain?.logo}
              alt="icon-logo"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
            <span className="text-sm md:text-lg lg:text-xl font-bold">
              {destinationChain.name}
            </span>
          </button>
        </div>
      </div>
      <div
        className="flex justify-between mt-4 md:mt-6 lg:mt-8"
        data-testid="bridge-input-amount-section"
      >
        <p className="text-2xs lg:text-xs text-mist font-bold">
          Select Amount:
        </p>
        <p className="text-2xs lg:text-xs text-[#FFFFFF] font-bold">
          Balance:{" "}
          {fetchTokenBalanceLoading
            ? "loading..."
            : balanceAddress
              ? `${formatNumber(tokenBalances[balanceAddress] || 0)} ${selectedToken.symbol}`
              : `0 ${selectedToken.symbol}`}
        </p>
      </div>
      <div
        className={!isPostToken ? "opacity-40 pointer-events-none" : ""}
        data-testid={`bridge-input-amount-field`}
      >
        <BridgeAmountField
          onChange={(value) => {
            setAmount(parseFloat(value));
          }}
          maxValue={tokenBalances[balanceAddress]?.toString() || ""}
          clearInputField={false}
          assetPrice={tokenPrice}
          setClearInputField={() => {}}
          selectedToken={selectedToken}
          selectedChain={selectedChain}
        />
      </div>
      {wrongChain && (
        <div
          className="mt-1.5 md:mt-2 text-xs md:text-sm text-error relative font-bold"
          data-testid="bridge-input-wrong-network"
        >
          You are on the wrong network.{" "}
          <button
            onClick={() => switchNetwork(selectedChain)}
            className="underline"
          >
            Switch to {selectedChain.name}
          </button>
        </div>
      )}
      <Button
        type="primary"
        size="large"
        onClick={() => handleBridgeToken()}
        className={wrongChain ? "mt-3" : "mt-4 md:mt-6 lg:mt-8"}
        isLoading={isLoading || tokenDataLoading}
        disabled={!isPostToken || isLoading || wrongChain}
        data-testid="bridge-input-action-button"
      >
        {buttonName}
      </Button>
      {!isPostToken && (
        <div
          className="mt-1.5 md:mt-2 text-xs md:text-sm text-error relative font-bold"
          data-testid="bridge-input-wrong-network"
        >
          *Bridge feature is not yet available to use.
        </div>
      )}
      <div>
        <h2
          className="mt-3 md:mt-6 lg:mt-8 tet-sm md:text-lg lg:text-xl font-bold"
          data-testid="bridge-input-summary-title"
        >
          Summary
        </h2>
        <div
          className="mt-[14px] md:mt-4 lg:mt-5"
          data-testid="bridge-input-summary"
        >
          <BridgeCardInfo
            destination={destinationChain.name}
            amountToreceive={`${formatNumber(amount || 0)} ${selectedToken.symbol} ($${formatNumber((amount || 0) * tokenPrice)})`}
            gasFee={`${estimatedGasFee.gasETHFee.toFixed(2) || 0} ETH ($${estimatedGasFee.gasUSDFee.toFixed(2)})`}
            transferTime="~ 5 Mintues"
          />
        </div>
      </div>
    </>
  ) : confirmBridge && !showDetails ? (
    <>
      <ConfirmationScreen
        returnToInput={returnToInput}
        bridgeToken={handleSendToken}
        selectedToken={selectedToken}
        selectedChain={selectedChain}
        destinationChain={destinationChain}
        estimatedGasFee={estimatedGasFee}
        amountToSend={amount}
        tokenPrice={tokenPrice}
        isLoading={isLoading}
      />
    </>
  ) : !confirmBridge && showDetails ? (
    <TransactionDetails
      selectedToken={selectedToken}
      returnToInput={returnToInput}
      selectedChain={selectedChain}
      destinationChain={destinationChain}
      amountToSend={amount}
      tokenPrice={tokenPrice}
      txHash={txHash ?? ""}
      handleActiveScreen={handleActiveScreen}
    />
  ) : null;
};
