/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import type { StorageAdapter } from './StorageAdapter';

/**
 * Implementación en memoria del {@link StorageAdapter}.
 * Sirve como fallback cuando MMKV (JSI nativo) no está disponible
 * (p. ej. en Node/Jest o en un entorno sandbox).
 */
export class InMemoryStorage implements StorageAdapter {
  private readonly store = new Map<string, string>();

  getString(key: string): string | undefined {
    return this.store.get(key);
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }

  delete(key: string): void {
    this.store.delete(key);
  }
}
