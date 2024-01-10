import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { cheddaSlice } from "./api/cheddaSlice";

export const store = configureStore({
  reducer: {
    cheddaSlice: cheddaSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
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
