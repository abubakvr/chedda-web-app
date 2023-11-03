import { useState, useEffect, useCallback, useMemo } from "react";
import { Signer } from "ethers";
import { useCheddaSdk } from "@/hooks/useCheddaSdk";
import { IAggregateStats } from "chedda-sdk";

export const useAggregateStats = () => {
  const [aggregateStats, setAggregateStats] = useState<IAggregateStats>();
  const { chedda, signer } = useCheddaSdk();
  const lens = chedda.poolLens(
    "0x7b45b2DDf88e0ceDC14172d2Fa2c0578EdEa5B9c",
    signer as Signer
  );

  const getAggregateStats = useCallback(async () => {
    const stats = await lens.getAggregateStats();
    setAggregateStats(stats);
  }, [lens]);

  useEffect(() => {
    getAggregateStats();
  }, []);
  return { aggregateStats };
};
