import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { useCheddaSdk } from "@/hooks/useCheddaSdk";
import { useEnvironment } from "./useEnvironment";
import { IPoolStatsResponse } from "@/utils/types";
import { formatPoolStats } from "@/utils/formatResponse";

export const usePools = () => {
  const [poolStats, setPoolStats] = useState<IPoolStatsResponse[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();

  const getPoolStats = useCallback(async () => {
    if (!chedda || !currentEnvironment) return null;

    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      const pools = await lendingPoolLens.activePools();
      return lendingPoolLens.getPoolStatsList(pools);
    } catch (error) {
      console.error("Error in getPoolStats:", error);
      return null;
    }
  }, [chedda, currentEnvironment, signer]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEnvironment) return;

      try {
        setIsLoading(true);
        const response = await getPoolStats();
        if (response) {
          const mappedObjects = formatPoolStats(
            response,
            currentEnvironment.tokens
          );
          setPoolStats(mappedObjects);
        }
      } catch (error) {
        console.error("error getting pools", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [chedda]);

  return { poolStats, isLoading, getPoolStats };
};
