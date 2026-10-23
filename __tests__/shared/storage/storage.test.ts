/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { InMemoryStorage } from '../../../src/shared/storage/InMemoryStorage';
import { createStorage } from '../../../src/shared/storage/createStorage';

describe('InMemoryStorage', () => {
  it('guarda, lee y elimina valores', () => {
    const storage = new InMemoryStorage();
    expect(storage.getString('k')).toBeUndefined();

    storage.set('k', 'v');
    expect(storage.getString('k')).toBe('v');

    storage.delete('k');
    expect(storage.getString('k')).toBeUndefined();
  });
});

describe('createStorage', () => {
  it('devuelve un adapter funcional (MMKV mockeado en Jest)', () => {
    const storage = createStorage();
    storage.set('token', 'abc');
    expect(storage.getString('token')).toBe('abc');
    storage.delete('token');
    expect(storage.getString('token')).toBeUndefined();
  });
});
