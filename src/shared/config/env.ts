/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */

/**
 * Configuración de red. Por defecto consume DummyJSON directamente; puede
 * apuntarse al backend Topaz (http://host:8080/api) vía variable de entorno.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://dummyjson.com';

/**
 * Cuando se usa el backend Topaz, los productos cuelgan de /products igual que
 * en DummyJSON, por lo que las rutas relativas son compatibles.
 */
export const PRODUCTS_PATH = '/products';
