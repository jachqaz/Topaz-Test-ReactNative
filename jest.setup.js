/*
 * Copyright (c) 2026 Johan Castano (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
/* eslint-disable @typescript-eslint/no-require-imports */

// MMKV v4 (Nitro) no incluye mock de Jest: simulamos createMMKV con un Map
// en memoria, replicando la API síncrona usada por la app.
jest.mock('react-native-mmkv', () => {
  const makeInstance = () => {
    const map = new Map();
    return {
      getString: (key) => map.get(key),
      set: (key, value) => map.set(key, String(value)),
      remove: (key) => map.delete(key),
      clearAll: () => map.clear(),
    };
  };
  return {
    createMMKV: jest.fn(makeInstance),
  };
});
