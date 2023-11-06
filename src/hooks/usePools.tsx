import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { useCheddaSdk } from "@/hooks/useCheddaSdk";
import { useEnvironment } from "./useEnviroment";
import { IPoolStats } from "chedda-sdk";
import { convertResponseToObject } from "@/utils/formatResponse";

export const usePools = () => {
  const { chedda, signer } = useCheddaSdk();
  const { currentEnvironment } = useEnvironment();
  const lens = chedda.poolLens(
    currentEnvironment.contracts.LendingPoolLens,
    signer as Signer
  );

  const getPoolStats = useCallback(async () => {
    const pools = await lens.activePools();
    return lens.getPoolStatsList(pools);
  }, [lens]);

  const [poolStats, setPoolStats] = useState<any>(undefined);

  useEffect(() => {
    getPoolStats()
      .then((response) => {
        if (response) {
          const mappedObjects = convertResponseToObject(
            response,
            currentEnvironment.tokens
          );
          setPoolStats(mappedObjects);
        } else {
          console.error("poolStats is undefined");
        }
      })
      .catch((error: any) => {
        console.error("error getting stats", error);
      });
    console.log(currentEnvironment);
  }, [currentEnvironment]);

  return { poolStats };
};
