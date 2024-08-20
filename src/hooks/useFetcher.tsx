import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchData,
  selectCheddaSliceData,
  selectCheddaSliceError,
  selectCheddaSliceLoading,
} from "@/redux/api/cheddaSlice";
import { useCheddaSdk } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { useParams, usePathname } from "next/navigation";
import { GetDataFunction } from "@/utils/types";
import { currentEnvironment } from "@/data/environments";
import { useSigner, useToast } from "@/hooks";

export const useFetcher = <T = any,>(
  getData: GetDataFunction<T>,
  asset?: string,
  decimals?: number
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chedda } = useCheddaSdk();
  const pathname = usePathname();
  const { account } = useWeb3React();
  const { poolId } = useParams();
  const { signer } = useSigner();
  const { addToast } = useToast();

  const strPoolId = poolId?.toString();
  const hookName = getData.name;

  const fetchDataCallback = useCallback(
    (showLoading?: boolean) => {
      dispatch(
        fetchData({
          hookName,
          pathname,
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
      getData,
      chedda,
      account,
      strPoolId,
      signer,
      hookName,
      pathname,
      asset,
      decimals,
    ]
  );

  const isLoading = useSelector((state: RootState) =>
    selectCheddaSliceLoading(`${hookName} + ${pathname}`)(state)
  );

  const isError = useSelector((state: RootState) =>
    selectCheddaSliceError(`${hookName} + ${pathname}`)(state)
  );

  const data = useSelector((state: RootState) =>
    selectCheddaSliceData(`${hookName} + ${pathname}`)(state)
  );

  const fetchHookData = (showLoading: boolean = false) =>
    fetchDataCallback(showLoading);

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  useEffect(() => {
    if (isError) {
      addToast({
        message: "An error occured,",
        type: "fetchError",
      });
    }
  }, [isError, addToast]);

  return {
    data,
    isLoading,
    isError,
    fetchData: fetchHookData,
  };
};
