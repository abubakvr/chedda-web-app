"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BridgeInput } from "./BridgeInput";
import { TokenSelect } from "./TokenSelect";
import { ConfirmationScreen } from "./Confirmation";
import { TransactionDetails } from "./TransactionDetails";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IBridgeToken, IConfigToken } from "@/utils/types";
import { bridgeChains } from "@/utils/constants";
import { currentEnvironment } from "@/data/environments";
import { useTransaction } from "@/hooks";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { PageTitle } from "@/components/common/pageTitle/PageTitle";

const tokenList = Object.values(currentEnvironment.tokens);
const bridgeTokens = tokenList.filter((item) => item.bridgeToken);

const BridgeCard = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeScreen = searchParams.get("screen");
  const { replace } = useRouter();
  const [selectedChain, setSelectedCain] = useState<IBridgeToken>(
    bridgeChains[1]
  );
  const [selectedToken, setSelectedToken] = useState<IConfigToken>(
    bridgeTokens[0]
  );
  const { getTokenBalance } = useTransaction("");
  const [tokenBalances, setTokenBalances] = useState<{
    [key: string]: number | null;
  }>({});

  const [fetchTokenBalanceLoading, setFetchTokenBalanceLoading] =
    useState(false);
  const stableTokenList = JSON.stringify(tokenList); // Serialize tokenList for dependency comparison

  const fetchBalances = useCallback(async () => {
    setFetchTokenBalanceLoading(true);
    const newBalances: { [key: string]: number | null } = {};
    for (const token of tokenList) {
      if (token.bridgeToken) {
        try {
          const balance = await getTokenBalance(token.address);
          newBalances[token.address] = parseBigNumberToFloat(balance) ?? 0;
        } catch (err) {
          setFetchTokenBalanceLoading(false);
          console.error(
            `Error fetching balance for token ${token.symbol}:`,
            err
          );
          newBalances[token.address] = null;
        }
      }
    }
    setTokenBalances(newBalances);
    setFetchTokenBalanceLoading(false);
  }, [stableTokenList, getTokenBalance]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  function handleActiveScreen(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("screen", term);
    } else {
      params.delete("screen");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="sticky">
      <PageTitle title="BRIDGE">
        Bridge assets from other networks to use on Chedda. Bridged assets can
        supplied or as collateral in Chedda lending pools.
        <br />
        Bridged assets can be bridged back at any time
      </PageTitle>
      <div className="flex justify-center mt-6">
        <div className=" pool-card rounded-xl w-[580px] min-w-[470px] text-white px-8 py-8">
          {activeScreen === "tokenselect" ? (
            <TokenSelect
              handleActiveScreen={handleActiveScreen}
              setSelectedChain={setSelectedCain}
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              fetchTokenBalanceLoading={fetchTokenBalanceLoading}
              tokenList={tokenList}
              tokenBalances={tokenBalances}
            />
          ) : activeScreen === "confirmation" ? (
            <ConfirmationScreen handleActiveScreen={handleActiveScreen} />
          ) : activeScreen === "details" ? (
            <TransactionDetails handleActiveScreen={handleActiveScreen} />
          ) : (
            <BridgeInput
              handleActiveScreen={handleActiveScreen}
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              tokenList={tokenList}
              setSelectedChain={setSelectedCain}
              tokenBalances={tokenBalances}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BridgeCard;
