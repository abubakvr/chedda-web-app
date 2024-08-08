"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BridgeInput } from "./BridgeInput";
import { TokenSelect } from "./TokenSelect";
import { ISourceChain, IToken } from "@/utils/types";
import { sourceChains } from "@/utils/constants";
import { useBridge } from "@/hooks";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { useLocalStorageGet } from "@/hooks/useLocalStorage";

export interface IBridgeCardProps {
  handleActiveScreen: (term: string) => void;
  activeScreen: string;
  estimatedGasFee: {
    gasETHFee: number;
    gasUSDFee: number;
  };
  tokenDataLoading: boolean;
  allowance: number;
  tokenPrice: number;
  tokenList: IToken[];
  getEstimatedGas: () => void;
  fetchTokenData: () => void;
  selectedToken: IToken;
  selectedChain: ISourceChain;
  setSelectedToken: React.Dispatch<React.SetStateAction<IToken>>;
  setSelectedChain: React.Dispatch<React.SetStateAction<ISourceChain>>;
}

export const BridgeCard = ({
  handleActiveScreen,
  activeScreen,
  estimatedGasFee,
  tokenDataLoading,
  allowance,
  tokenPrice,
  tokenList,
  getEstimatedGas,
  fetchTokenData,
  selectedToken,
  setSelectedToken,
  selectedChain,
  setSelectedChain,
}: IBridgeCardProps) => {
  const savedChainId = useLocalStorageGet("selectedBridgeChain");
  const [fetchTokenBalanceLoading, setFetchTokenBalanceLoading] =
    useState(false);

  const [tokenBalances, setTokenBalances] = useState<{
    [key: string]: number | null;
  }>({});

  const { getTokenBalance } = useBridge(selectedChain);

  const destinationChain =
    sourceChains.find((item) => item.key !== selectedChain?.key) ||
    selectedChain;

  function switchToSelectedChain(chain: ISourceChain) {
    setSelectedChain(chain);
    localStorage.setItem("selectedBridgeChain", `${chain.chainId}`);
  }

  const fetchBalances = useCallback(
    async (chain: ISourceChain) => {
      setFetchTokenBalanceLoading(true);
      const newBalances: { [key: string]: number | null } = {};

      try {
        for (const token of tokenList) {
          const balanceAddress =
            token.source === chain.key ? token.address : token.bridgedOft;

          if (token.bridgeToken && balanceAddress) {
            try {
              const balance = await getTokenBalance(balanceAddress);
              newBalances[balanceAddress] = parseBigNumberToFloat(
                balance,
                token.decimals
              );
            } catch (err) {
              console.error(
                `Error fetching balance for token ${token.symbol}:`,
                err
              );
              newBalances[balanceAddress] = null;
            }
          }
        }
        setTokenBalances(newBalances);
      } catch (err) {
        console.error("Error in fetchBalances:", err);
      } finally {
        setFetchTokenBalanceLoading(false);
      }
    },
    [getTokenBalance, tokenList]
  );

  useEffect(() => {
    fetchBalances(selectedChain);
  }, [fetchBalances, selectedChain]);

  useEffect(() => {
    if (savedChainId) {
      const savedChain = sourceChains.find(
        (item) => item.chainId.toString() === savedChainId.toString()
      );
      if (!savedChain) return;
      setSelectedChain(savedChain);
    }
  }, [savedChainId, setSelectedChain]);

  return (
    <div className="sticky ">
      <div className="flex justify-center mt-6">
        <div className="pool-card rounded-xl w-[580px] min-w-[470px] text-white px-8 py-8">
          {activeScreen === "tokenselect" ? (
            <TokenSelect
              handleActiveScreen={handleActiveScreen}
              switchToSelectedChain={switchToSelectedChain}
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              fetchTokenBalanceLoading={fetchTokenBalanceLoading}
              tokenList={tokenList}
              tokenBalances={tokenBalances}
            />
          ) : (
            <BridgeInput
              handleActiveScreen={handleActiveScreen}
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              tokenList={tokenList}
              fetchTokenBalanceLoading={fetchTokenBalanceLoading}
              switchToSelectedChain={switchToSelectedChain}
              tokenBalances={tokenBalances}
              estimatedGasFee={estimatedGasFee}
              destinationChain={destinationChain}
              fetchBalances={fetchBalances}
              getEstimatedGas={getEstimatedGas}
              fetchTokenData={fetchTokenData}
              tokenDataLoading={tokenDataLoading}
              allowance={allowance}
              tokenPrice={tokenPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BridgeCard;
