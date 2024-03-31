import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchData,
  selectCheddaSliceData,
  selectCheddaSliceLoading,
} from "@/redux/api/cheddaSlice";
import { useEnvironment, useCheddaSdk } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { useParams } from "next/navigation";
import { GetDataFunction } from "@/utils/types";

export const useFetcher = <T = any,>(
  getData: GetDataFunction<T>,
  asset?: string,
  decimals?: number
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();
  const { poolId } = useParams();

  const strPoolId = poolId?.toString();
  const hookName = getData.name;

  const fetchDataCallback = useCallback(
    (showLoading?: boolean) => {
      dispatch(
        fetchData({
          hookName,
          showLoading,
          chedda,
          currentEnvironment,
          account,
          poolId: strPoolId,
          getData,
          asset,
          signer,
          decimals,
        })
      );
    },
    [
      dispatch,
      chedda,
      currentEnvironment,
      account,
      strPoolId,
      getData,
      signer,
      hookName,
      asset,
      decimals,
    ]
  );

  const isLoading = useSelector((state: RootState) =>
    selectCheddaSliceLoading(hookName)(state)
  );
  const data = useSelector((state: RootState) =>
    selectCheddaSliceData(hookName)(state)
  );

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  return {
    data: data,
    isLoading: isLoading,
    fetchData: fetchDataCallback,
  };
};
