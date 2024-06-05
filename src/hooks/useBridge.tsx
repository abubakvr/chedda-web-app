import { Chedda } from "chedda-sdk";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { getErrorMessageFromCode } from "@/utils/helpers";
import { IBridgeChain } from "@/utils/types";
import { useCallback, useMemo } from "react";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { bridgeChains, ethAddress } from "@/utils/constants";

export const useBridge = (selectedChain: IBridgeChain | null) => {
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

  const getSendParam = (endpointId: number, amountToSend: BigNumber) => {
    if (!account || !chedda || !endpointId || !amountToSend) return null;
    const options = Options.newOptions()
      .addExecutorLzReceiveOption(200000, 0)
      .toHex()
      .toString();
    return [
      endpointId,
      ethers.utils.zeroPad(account, 32),
      amountToSend,
      amountToSend,
      options,
      `0x`,
      `0x`,
    ] as any;
  };

  const approveAsset = async (
    tokenAddress: string,
    oftAddress: string,
    amount: BigNumber
  ) =>
    executeTransaction(async () => {
      if (!amount || !account || !chedda || !signer) return;
      const genericOFT = chedda.genericOFT(tokenAddress, signer);
      return genericOFT?.approve(oftAddress, amount);
    });

  const quoteSend = async (
    tokenAddress: string,
    endpointId: number,
    amountToSend: BigNumber
  ) => {
    if (!account || !chedda || !endpointId || !signer) return;
    const sendParam = getSendParam(endpointId, amountToSend);
    if (!sendParam) return;
    const genericOFT = chedda.genericOFT(tokenAddress, signer);
    return await genericOFT?.quoteSend(sendParam, false);
  };

  const sendOFT = async (
    tokenAddress: string,
    endpointId: number,
    amountToSend: BigNumber,
    refundAddress: string
  ) =>
    executeTransaction(async () => {
      if (!account || !chedda || !signer) return;
      const sendParam = getSendParam(endpointId, amountToSend);
      if (!sendParam) return;
      const genericOFT = chedda.genericOFT(tokenAddress, signer);
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
        const token = chedda.erc20token(tokenAddress, signer);
        return token?.balanceOf(account);
      });
    },
    [account, chedda, signer, executeTransaction]
  );

  const getTokenAllowance = useCallback(
    async (tokenAddress: string, oftAddress: string) => {
      return executeTransaction(async () => {
        if (!account || !tokenAddress || !oftAddress || !chedda || !signer)
          return;
        const token = chedda.erc20token(tokenAddress, signer);
        return token?.allowance(account, oftAddress);
      });
    },
    [account, chedda, signer, executeTransaction]
  );

  const getEthPrice = useCallback(async () => {
    const priceChedda = new Chedda(bridgeChains[0].jsonRpcUrl);
    const priceOracle = priceChedda.priceOracle(bridgeChains[0].priceFeed);
    const decimals = await priceOracle.decimals();
    const assetPrice = await priceOracle.readPrice(ethAddress);
    return parseBigNumberToFloat(assetPrice, decimals, 10);
  }, []);

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
