"use client";
import Image from "next/image";
import layerZeroLogo from "@/assets/logos/layer-zero-logo.svg";
import refreshIcon from "@/assets/icon/refresh-icon.svg";
import { ethers } from "ethers";
import { BridgeAmountField } from "@/components/common/input/BridgeAmountField";
import { Button } from "@/components/common";
import { BridgeCardInfo } from "./BridgeCardInfo";
import { ISourceChain, IToken } from "@/utils/types";
import { useState } from "react";
import { useBridge, useSwitchChain } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { formatNumber } from "@/utils/formatters";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { getTokenBalanceAddress, getTokenBridgeAddress } from "@/utils/helpers";
import { Toast } from "@/components/ui";
import { TransactionDetails } from "./TransactionDetails";

interface TokenBalances {
  [key: string]: number | null;
}

interface BridgeInputProps {
  selectedChain: ISourceChain;
  selectedToken: IToken;
  tokenList: IToken[];
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
  const switchChain = useSwitchChain();
  const { sendOFT, approveAsset } = useBridge(selectedChain);
  const { account, chainId } = useWeb3React();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmBridge, setConfirmBridge] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [{ txMessage, txHash, txStatus, copyText }, setTxDetails] = useState<{
    txMessage: string;
    txHash: string | null;
    copyText: string | null;
    txStatus: "success" | "failed";
  }>({
    copyText: "",
    txMessage: "",
    txHash: "",
    txStatus: "success",
  });

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
    setShowToast(false);
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
          const txMessage = `You've successfully bridged ${formatNumber(
            amount
          )} ${selectedToken.symbol}`;
          setTxDetails({
            txMessage,
            copyText: null,
            txHash: tx.hash,
            txStatus: "success",
          });
          setShowToast(true);
          setShowDetails(true);
          setConfirmBridge(false);
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          setTxDetails({
            txMessage,
            copyText: null,
            txHash: tx.hash,
            txStatus: "failed",
          });
          setShowToast(true);
        }
      }
      fetchBalances(selectedChain);
      fetchTokenData();
      setIsLoading(false);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      setTxDetails({
        txMessage: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: null,
        txStatus: "failed",
      });
      setShowToast(true);
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
          setTxDetails({
            txMessage,
            copyText: null,
            txHash: tx.hash,
            txStatus: "success",
          });
          setShowToast(true);
        } else {
          const txMessage = `An error occurred while proccessing your transaction`;
          setTxDetails({
            txMessage,
            copyText: null,
            txHash: tx.hash,
            txStatus: "failed",
          });
          setShowToast(true);
        }
      }
      setIsLoading(false);
      fetchTokenData();
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      setTxDetails({
        txMessage: errorObject.errorMessage,
        copyText: errorObject.fullText,
        txHash: null,
        txStatus: "failed",
      });
      setShowToast(true);
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
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
        txPrefix={selectedChain.txUrlPrefix}
      />
      <div className="flex justify-between" data-testid="bridge-input-title">
        <h1 className="text-3xl font-bold">Transfer</h1>
        <div className="flex gap-x-2 items-center font-bold text-lg">
          <p>Powered By</p>
          <Image src={layerZeroLogo} alt="layer-zero" className="h-8" />
        </div>
      </div>
      <div className="mt-6 flex gap-x-2" data-testid="bridge-input-chains">
        <div className="w-full">
          <p className="text-lg text-[#FFFFFF70] font-bold">From</p>
          <button
            onClick={() => handleActiveScreen("tokenselect")}
            className="token-select relative flex w-full rounded-2xl px-7 py-5 mt-2 items-center gap-x-4"
            data-testid="bridge-input-from-chain"
          >
            <Image
              src={selectedChain.logo}
              alt="icon-logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">{selectedChain.name}</span>
          </button>
        </div>
        <div className="relative w-max flex items-center">
          <button
            className="relative mt-6 w-9 h-9 hover:opacity-75"
            onClick={() => handleChainSwitch()}
            data-testid="bridge-input-refresh-button"
          >
            <Image src={refreshIcon} alt="icon-logo" />
          </button>
        </div>
        <div className="w-full">
          <p className="text-lg text-[#FFFFFF70] font-bold">To</p>
          <button
            className="token-select flex w-full px-7 py-5 mt-2 items-center gap-x-4"
            data-testid="bridge-input-to-chain"
          >
            <Image
              src={destinationChain?.logo}
              alt="icon-logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">{destinationChain.name}</span>
          </button>
        </div>
      </div>
      <div
        className="flex justify-between mt-8"
        data-testid="bridge-input-amount-section"
      >
        <p className="text-xs text-[#FFFFFF70] font-bold">Select Amount:</p>
        <p className="text-xs text-[#FFFFFF] font-bold">
          Balance:{" "}
          {fetchTokenBalanceLoading
            ? "loading..."
            : balanceAddress
              ? `${formatNumber(tokenBalances[balanceAddress] || 0)} ${selectedToken.symbol}`
              : `0 ${selectedToken.symbol}`}
        </p>
      </div>
      <div data-testid="bridge-input-amount-field">
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
          className="mt-4 text-error relative font-bold"
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
        className={wrongChain ? "mt-3" : "mt-8"}
        isLoading={isLoading || tokenDataLoading}
        disabled={isLoading || wrongChain}
        data-testid="bridge-input-action-button"
      >
        {buttonName}
      </Button>
      <div>
        <h2
          className="mt-8 text-xl font-bold"
          data-testid="bridge-input-summary-title"
        >
          Summary
        </h2>
        <div className="mt-5" data-testid="bridge-input-summary">
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
      <Toast
        isOpen={showToast}
        toastMessage={txMessage}
        txHash={txHash}
        status={txStatus}
        copyText={copyText}
      />
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
