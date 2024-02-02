import { combineReducers } from "@reduxjs/toolkit";
import { cheddaSlice } from "./api/cheddaSlice";

const rootReducer = combineReducers({
  cheddaSlice: cheddaSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
