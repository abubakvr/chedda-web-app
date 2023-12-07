import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { IAccountInfo, IMarketInfo } from "@/chedda-sdk";

export const useAccountInfo = (poolId: string) => {
  const [accountInfo, setAccountInfo] = useState<IAccountInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();

  const getAccountInfo = useCallback(async () => {
    if (!chedda || !currentEnvironment || !poolId || !account) return null;
    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      return await lendingPoolLens.getPoolAccountInfo(
        poolId,
        "0x3382Bb7214c109f12Ffe8aA9C39BAf7eDB991427"
      );
    } catch (error) {
      console.error("Error in getAccountInfo:", error);
      return null;
    }
  }, [chedda, currentEnvironment, signer, poolId, account]);

  const fetchAccountData = async () => {
    if (!currentEnvironment || !poolId) return;
    try {
      setIsLoading(true);
      const response = await getAccountInfo();
      if (response) {
        console.log("account info", response);
        setAccountInfo(response);
      }
    } catch (error) {
      console.error("error getting account data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chedda, account]);

  return {
    accountInfo,
    isLoading,
    getAccountInfo,
  };
};

export const useMarketInfo = (poolId: string) => {
  const [marketInfo, setMarketInfo] = useState<IMarketInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();

  const getMarketInfo = useCallback(async () => {
    if (!chedda || !currentEnvironment || !poolId) return null;
    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      return await lendingPoolLens.getMarketInfo(poolId);
    } catch (error) {
      console.error("Error in getMarketInfo:", error);
      return null;
    }
  }, [chedda, currentEnvironment, signer, poolId]);

  const fetchMarketData = async () => {
    if (!currentEnvironment || !poolId) return;
    try {
      setIsLoading(true);
      const response = await getMarketInfo();
      if (response) {
        console.log(response);
        setMarketInfo(response);
      }
    } catch (error) {
      console.error("error getting pools", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chedda]);

  return {
    marketInfo,
    isLoading,
    getMarketInfo,
  };
};
