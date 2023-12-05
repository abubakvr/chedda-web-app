import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { IPoolStatsResponse } from "@/utils/types";
import { formatPoolStats, formatPoolStatsList } from "@/utils/formatResponse";

export const usePoolStatsList = () => {
  const [poolStatsList, setPoolStatsList] = useState<IPoolStatsResponse[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();

  const getPoolStatsList = async () => {
    if (!chedda || !currentEnvironment) return;

    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      const pools = await lendingPoolLens.activePools();
      return lendingPoolLens.getPoolStatsList(pools);
    } catch (error) {
      console.error("Error in getPoolStatsList:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPoolListData = async () => {
      if (!currentEnvironment) return;

      try {
        setIsLoading(true);
        const response = await getPoolStatsList();
        if (response) {
          const mappedObjects = formatPoolStatsList(
            response,
            currentEnvironment.tokens
          );
          setPoolStatsList(mappedObjects);
        }
      } catch (error) {
        console.error("error getting pools", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoolListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chedda]);

  return {
    poolStatsList,
    getPoolStatsList,
    isLoading,
  };
};

export const usePoolStats = (poolId: string) => {
  const [poolStats, setPoolStats] = useState<IPoolStatsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();

  const getPoolStats = useCallback(async () => {
    if (!chedda || !currentEnvironment || !poolId) return null;
    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      return await lendingPoolLens.getPoolStats(poolId);
    } catch (error) {
      console.error("Error in getPoolStats:", error);
      return null;
    }
  }, [chedda, currentEnvironment, signer, poolId]);

  const fetchPoolData = async () => {
    if (!currentEnvironment || !poolId) return;
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

  useEffect(() => {
    fetchPoolData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chedda]);

  return {
    poolStats,
    isLoading,
    getPoolStats,
  };
};
