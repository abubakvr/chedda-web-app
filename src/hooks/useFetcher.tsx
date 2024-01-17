import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useMemo } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchData,
  selectCheddaSliceData,
  selectCheddaSliceLoading,
} from "@/redux/api/cheddaSlice";
import { useEnvironment, useCheddaSdk } from "@/hooks";
import { useWeb3React } from "@web3-react/core";
import { GetDataFunction } from "@/redux/api/actions";
import { useParams } from "next/navigation";

export const useFetcher = <T = any,>(
  getData: GetDataFunction<T>,
  asset?: string
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentEnvironment } = useEnvironment();
  const { chedda, signer } = useCheddaSdk();
  const { account } = useWeb3React();
  const { poolId } = useParams();

  const strPoolId = poolId?.toString();
  const hookName = getData.name;

  const fetchDataCallback = useCallback(() => {
    dispatch(
      fetchData({
        hookName,
        chedda,
        currentEnvironment,
        account,
        poolId: strPoolId,
        getData,
        asset,
        signer,
      })
    );
  }, [
    dispatch,
    chedda,
    currentEnvironment,
    account,
    strPoolId,
    getData,
    signer,
    hookName,
    asset,
  ]);

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
