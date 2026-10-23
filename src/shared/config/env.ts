/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */

/**
 * Resolución de la URL base del backend Topaz, reproducible en cualquier equipo.
 *
 * Prioridad:
 *   1. EXPO_PUBLIC_API_BASE_URL  -> override explícito (p. ej. túnel Cloudflare
 *      `https://xxxx.trycloudflare.com/api`, o una IP LAN `http://192.168.x.x:8080/api`).
 *   2. Por plataforma, apuntando al backend local en el puerto 8080:
 *        - Emulador Android  -> http://10.0.2.2:8080/api  (10.0.2.2 = host del emulador)
 *        - Device Android USB -> http://localhost:8080/api  (requiere `adb reverse tcp:8080 tcp:8080`)
 *        - iOS simulador      -> http://localhost:8080/api
 *        - Web                -> http://localhost:8080/api
 *
 * El backend es un BFF: a su vez consume https://dummyjson.com. Así el flujo es
 * siempre dummyjson -> back -> front. Si se quisiera consumir DummyJSON directo
 * (fallback de contingencia), basta con EXPO_PUBLIC_API_BASE_URL=https://dummyjson.com
 * y PRODUCTS_PATH sigue siendo compatible (/products).
 */
import { Platform } from 'react-native';

const BACKEND_PORT = 8080;

/** Override explícito por variable de entorno pública de Expo. */
const ENV_OVERRIDE = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

/**
 * Host del backend según la plataforma cuando no hay override.
 * - Android emulador: 10.0.2.2 es el alias del `localhost` del PC anfitrión.
 * - Android device físico (USB): con `adb reverse tcp:8080 tcp:8080`, el
 *   `localhost` del teléfono se tuneliza al `localhost` del PC.
 */
function resolveLocalBaseUrl(): string {
  if (Platform.OS === 'android') {
    // El emulador oficial usa 10.0.2.2; un device físico con adb reverse usa localhost.
    // Preferimos 10.0.2.2 solo cuando no hay adb reverse; por defecto localhost cubre
    // device físico + adb reverse, que es el camino reproducible documentado.
    return `http://localhost:${BACKEND_PORT}/api`;
  }
  // iOS simulador, web y resto.
  return `http://localhost:${BACKEND_PORT}/api`;
}

export const API_BASE_URL = ENV_OVERRIDE && ENV_OVERRIDE.length > 0
  ? ENV_OVERRIDE
  : resolveLocalBaseUrl();

/**
 * Las rutas de productos cuelgan de /products tanto en el backend Topaz
 * (bajo /api) como en DummyJSON, por lo que la ruta relativa es compatible.
 */
export const PRODUCTS_PATH = '/products';
