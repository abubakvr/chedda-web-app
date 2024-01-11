import { useCallback, useEffect, useMemo, useState } from "react";
import { useCheddaSdk } from "./useCheddaSdk";
import { useEnvironment } from "./useEnvironment";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";

export const useFetcher = <T = any,>(
  poolId: string,
  getData: (params: {
    lens: any;
    poolId: string;
    account?: string;
    chedda: any;
    signer?: Signer;
    environment: any;
  }) => Promise<T | null>
) => {
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();

  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const getDataName = useCallback(
    () => getData.name || "unknownFunction",
    [getData]
  );

  const lens = useMemo(() => {
    if (chedda && currentEnvironment) {
      return chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
    }
    return null;
  }, [chedda, currentEnvironment, signer]);

  const fetchData = useCallback(async () => {
    try {
      if (!chedda || !currentEnvironment) {
        return null;
      }

      const response = await getData({
        lens,
        poolId,
        account,
        chedda,
        signer,
        environment: currentEnvironment,
      });

      return response;
    } catch (error: any) {
      throw new Error(
        `Error in fetchData for ${getDataName()}: ${error.message}`
      );
    }
  }, [
    chedda,
    currentEnvironment,
    lens,
    signer,
    account,
    getData,
    getDataName,
    poolId,
  ]);

  useEffect(() => {
    const fetchCheddaData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData();
        if (response !== null && response !== undefined) {
          setData(response);
        }
      } catch (error: any) {
        setIsLoading(false);
        throw new Error(
          `Error in fetchData for ${getDataName()}: ${error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheddaData();
  }, [fetchData, getDataName]);

  return {
    data,
    isLoading,
    fetchData,
  };
};
