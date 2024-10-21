import { Chedda } from "chedda-sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getErrorMessageFromCode } from "@/utils/helpers";
import { ISourceChain } from "@/utils/types";
import { useCallback, useMemo } from "react";
import { parseBigNumberToFloat } from "@/utils/formatters";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { sourceChains, ethAddress } from "@/utils/constants";
import { useSigner, useToast } from "@/hooks";

export const useBridge = (selectedChain: ISourceChain | null) => {
  const { account } = useWeb3React();
  const { signer } = useSigner();
  const { addToast } = useToast();

  const chedda = useMemo(() => {
    if (!selectedChain) {
      return undefined;
    }
    return new Chedda(selectedChain.jsonRpcUrl);
  }, [selectedChain]);

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
      try {
        if (!account || !chedda || !endpointId || !amountToSend) {
          console.error("error in getSendParam, Check parameters");
          addToast({
            message: `An error occured,`,
            type: "error",
          });
          return undefined;
        }

        const options = Options.newOptions()
          .addExecutorLzReceiveOption(200000, 0)
          .toHex()
          .toString();

        const sendParam = [
          endpointId,
          ethers.zeroPadValue(account, 32),
          amountToSend,
          amountToSend,
          options,
          `0x`,
          `0x`,
        ];

        return sendParam;
      } catch (error) {
        console.error("Error in getSendParam:", error);
        return undefined;
      }
    },
    [account, chedda, addToast]
  );

  const approveAsset = async (
    tokenAddress: string,
    oftAddress: string,
    amount: bigint
  ) =>
    executeTransaction(async () => {
      if (!amount || !account || !chedda || !signer) return;
      const cxToken = chedda.cxToken(tokenAddress, signer);
      return cxToken?.approve(oftAddress, amount);
    });

  const quoteSend = useCallback(
    async (tokenAddress: string, endpointId: number, amountToSend: bigint) => {
      try {
        if (!account || !chedda || !endpointId || !signer) return [];
        const sendParam = getSendParam(endpointId, amountToSend);
        if (!sendParam) return [];
        const cxToken = chedda.cxToken(tokenAddress, signer);
        const result = await cxToken?.quoteSend(sendParam, false);
        return result ? [result] : []; // Ensure result is an array
      } catch (error) {
        console.error("Error in quoteSend:", error);
        addToast({
          message: `An error occured,`,
          type: "fetchError",
        });
        return [];
      }
    },
    [account, chedda, signer, getSendParam, addToast]
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
      const cxToken = chedda.cxToken(tokenAddress, signer);

      const [nativeFee] = await quoteSend(
        tokenAddress,
        endpointId,
        amountToSend
      );
      return cxToken?.send(sendParam, nativeFee[0], refundAddress);
    });

  const getTokenPrice = useCallback(
    async (tokenAddress: string) => {
      try {
        if (!tokenAddress || !chedda || !selectedChain?.priceFeed)
          return undefined;

        const priceOracle = chedda.priceOracle(selectedChain.priceFeed);
        const decimals = await priceOracle.decimals();
        const assetPrice = await priceOracle.readPrice(tokenAddress);
        return parseBigNumberToFloat(assetPrice, decimals, 10);
      } catch (error) {
        console.error("Failed to get token price:", error);
        addToast({
          message: `An error occured,`,
          type: "fetchError",
        });
        return undefined;
      }
    },
    [chedda, selectedChain?.priceFeed, addToast]
  );

  const getTokenBalance = useCallback(
    async (tokenAddress: string) => {
      try {
        if (!account || !tokenAddress || !chedda || !signer) return undefined;

        const token = chedda.erc20token(tokenAddress, signer);
        return await token?.balanceOf(account);
      } catch (error) {
        console.error("Failed to get token balance:", error);
        addToast({
          message: `An error occured,`,
          type: "fetchError",
        });
        return undefined;
      }
    },
    [account, chedda, signer, addToast]
  );

  const getTokenAllowance = useCallback(
    async (tokenAddress: string, oftAddress: string) => {
      try {
        if (!account || !tokenAddress || !oftAddress || !chedda || !signer)
          return;

        const token = chedda.erc20token(tokenAddress, signer);
        return await token?.allowance(account, oftAddress);
      } catch (error) {
        console.error("Failed to get token allowance:", error);
        addToast({
          message: `An error occured,`,
          type: "fetchError",
        });
        return undefined;
      }
    },
    [account, chedda, signer, addToast]
  );

  const getEthPrice = useCallback(async () => {
    try {
      const priceOracle = priceChedda.priceOracle(sourceChains[0].priceFeed);
      const decimals = await priceOracle.decimals();
      const assetPrice = await priceOracle.readPrice(ethAddress);
      return parseBigNumberToFloat(assetPrice, decimals, 10);
    } catch (error) {
      console.error("Failed to get ETH price:", error);
      addToast({
        message: `An error occured,`,
        type: "fetchError",
      });
      return undefined;
    }
  }, [priceChedda, addToast]);

  return {
    approveAsset,
    sendOFT,
    quoteSend,
    getTokenBalance,
    getTokenPrice,
    getTokenAllowance,
    getEthPrice,
    getSendParam,
  };
};
