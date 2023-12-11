import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { IAggregateStats } from "chedda-sdk";
import { useCheddaSdk } from "./useCheddaSdk";
import { useEnvironment } from "./useEnvironment";

export const useAggregateStats = () => {
  const [aggregateStats, setAggregateStats] = useState<IAggregateStats>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();

  const getAggregateStats = useCallback(async () => {
    if (!currentEnvironment || !chedda) return;
    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      const stats = await lendingPoolLens.getAggregateStats();
      return stats;
    } catch (error) {
      console.error("Error in getAggregateStats:", error);
    }
  }, [currentEnvironment, chedda, signer]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentEnvironment) return;
      try {
        setIsLoading(true);
        const response = await getAggregateStats();
        if (response) {
          setAggregateStats(response);
        }
      } catch (error) {
        console.error("error getting stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [chedda]);

  return { aggregateStats, isLoading, getAggregateStats };
};
