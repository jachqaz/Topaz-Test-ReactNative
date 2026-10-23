/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import type { Middleware } from '@reduxjs/toolkit';
import type { StorageAdapter } from '../../shared/storage/StorageAdapter';
import type { FavoritesState } from '../../features/favorites/favoritesSlice';

export const FAVORITES_KEY = 'topaz.favorites';

/**
 * Persiste el slice de favoritos en el StorageAdapter tras cada cambio.
 * El storage se INYECTA, lo que permite usar un doble en tests.
 */
export const createPersistFavoritesMiddleware =
  (storage: StorageAdapter): Middleware =>
  (store) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (typeof (action as { type?: string }).type === 'string'
      && (action as { type: string }).type.startsWith('favorites/')) {
      const state = (store.getState() as { favorites: FavoritesState }).favorites;
      storage.set(FAVORITES_KEY, JSON.stringify(state));
    }
    return result;
  };

/** Lee el estado de favoritos persistido (o null si no hay o está corrupto). */
export function loadPersistedFavorites(storage: StorageAdapter): FavoritesState | null {
  const raw = storage.getString(FAVORITES_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as FavoritesState;
  } catch {
    return null;
  }
}
