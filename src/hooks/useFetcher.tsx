import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useRef } from "react";
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
  const errorCountRef = useRef<number>(0);

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

  // Fetch data only once when on the markets route.
  // Data updates on the pool page are managed manually.
  const shouldFetchData =
    hookName === "getSelectTokenBalance" ||
    hookName === "getAccountCollateral" ||
    hookName === "getAllowance" ||
    !pathname.startsWith("/markets") ||
    data === undefined ||
    data === null;

  useEffect(() => {
    if (shouldFetchData) {
      fetchDataCallback();
    }
  }, [fetchDataCallback, shouldFetchData]);

  useEffect(() => {
    // Check if an error occurs
    // Refetch data on the first error occurrence
    // Display an error message if the second fetch attempt fails
    if (isError) {
      if (errorCountRef.current === 0) {
        fetchDataCallback();
        errorCountRef.current += 1; // Increment error count after first fetch
        console.log(errorCountRef.current);
      } else if (errorCountRef.current === 1) {
        addToast({
          message: "An error occurred.",
          type: "fetchError",
        });
        errorCountRef.current += 1; // Increment error count to prevent further toasts
      }
    }
  }, [isError, addToast, fetchDataCallback]);

  return {
    data,
    isLoading,
    isError,
    fetchData: fetchHookData,
  };
};
