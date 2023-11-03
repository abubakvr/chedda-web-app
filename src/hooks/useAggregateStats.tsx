import { useState, useEffect, useCallback, useMemo } from "react";
import { Signer } from "ethers";
import { useCheddaSdk } from "@/hooks/useCheddaSdk";
import { IAggregateStats } from "chedda-sdk";
import { useEnvironment } from "./useEnviroment";

export const useAggregateStats = () => {
  const [aggregateStats, setAggregateStats] = useState<IAggregateStats>();
  const { chedda, signer } = useCheddaSdk();
  const { currentEnvironment } = useEnvironment();
  const lens = chedda.poolLens(
    currentEnvironment.contracts.LendingPoolLens,
    signer as Signer
  );

  const getAggregateStats = useCallback(async () => {
    const stats = await lens.getAggregateStats();
    setAggregateStats(stats);
  }, [lens]);

  useEffect(() => {
    getAggregateStats();
  }, [currentEnvironment]);
  return { aggregateStats };
};
