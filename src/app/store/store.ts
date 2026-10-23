/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../features/products/productsApi';
import favoritesReducer, { hydrate } from '../../features/favorites/favoritesSlice';
import type { StorageAdapter } from '../../shared/storage/StorageAdapter';
import { storage as defaultStorage } from '../../shared/storage/createStorage';
import { createPersistFavoritesMiddleware, loadPersistedFavorites } from './persistFavorites';

/**
 * Construye el store. El storage se INYECTA (por defecto MMKV/fallback),
 * de modo que los tests pueden pasar un InMemoryStorage limpio.
 */
export function makeStore(storage: StorageAdapter = defaultStorage) {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(productsApi.middleware, createPersistFavoritesMiddleware(storage)),
  });

  // Hidratación inicial desde almacenamiento local.
  const persisted = loadPersistedFavorites(storage);
  if (persisted) {
    store.dispatch(hydrate(persisted));
  }

  return store;
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
