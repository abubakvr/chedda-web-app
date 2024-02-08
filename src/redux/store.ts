import { Action, configureStore, isPlain, ThunkAction } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { cheddaSlice } from "./api/cheddaSlice";

const isSerializable = (value: any) =>
  BigNumber.isBigNumber(value) || isPlain(value);

export const store = configureStore({
  reducer: {
    cheddaSlice: cheddaSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
