import { Action, configureStore, isPlain, ThunkAction } from "@reduxjs/toolkit";

import { cheddaSlice } from "./api/cheddaSlice";

const isSerializable = (value: any) =>
  typeof value === "bigint" || isPlain(value);

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
