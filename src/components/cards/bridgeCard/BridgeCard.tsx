"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BridgeInput } from "./BridgeInput";
import { TokenSelect } from "./TokenSelect";
import { ISourceChain, IToken } from "@/utils/types";
import { sourceChains } from "@/utils/constants";
import { useBridge } from "@/hooks";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { useLocalStorageGet } from "@/hooks/useLocalStorage";
import { PageTitle } from "@/components/common";

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
      <div className="md:hidden">
        <PageTitle title="BRIDGE">
          Bridge assets from other networks to use on Chedda. Bridged assets can
          be supplied or used as collateral in Chedda lending pools. Bridged
          assets can be bridged back at any time.
        </PageTitle>
      </div>
      <div className="flex justify-center mt-4 md:mt-6">
        <div className="pool-card rounded-xl w-full sm:w-[450px] md:w-[450px] lg:w-[580px] text-white p-4 py-5 md:p-6 lg:p-8">
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
