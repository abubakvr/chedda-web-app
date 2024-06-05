"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BridgeInput } from "./BridgeInput";
import { TokenSelect } from "./TokenSelect";
import { TransactionDetails } from "./TransactionDetails";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IBridgeChain, IConfigToken } from "@/utils/types";
import { bridgeChains } from "@/utils/constants";
import { currentEnvironment } from "@/data/environments";
import { useBridge } from "@/hooks";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { PageTitle } from "@/components/common/pageTitle/PageTitle";
import { getTokenBalanceAddress, getTokenBridgeAddress } from "@/utils/helpers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const tokenList = Object.values(currentEnvironment.tokens);
const bridgeTokens = tokenList.filter((item) => item.bridgeToken);
const savedChain =
  typeof window !== "undefined"
    ? window?.localStorage.getItem("selectedBridgeChain")
    : "";

const BridgeCard = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeScreen = searchParams.get("screen");
  const { account } = useWeb3React();
  const [selectedChain, setSelectedCain] = useState<IBridgeChain>(
    bridgeChains.find((item) => item.chainId.toString() === savedChain) ||
      bridgeChains[0]
  );
  const [fetchTokenBalanceLoading, setFetchTokenBalanceLoading] =
    useState(false);
  const [selectedToken, setSelectedToken] = useState<IConfigToken>(
    bridgeTokens[0]
  );
  const { getTokenBalance, getTokenPrice, getTokenAllowance } =
    useBridge(selectedChain);
  const [tokenBalances, setTokenBalances] = useState<{
    [key: string]: number | null;
  }>({});
  const [estimatedGasFee, setEstimatedGas] = useState({
    gasETHFee: 0,
    gasUSDFee: 0,
  });
  const [tokenDataLoading, setTokenDataLoading] = useState(false);
  const [allowance, setAllowance] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const { quoteSend, getEthPrice } = useBridge(selectedChain);

  const destinationChain =
    bridgeChains.find((item) => item.key !== selectedChain.key) ||
    selectedChain;

  function switchToSelectedChain(chain: IBridgeChain) {
    setSelectedCain(chain);
    localStorage.setItem("selectedBridgeChain", `${chain.chainId}`);
  }

  const fetchBalances = useCallback(async () => {
    setFetchTokenBalanceLoading(true);
    const newBalances: { [key: string]: number | null } = {};
    for (const token of tokenList) {
      const balanceAddress =
        token.source === selectedChain.key ? token.address : token.bridgedOft;

      try {
        if (token.bridgeToken && balanceAddress) {
          const balance = await getTokenBalance(balanceAddress);
          newBalances[balanceAddress] = parseBigNumberToFloat(balance) ?? 0;
        }
      } catch (err) {
        setFetchTokenBalanceLoading(false);
        console.error(`Error fetching balance for token ${token.symbol}:`, err);
        newBalances[token.bridgedOft] = null;
      }
    }
    setTokenBalances(newBalances);
    setFetchTokenBalanceLoading(false);
  }, [selectedChain, getTokenBalance]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  const getEstimatedGas = useCallback(async () => {
    const tokenAddress = getTokenBridgeAddress(selectedToken, selectedChain);
    if (!account) return;
    const amountToSend = ethers.utils.parseUnits("0", selectedToken.decimals);

    const [nativeFee] = await quoteSend(
      tokenAddress,
      destinationChain.endpointId,
      amountToSend
    );
    if (!nativeFee) return;
    const ethGasPrice = await getEthPrice();
    const parsedNativeFee = parseBigNumberToFloat(nativeFee, 18, 10);
    setEstimatedGas({
      gasETHFee: parsedNativeFee,
      gasUSDFee: parsedNativeFee * (ethGasPrice || 0),
    });
  }, [
    account,
    selectedToken,
    selectedChain,
    destinationChain.endpointId,
    setEstimatedGas,
    getEthPrice,
    quoteSend,
  ]);

  const fetchTokenData = useCallback(async () => {
    setTokenDataLoading(true);
    const balanceAddress = getTokenBalanceAddress(selectedToken, selectedChain);
    try {
      const tokenAllowance =
        selectedToken.source === selectedChain.key &&
        selectedToken.type === "oftAdapter"
          ? await getTokenAllowance(
              balanceAddress,
              selectedToken.oftAdapter ?? ""
            )
          : null;

      const price = await getTokenPrice(selectedToken.address);

      const parsedAllowance = parseBigNumberToFloat(
        tokenAllowance,
        selectedToken.decimals,
        10
      );
      setAllowance(parsedAllowance);
      setTokenPrice(price || 0);
      setTokenDataLoading(false);
    } catch (error) {
      console.error("Error fetching token data:", error);
    } finally {
      setTokenDataLoading(false);
    }
  }, [getTokenPrice, getTokenAllowance, selectedChain, selectedToken]);

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
              switchToSelectedChain={switchToSelectedChain}
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              fetchTokenBalanceLoading={fetchTokenBalanceLoading}
              tokenList={tokenList}
              tokenBalances={tokenBalances}
            />
          ) : activeScreen === "details" ? (
            <TransactionDetails handleActiveScreen={handleActiveScreen} />
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
