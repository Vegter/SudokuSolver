import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sudokuReducer from './SudokuSlice';

export const store = configureStore({
  reducer: {
    counter: sudokuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
