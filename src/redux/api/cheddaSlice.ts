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
      return { showLoading, hookName, data };
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
        const showLoading = action.meta.arg.showLoading ?? true;
        const existingData = state.fetchDataStates[hookName]?.data;

        state.fetchDataStates[hookName] = {
          data: existingData ?? undefined,
          isLoading: showLoading ? true : false,
        };
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<{ hookName: string; data: any }>) => {
          const { hookName, data } = action.payload || {};
          state.fetchDataStates[hookName] = {
            data,
            isLoading: false,
          };
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        const hookName = action.meta.arg.hookName;
        state.fetchDataStates[hookName] = {
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
