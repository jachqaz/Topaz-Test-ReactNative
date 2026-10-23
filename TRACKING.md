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
| F1 | `.md` del agente (.kiro steering, tracking) en `develop` | IN_PROGRESS |
| F2 | `npm install` del scaffold + verificar arranque (tsc/expo) | TODO |
| F3 | Config base: NativeWind+Tailwind, Babel/Metro, tsconfig estricto, path aliases | TODO |
| F4 | Dependencias: RTK+RTK Query, react-redux, MMKV, AsyncStorage, Axios, React Navigation, reanimated, safe-area, testing-library, jest | TODO |
| F5 | StorageAdapter (MMKV + fallback) + mock Jest + inyección | TODO |
| F6 | Store Redux + slices (favorites) + RTK Query products API | TODO |
| F7 | Navegación (Bottom Tabs + Stack) + tema | TODO |
| F8 | Pantalla Productos (FlatList, loading, error) | TODO |
| F9 | Pantalla Detalle (carrusel imágenes, favorito reactivo) | TODO |
| F10 | Pantalla Favoritos (persistida, tiempo real) | TODO |
| F11 | Tests Jest + RNTL (adapter, slice, componentes) | TODO |
| F12 | README (rol director de orquesta) | TODO |
| F13 | CI/CD `.github/workflows/ci.yml`: lint+test+build; jobs Android (.apk) e iOS (.ipa/archive) | TODO |
| F14 | Preprocesado commit (Prettier, ESLint, husky, audit) | TODO |
| F15 | Verificación final: lint → test → build | TODO |

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
