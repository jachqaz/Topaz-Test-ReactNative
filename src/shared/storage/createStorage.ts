/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import type { StorageAdapter } from './StorageAdapter';
import { InMemoryStorage } from './InMemoryStorage';

/**
 * Crea el StorageAdapter de producción: intenta MMKV (síncrono, JSI) y,
 * si el runtime nativo no está disponible, cae a almacenamiento en memoria.
 * El resultado se INYECTA en los stores para poder sustituirlo en tests.
 */
export function createStorage(): StorageAdapter {
  try {
    // Import diferido: evita fallar al cargar el módulo donde no hay JSI.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createMMKV } = require('react-native-mmkv') as typeof import('react-native-mmkv');
    const mmkv = createMMKV({ id: 'topaz-storage' });
    return {
      getString: (key) => mmkv.getString(key),
      set: (key, value) => mmkv.set(key, value),
      delete: (key) => mmkv.remove(key),
    };
  } catch {
    return new InMemoryStorage();
  }
}

/** Instancia por defecto usada por la app. */
export const storage: StorageAdapter = createStorage();
