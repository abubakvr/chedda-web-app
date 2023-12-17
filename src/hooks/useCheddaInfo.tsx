import { useState, useEffect, useCallback } from "react";
import { Signer } from "ethers";
import { useCheddaSdk, useEnvironment } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { IAccountInfo, IMarketInfo } from "chedda-sdk";
import { ICollateralInfo } from "@/utils/types";

interface HookResult<T> {
  data?: T;
  isLoading: boolean;
  fetchData: () => Promise<T | null>;
}

type GetDataFunction<T> = (
  lens: any,
  poolId: string,
  account?: string
) => Promise<T | null>;

const useCheddaData = <T = any,>(
  poolId: string,
  getData: GetDataFunction<T>
): HookResult<T> => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();

  const fetchData = useCallback(async () => {
    if (
      !chedda ||
      !currentEnvironment ||
      !poolId ||
      (!account && getData === getAccountInfo)
    )
      return null;
    try {
      const lendingPoolLens = chedda.poolLens(
        currentEnvironment.contracts.LendingPoolLens,
        signer as Signer
      );
      return await getData(lendingPoolLens, poolId, account);
    } catch (error) {
      console.error(`Error in fetchData for ${getData.name}:`, error);
      return null;
    }
  }, [chedda, currentEnvironment, signer, poolId, account, getData]);

  const fetchCheddaData = async () => {
    if (!currentEnvironment || !poolId) return;
    try {
      setIsLoading(true);
      const response = await fetchData();
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error(`Error getting ${getData.name} data`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheddaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chedda, account]);

  return {
    data,
    isLoading,
    fetchData,
  };
};

export const getAccountInfo: GetDataFunction<IAccountInfo> = async (
  lens,
  poolId,
  account
) => {
  return await lens.getPoolAccountInfo(
    poolId,
    "0x3382Bb7214c109f12Ffe8aA9C39BAf7eDB991427"
  );
};

export const getMarketInfo: GetDataFunction<IMarketInfo> = async (
  lens,
  poolId
) => {
  return await lens.getMarketInfo(poolId);
};

export const getCollateralInfo: GetDataFunction<ICollateralInfo[]> = async (
  lens,
  poolId
) => {
  return await lens.getPoolCollateral(poolId);
};

export const useAccountInfo = (poolId: string): HookResult<IAccountInfo> =>
  useCheddaData<IAccountInfo>(poolId, getAccountInfo);

export const useMarketInfo = (poolId: string): HookResult<IMarketInfo> =>
  useCheddaData<IMarketInfo>(poolId, getMarketInfo);

export const useCollateralInfo = (
  poolId: string
): HookResult<ICollateralInfo[]> =>
  useCheddaData<ICollateralInfo[]>(poolId, getCollateralInfo);
