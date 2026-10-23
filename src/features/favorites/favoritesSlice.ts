/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';

export interface FavoritesState {
  /** Productos marcados como favoritos, indexados por id de inserción. */
  items: Product[];
}

const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrate: (_state, action: PayloadAction<FavoritesState>) => action.payload,
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex((p) => p.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const { hydrate, toggleFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
