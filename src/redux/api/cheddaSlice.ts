import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Chedda } from "chedda-sdk";
import { RootState } from "@/redux/store";
import { IEnvironment } from "@/utils/types";

interface CheddaSliceState {
  fetchDataStates: Record<string, AsyncState<any>>;
}

interface AsyncState<T> {
  data?: T;
  isLoading: boolean;
}

interface FetchDataParams {
  hookName: string;
  pathname: string;
  showLoading?: boolean;
  chedda: Chedda | undefined | null;
  currentEnvironment: IEnvironment | undefined;
  account?: string;
  poolId: string;
  getData: any;
  signer: any;
  asset?: string;
  decimals?: number;
}

const initialState: CheddaSliceState = {
  fetchDataStates: {},
};

export const fetchData = createAsyncThunk<any, FetchDataParams>(
  "cheddaSlice/fetchData",
  async (params: FetchDataParams) => {
    try {
      const {
        hookName,
        pathname,
        showLoading,
        chedda,
        currentEnvironment,
        account,
        poolId,
        getData,
        signer,
        asset,
        decimals,
      } = params;

      if (!currentEnvironment || !chedda) return;

      const lens = chedda?.poolLens(
        currentEnvironment?.contracts.LendingPoolLens,
        signer
      );

      // const pool = chedda?.poolLens(poolId ? poolId : "", signer);
      const data = await getData({
        lens,
        poolId,
        account,
        chedda,
        signer,
        asset,
        decimals,
        environment: currentEnvironment,
      });
      return { showLoading, hookName, pathname, data };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

export const cheddaSlice = createSlice({
  name: "cheddaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        const hookName = action.meta.arg.hookName;
        const pathname = action.meta.arg.pathname;
        const existingData =
          state.fetchDataStates[`${hookName} + ${pathname}`]?.data;
        const showLoading =
          hookName === "getSelectTokenBalance"
            ? true
            : action.meta.arg.showLoading || !existingData;

        state.fetchDataStates[`${hookName} + ${pathname}`] = {
          data: existingData ?? undefined,
          isLoading: showLoading,
        };
      })
      .addCase(
        fetchData.fulfilled,
        (
          state,
          action: PayloadAction<{
            hookName: string;
            pathname: string;
            data: any;
          }>
        ) => {
          const { hookName, pathname, data } = action.payload || {};
          state.fetchDataStates[`${hookName} + ${pathname}`] = {
            data,
            isLoading: false,
          };
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        const hookName = action.meta.arg.hookName;
        const pathname = action.meta.arg.pathname;
        state.fetchDataStates[`${hookName} + ${pathname}`] = {
          data: undefined,
          isLoading: false,
        };
      });
  },
});

export const selectCheddaSliceData = (hookName: string) => (state: RootState) =>
  state.cheddaSlice.fetchDataStates[hookName]?.data;

export const selectCheddaSliceLoading =
  (hookName: string) => (state: RootState) =>
    state.cheddaSlice.fetchDataStates[hookName]?.isLoading ?? true;
