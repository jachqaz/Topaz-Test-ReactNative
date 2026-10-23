/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */

/**
 * Contrato único de almacenamiento síncrono clave-valor.
 * Permite inyectar distintas implementaciones (MMKV nativo, memoria en tests)
 * sin acoplar los stores a una tecnología concreta.
 */
export interface StorageAdapter {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
  delete(key: string): void;
}
