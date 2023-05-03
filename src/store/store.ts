import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';
import { persistStore, persistReducer, PersistConfig, PersistState } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig: PersistConfig<Omit<AppState, '_persist'>> = {
  key: 'root',
  storage: AsyncStorage,
  version: 2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppState = ReturnType<typeof rootReducer> & { _persist: PersistState };
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export default store;
