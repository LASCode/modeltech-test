import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {windowSizeReducer} from "./modules/windowSize";

export const index = configureStore({
  reducer: {
    windowSize: windowSizeReducer,
  },
});

export type AppDispatch = typeof index.dispatch;
export type AppState = ReturnType<typeof index.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
