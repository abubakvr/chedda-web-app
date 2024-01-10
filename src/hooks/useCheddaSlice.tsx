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
import { GetDataFunction } from "@/redux/api/actions";

export const useCheddaSlice = <T = any,>(
  poolId: string,
  getData: GetDataFunction<T>
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();
  const hookName = getData.name;

  const fetchDataCallback = useCallback(() => {
    dispatch(
      fetchData({
        hookName,
        chedda,
        currentEnvironment,
        account,
        poolId,
        getData,
        signer,
      })
    );
  }, [
    dispatch,
    chedda,
    currentEnvironment,
    account,
    poolId,
    getData,
    signer,
    hookName,
  ]);

  const isLoading = useSelector((state: RootState) =>
    selectCheddaSliceLoading(hookName)(state)
  );
  const data = useSelector((state: RootState) =>
    selectCheddaSliceData(hookName)(state)
  );

  useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback, getData]); // Include getData in the dependency array

  return {
    data: data,
    isLoading: isLoading,
    fetchData: fetchDataCallback,
  };
};
