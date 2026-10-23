/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { makeStore } from '../../../src/app/store/store';
import { InMemoryStorage } from '../../../src/shared/storage/InMemoryStorage';
import { FAVORITES_KEY, loadPersistedFavorites } from '../../../src/app/store/persistFavorites';
import { toggleFavorite } from '../../../src/features/favorites/favoritesSlice';
import type { Product } from '../../../src/types/product';

const product: Product = {
  id: 7,
  title: 'Chanel',
  description: 'desc',
  category: 'fragrances',
  price: 129.99,
  discountPercentage: 16,
  rating: 4.26,
  stock: 58,
  brand: 'Chanel',
  thumbnail: 't.webp',
  images: ['1.webp'],
};

describe('persistencia de favoritos', () => {
  it('persiste en el storage inyectado al togglear y se puede rehidratar', () => {
    const storage = new InMemoryStorage();
    const store = makeStore(storage);

    store.dispatch(toggleFavorite(product));

    const persisted = loadPersistedFavorites(storage);
    expect(persisted?.items).toHaveLength(1);
    expect(persisted?.items[0]?.id).toBe(7);

    // Un nuevo store con el mismo storage debe rehidratar el favorito.
    const store2 = makeStore(storage);
    expect(store2.getState().favorites.items).toHaveLength(1);
  });

  it('loadPersistedFavorites devuelve null con datos corruptos', () => {
    const storage = new InMemoryStorage();
    storage.set(FAVORITES_KEY, '{no-json');
    expect(loadPersistedFavorites(storage)).toBeNull();
  });
});
