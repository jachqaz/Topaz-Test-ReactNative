/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import reducer, {
  hydrate,
  removeFavorite,
  toggleFavorite,
  type FavoritesState,
} from '../../../src/features/favorites/favoritesSlice';
import type { Product } from '../../../src/types/product';

const product: Product = {
  id: 1,
  title: 'Mascara',
  description: 'desc',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 10,
  brand: 'Essence',
  thumbnail: 't.webp',
  images: ['1.webp'],
};

const empty: FavoritesState = { items: [] };

describe('favoritesSlice', () => {
  it('añade un favorito con toggle', () => {
    const state = reducer(empty, toggleFavorite(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.id).toBe(1);
  });

  it('quita el favorito si se vuelve a togglear', () => {
    const added = reducer(empty, toggleFavorite(product));
    const removed = reducer(added, toggleFavorite(product));
    expect(removed.items).toHaveLength(0);
  });

  it('removeFavorite elimina por id', () => {
    const added = reducer(empty, toggleFavorite(product));
    const removed = reducer(added, removeFavorite(1));
    expect(removed.items).toHaveLength(0);
  });

  it('hydrate reemplaza el estado', () => {
    const state = reducer(empty, hydrate({ items: [product] }));
    expect(state.items).toHaveLength(1);
  });
});
