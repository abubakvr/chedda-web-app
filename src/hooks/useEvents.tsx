import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import { IPoolState } from "chedda-sdk";
import { useCheddaSdk } from "@/hooks";
import { createTimestamps, findNearestIndex } from "@/utils/createTimestamps";

export const usePoolState = (poolId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [poolStateEvents, setPoolStateEvents] = useState<
    (IPoolState | null | undefined)[]
  >([]);
  const { chedda, signer } = useCheddaSdk();
  const graphTimes = createTimestamps(new Date(), 0.3, 25);

  async function fetchData() {
    setIsLoading(true);

    try {
      if (!chedda || !poolId) {
        return;
      }

      const lendingPool = chedda.lendingPool(poolId, signer as Signer);
      const events = await lendingPool.getEventLogs<IPoolState>(
        "PoolState",
        0,
        "latest"
      );

      const eventTimestamps =
        events?.map((item: IPoolState) => {
          const timeStamp = ethers.utils.formatUnits(item.timestamp, 0);
          return parseInt(timeStamp);
        }) || [];

      const eventsToGraph = graphTimes.map((timestamp) => {
        const index = findNearestIndex(eventTimestamps, timestamp);
        const event = index !== -1 ? events?.[index] : null;

        // Create a new object with the additional property
        const eventWithTimePoint = event
          ? { ...event, timePoint: timestamp }
          : null;

        return eventWithTimePoint;
      });

      setPoolStateEvents(eventsToGraph);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error("Error in usePoolState: " + error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [chedda, poolId]);

  return { isLoading, graphTimes, poolStateEvents, fetchData };
};
