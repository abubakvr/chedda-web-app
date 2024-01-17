import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { Chedda } from "chedda-sdk";
import { HookResult, IEnvironment } from "@/utils/types";
import { useParams } from "next/navigation";

export const FetcherContext = createContext<HookResult<any> | undefined>(
  undefined
);

export interface FetcherProviderProps<T = unknown> {
  children: ReactNode;
  getData: (params: {
    lens: any;
    poolId: string;
    account?: string;
    chedda: Chedda;
    signer?: Signer;
    environment: IEnvironment;
    asset?: string;
  }) => Promise<T | null>;
  asset?: string | undefined;
}

interface FetcherContextProps<T> {
  data: T | undefined;
  isLoading: boolean;
  fetchCheddaData: () => void;
}

export const useFetcherContext = <T = any,>(
  getData: (params: any) => Promise<T | null>,
  asset?: string | undefined
): FetcherContextProps<T> => {
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();
  const { poolId } = useParams();
  const [data, setData] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const strPoolId = poolId?.toString() ?? "";

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
        poolId: strPoolId,
        account,
        chedda,
        signer,
        environment: currentEnvironment,
        asset,
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
    asset,
  ]);

  const fetchCheddaData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchData();
      console.log("response", response);
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
  }, [fetchData, setIsLoading, setData, getDataName]);

  useEffect(() => {
    fetchCheddaData();
  }, [fetchCheddaData]);

  const contextValues: FetcherContextProps<T> = {
    data,
    isLoading,
    fetchCheddaData,
  };

  return contextValues;
};
