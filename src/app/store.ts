import {configureStore, ThunkAction, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {persistReducer, PERSIST} from "redux-persist";
import searcherSlice from "../features/searcher/searcherSlice";

const persistConfig = {
  key: 'searcher',
  storage,
}

const persistedReducer = persistReducer(persistConfig, searcherSlice)

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
  reducer: {
    searcher: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch

export default store
