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
