"use client";
import { ethers } from "ethers";
import { PageContainer } from "@/components/common";
import { BridgeCard } from "@/components/cards/bridgeCard/BridgeCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBridge } from "@/hooks";
import { Suspense, useCallback, useEffect, useState } from "react";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { getTokenBalanceAddress, getTokenBridgeAddress } from "@/utils/helpers";
import { sourceChains } from "@/utils/constants";
import { ISourceChain, IToken } from "@/utils/types";
import { currentEnvironment } from "@/data/environments";

const tokenList = Object.values(currentEnvironment.tokens);
const bridgeTokens = tokenList.filter((item) => item.bridgeToken);

const Page = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeScreen = searchParams.get("screen");

  const [estimatedGasFee, setEstimatedGas] = useState({
    gasETHFee: 0,
    gasUSDFee: 0,
  });
  const [tokenDataLoading, setTokenDataLoading] = useState(false);
  const [allowance, setAllowance] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<IToken>(bridgeTokens[0]);
  const [selectedChain, setSelectedChain] = useState<ISourceChain>(
    sourceChains[0]
  );
  const { getTokenPrice, getTokenAllowance, quoteSend, getEthPrice } =
    useBridge(selectedChain);

  const destinationChain =
    sourceChains.find((item) => item.key !== selectedChain?.key) ||
    selectedChain;

  function handleActiveScreen(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("screen", term);
    } else {
      params.delete("screen");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const getEstimatedGas = useCallback(async () => {
    try {
      const tokenAddress = getTokenBridgeAddress(selectedToken, selectedChain);
      const amountToSend = ethers.parseUnits("1", selectedToken.decimals);
      const quoteResult = await quoteSend(
        tokenAddress,
        destinationChain.endpointId,
        amountToSend
      );

      if (quoteResult.length === 0) return;
      const [nativeFee] = quoteResult;
      const ethGasPrice = await getEthPrice();
      const parsedNativeFee = parseBigNumberToFloat(nativeFee[0], 18, 10);

      setEstimatedGas({
        gasETHFee: parsedNativeFee,
        gasUSDFee: parsedNativeFee * (ethGasPrice || 0),
      });
    } catch (error) {
      console.error("Error estimating gas:", error);
    }
  }, [selectedToken, selectedChain, destinationChain, quoteSend, getEthPrice]);

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
          : undefined;

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

  useEffect(() => {
    getEstimatedGas();
  }, [getEstimatedGas]);

  useEffect(() => {
    fetchTokenData();
  }, [fetchTokenData]);

  return (
    <Suspense>
      <PageContainer>
        <BridgeCard
          handleActiveScreen={handleActiveScreen}
          activeScreen={activeScreen!}
          estimatedGasFee={estimatedGasFee}
          tokenDataLoading={tokenDataLoading}
          allowance={allowance}
          tokenPrice={tokenPrice}
          tokenList={tokenList}
          getEstimatedGas={getEstimatedGas}
          fetchTokenData={fetchTokenData}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
        />
      </PageContainer>
    </Suspense>
  );
};

export default Page;
