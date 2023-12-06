import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { IAccountInfoData } from "@/utils/types";

export const useAccountInfo = (poolId: string) => {
  const [accountInfo, setAccountInfo] = useState<IAccountInfoData>();
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
      return await lendingPoolLens.getPoolAccountInfo(poolId, account);
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
        setAccountInfo(response);
      }
    } catch (error) {
      console.error("error fetching account data", error);
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
