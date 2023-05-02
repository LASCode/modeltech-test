import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {windowSizeReducer} from "./modules/windowSize";
import {oilfieldsReducer} from "./modules/oilfields/oilfields.reducer";

export const store = configureStore({
  reducer: {
    windowSize: windowSizeReducer,
    oilfields: oilfieldsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export type AsyncThunkConfig = {
  state: AppState;
  dispatch: AppDispatch;
};
