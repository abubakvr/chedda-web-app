import { Chedda } from "chedda-sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers, JsonRpcSigner, Signer } from "ethers";
import { getErrorMessageFromCode } from "@/utils/helpers";
import { ISourceChain } from "@/utils/types";
import { useCallback, useMemo } from "react";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { sourceChains, ethAddress } from "@/utils/constants";

export const useBridge = (selectedChain: ISourceChain | null) => {
  const { provider, account } = useWeb3React();

  const chedda = useMemo(() => {
    if (!selectedChain) {
      return null;
    }
    return new Chedda(selectedChain.jsonRpcUrl);
  }, [selectedChain]);

  const signer = useMemo(() => {
    if (!provider?.getSigner || !account) return null;
    return provider.getSigner(account);
  }, [provider, account]);

  const priceChedda = useMemo(() => {
    return new Chedda(sourceChains[0].jsonRpcUrl);
  }, []);

  const executeTransaction = useCallback(
    async (transaction: () => Promise<any>) => {
      if (!account) return;
      try {
        return await transaction();
      } catch (error: any) {
        const errorMessage = getErrorMessageFromCode(error.code);
        console.error(error);
        throw new Error(JSON.stringify({ errorMessage, fullText: error }));
      }
    },
    [account]
  );

  const getSendParam = useCallback(
    (endpointId: number, amountToSend: bigint) => {
      if (!account || !chedda || !endpointId || !amountToSend) return null;
      const options = Options.newOptions()
        .addExecutorLzReceiveOption(200000, 0)
        .toHex()
        .toString();
      return [
        endpointId,
        ethers.zeroPadValue(account, 32),
        amountToSend,
        amountToSend,
        options,
        `0x`,
        `0x`,
      ] as any;
    },
    [account, chedda]
  );

  const approveAsset = async (
    tokenAddress: string,
    oftAddress: string,
    amount: bigint
  ) =>
    executeTransaction(async () => {
      if (!amount || !account || !chedda || !signer) return;
      const genericOFT = chedda.genericOFT(tokenAddress, signer as any);
      return genericOFT?.approve(oftAddress, amount);
    });

  const quoteSend = useCallback(
    async (tokenAddress: string, endpointId: number, amountToSend: bigint) => {
      if (!account || !chedda || !endpointId || !signer) return;
      const sendParam = getSendParam(endpointId, amountToSend);
      if (!sendParam) return;
      const genericOFT = chedda.genericOFT(tokenAddress, signer as any);
      return await genericOFT?.quoteSend(sendParam, false);
    },
    [account, chedda, signer, getSendParam]
  );

  const sendOFT = async (
    tokenAddress: string,
    endpointId: number,
    amountToSend: bigint,
    refundAddress: string
  ) =>
    executeTransaction(async () => {
      if (!account || !chedda || !signer) return;
      const sendParam = getSendParam(endpointId, amountToSend);
      if (!sendParam) return;
      const genericOFT = chedda.genericOFT(tokenAddress, signer as any);
      const [nativeFee] = await quoteSend(
        tokenAddress,
        endpointId,
        amountToSend
      );
      return genericOFT?.send(sendParam, nativeFee, refundAddress);
    });

  const getTokenPrice = useCallback(
    async (tokenAddress: string) => {
      if (!tokenAddress || !chedda || !selectedChain?.priceFeed) return;
      const priceOracle = chedda.priceOracle(selectedChain.priceFeed);
      const decimals = await priceOracle.decimals();
      const assetPrice = await priceOracle.readPrice(tokenAddress);
      return parseBigNumberToFloat(assetPrice, decimals, 10);
    },
    [chedda, selectedChain?.priceFeed]
  );

  const getTokenBalance = useCallback(
    async (tokenAddress: string) => {
      return executeTransaction(async () => {
        if (!account || !tokenAddress || !chedda || !signer) return;
        const token = chedda.erc20token(tokenAddress, signer as any);
        return token?.balanceOf(account);
      });
    },
    [account, chedda, signer, executeTransaction]
  );

  const getTokenAllowance = useCallback(
    async (tokenAddress: string, oftAddress: string) => {
      if (!account || !tokenAddress || !oftAddress || !chedda || !signer)
        return;
      const token = chedda.erc20token(tokenAddress, signer as any);
      return token?.allowance(account, oftAddress);
    },
    [account, chedda, signer]
  );

  const getEthPrice = useCallback(async () => {
    const priceOracle = priceChedda.priceOracle(sourceChains[0].priceFeed);
    const decimals = await priceOracle.decimals();
    const assetPrice = await priceOracle.readPrice(ethAddress);
    return parseBigNumberToFloat(assetPrice, decimals, 10);
  }, [priceChedda]);

  return {
    approveAsset,
    sendOFT,
    quoteSend,
    getTokenBalance,
    getTokenPrice,
    getTokenAllowance,
    getEthPrice,
  };
};
