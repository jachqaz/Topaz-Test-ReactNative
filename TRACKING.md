<!--
  Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
  All rights reserved.
-->

# TRACKING.md — Topaz ReactNative (Frontend)

**Director de orquesta:** jachqaz (`jach_1997@hotmail.com`) · **Agente:** Kiro (Auto), guiado por el director.
**Repo:** https://github.com/jachqaz/Topaz-Test-ReactNative.git · **Rama de trabajo:** `develop`
**Stack:** Expo SDK 58 · React Native 0.88 · React 19.3 · TypeScript estricto.

> Estados: `TODO` · `IN_PROGRESS` · `FINISH`. Política: **solo commits locales, nunca push** (lo hace el director).

## Contexto
App móvil mini-tienda que consume el backend Topaz (o DummyJSON directo): lista de productos,
detalle con carrusel, y favoritos persistidos localmente.

## Tareas

| # | Tarea | Estado |
|---|-------|--------|
| F0 | Scaffold en blanco Expo SDK 58 (blank-typescript) en `master` | FINISH |
| F1 | `.md` del agente (.kiro steering, tracking) en `develop` | FINISH |
| F2 | `npm install` del scaffold + verificar arranque (tsc/expo) | FINISH |
| F3 | Config base: NativeWind+Tailwind, Babel/Metro, tsconfig estricto, path aliases | FINISH |
| F4 | Dependencias: RTK+RTK Query, react-redux, MMKV, AsyncStorage, Axios, React Navigation, reanimated, safe-area, testing-library, jest | FINISH |
| F5 | StorageAdapter (MMKV + fallback) + mock Jest + inyección | FINISH |
| F6 | Store Redux + slices (favorites) + RTK Query products API | FINISH |
| F7 | Navegación (Bottom Tabs + Stack) + tema | FINISH |
| F8 | Pantalla Productos (FlatList, loading, error) | FINISH |
| F9 | Pantalla Detalle (carrusel imágenes, favorito reactivo) | FINISH |
| F10 | Pantalla Favoritos (persistida, tiempo real) | FINISH |
| F11 | Tests Jest + RNTL (adapter, slice, componentes) | FINISH |
| F12 | README (rol director de orquesta) | FINISH |
| F13 | CI/CD `.github/workflows/ci.yml`: lint+test+build; jobs Android (.apk) e iOS (.ipa/archive) | FINISH |
| F14 | Preprocesado commit (Prettier, ESLint, husky, audit) | IN_PROGRESS (headers de copyright aplicados; husky/eslint opcional) |
| F15 | Verificación final: lint → test → build | FINISH |
| C1 | **Conexión front→back**: base URL por plataforma (default backend, `localhost:8080/api`), override por `EXPO_PUBLIC_API_BASE_URL`, `.env.example` | FINISH |
| C2 | **Device físico**: `expo run:android/ios`, `adb reverse` (script `adb:reverse`), nitro-modules, Tailwind v3 | FINISH |
| C3 | **Rediseño UI/UX**: ProductCard moderno, header+búsqueda en Productos, Detalle con carrusel+indicadores, Favoritos con empty state+CTA | FINISH |
| C4 | **Navegación clara 3 pantallas**: tab bar moderno con iconos/labels, acceso directo a Favoritos y navegación anidada tab→stack | FINISH |
| C5 | **Dev overlay (LogBox)** oculto en la app; tema de navegación claro/oscuro | FINISH |

## Correcciones 2026-10-22 (sesión de integración)
- **Causa raíz conexión:** el front apuntaba por defecto a `https://dummyjson.com` (no al back) y usaba ruta `/products` sin el prefijo `/api`. Corregido: default = backend Topaz en `localhost:8080/api`, resuelto por plataforma, con override por env.
- **Puerto back:** `server.port=8080` fijo en `application.properties`.
- **adb reverse:** `tcp:8081` (Metro) + `tcp:8080` (backend) → script `npm run adb:reverse`, documentado en README.
- **Verificación end-to-end:** `axios → http://localhost:8080/api/products` devuelve 30 productos; `/products/1` devuelve detalle completo. Flujo dummyjson→back→front confirmado.
- **UI:** rediseño completo manteniendo NativeWind + FlatList + Reanimated. LogBox flotante ocultado (era el "card amarillo" de la imagen 4, overlay de desarrollo de Expo).

## Verificación (evidencia real 2026-10-22)
- `npx tsc --noEmit` → **exit 0** (TypeScript estricto limpio).
- `npx jest --ci` → **4 suites, 10 tests verdes**.
- `npx expo config` → newArchEnabled=true, bundle ids OK.
- Decisiones de compatibilidad: MMKV v4 Nitro (`createMMKV`, `remove`); tests de componente con `react-test-renderer` directo (el wrapper RNTL 14.1 falla en RN 0.88/React 19.3); RTK resuelto a CJS vía customExportConditions.

## Decisiones
- Expo SDK 58 estable (publicado 2026-10-15, RN 0.88). `create-expo-app@latest` lo resolvió automáticamente.
- MMKV por inyección en stores para testear con mock sin JSI.
- Axios con baseURL configurable (backend Topaz / DummyJSON).

## Problemas y soluciones
| # | Problema | Solución | Estado |
|---|----------|----------|--------|
| — | — | — | — |

## Dónde retomar
Tras F1 → F2 (`npm install`) y F3 (NativeWind + config).
