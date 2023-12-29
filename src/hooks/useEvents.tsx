import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import { IPoolState } from "chedda-sdk";
import { useCheddaSdk } from "@/hooks";
import { createTimestamps, findNearestIndex } from "@/utils/findNearestIndex";

export const useEventHistory = (poolId: string) => {
  const [loading, setLoading] = useState(true);
  const [eventsToGraph, setEventsToGraph] = useState<
    (IPoolState | null | undefined)[]
  >([]);
  const { chedda, signer } = useCheddaSdk();
  const graphTimes = createTimestamps(new Date(), 0.3, 25);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!chedda || !poolId) return null;
      console.log(poolId);
      try {
        const lendingPool = chedda.lendingPool(poolId, signer as Signer);
        console.log(lendingPool);
        const events = await lendingPool.getEventLogs<IPoolState>(
          "PoolState",
          0,
          "latest"
        );

        const sortedNumbers =
          events?.map((item: IPoolState) => {
            const numsa = ethers.utils.formatUnits(item.timestamp, 0);
            return parseInt(numsa);
          }) || [];

        const newEventsToGraph = graphTimes.map((timestamp) => {
          const index = findNearestIndex(sortedNumbers, timestamp);
          return index !== -1 ? events?.[index] : null;
        });

        setEventsToGraph(newEventsToGraph);
        setLoading(false);
      } catch (error) {
        console.error("Error in useEventHistory:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [chedda, poolId]);

  return { loading, graphTimes, eventsToGraph };
};
