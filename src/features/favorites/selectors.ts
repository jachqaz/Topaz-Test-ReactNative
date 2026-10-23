/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import type { RootState } from '../../app/store/store';

export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.items.some((p) => p.id === id);
