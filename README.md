<!--
  Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
  All rights reserved.
-->

# Topaz — App Móvil (React Native · Expo)

Mini-tienda de productos construida con React Native (Expo). Consume el backend
**Topaz Products API** (o DummyJSON directamente) y permite explorar productos,
ver su detalle y guardar favoritos localmente.

## Roles del proyecto

- **Director de orquesta:** Johan A. Hernández (`jachqaz`) — define objetivos, decisiones técnicas y prioridades.
- **Agente de desarrollo:** Kiro (modelo Auto) — ejecuta guiado por el director, con evidencia y trazabilidad.

## Stack y decisiones

| Aspecto | Elección |
|---------|----------|
| Entorno | Expo SDK 58 · Prebuild/CNG + Expo Modules + Development Builds (sin Expo Go) |
| Lenguaje | TypeScript estricto |
| Estado | Redux Toolkit + RTK Query |
| Persistencia | MMKV con `StorageAdapter` (interfaz única) + fallback InMemory + mock Jest |
| Estilos | NativeWind (Tailwind) con dark mode |
| Networking | Axios (baseURL configurable) |
| Navegación | React Navigation (Bottom Tabs + Stack) |
| Animación | Reanimated (micro-interacción en favorito) |
| Testing | Jest + react-test-renderer |

## Pantallas

1. **Productos** — `FlatList` optimizada (keyExtractor, ItemSeparatorComponent), estados de carga y error.
2. **Detalle** — carrusel de imágenes (`FlatList` horizontal `pagingEnabled`), rating, botón de favorito reactivo.
3. **Favoritos** — lista persistida localmente, se actualiza en tiempo real.

## Arquitectura

```
src/
├─ app/
│  ├─ navigation/   # RootNavigator (Tabs + Stack), tipos
│  └─ store/        # store Redux, hooks, persistencia de favoritos (inyectable)
├─ features/
│  ├─ products/     # productsApi (RTK Query), pantallas Lista y Detalle
│  └─ favorites/    # slice, selectores, botón y pantalla
├─ shared/
│  ├─ api/          # instancia Axios + baseQuery de RTK Query
│  ├─ config/       # env (API_BASE_URL)
│  ├─ storage/      # StorageAdapter, InMemoryStorage, createStorage (MMKV + fallback)
│  └─ ui/           # Loader, ErrorView, ProductCard
└─ types/           # Product
```

El `StorageAdapter` se **inyecta** en el store, lo que permite sustituir MMKV por
un doble en memoria en los tests (sin JSI nativo).

## Prerrequisitos

- Node 24 (`vfox use node@24`)
- Para builds nativos: Android Studio / Xcode (Expo Prebuild)

## Ejecución

```bash
npm install
npx expo prebuild        # genera android/ e ios/ (CNG)
npx expo run:android     # Development Build en Android
npx expo run:ios         # Development Build en iOS (requiere macOS)
```

### Apuntar al backend Topaz

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api npx expo start
```

Sin esa variable, la app consume DummyJSON directamente (`https://dummyjson.com`).

## Testing

```bash
npm test                 # suite completa
npm run test:ci          # con cobertura
npm run typecheck        # TypeScript estricto
```

## CI/CD

`.github/workflows/ci.yml` en cada `push`/`pull_request` a `develop`/`master`:

- **quality_gate:** typecheck + tests con cobertura.
- **build_android:** Expo Prebuild + Gradle → artefacto `.apk`.
- **build_ios:** Expo Prebuild + xcodebuild → `.xcarchive` (base del `.ipa`).

## Notas técnicas

- Expo SDK 58 corre New Architecture siempre; MMKV v4 (Nitro) usa `createMMKV`.
- Los tests de componente usan `react-test-renderer` directo por compatibilidad con RN 0.88 / React 19.3.

## Estado

Ver `TRACKING.md` para el detalle por fases.

---
_Desarrollado con asistencia de Kiro AI (modelo Auto) bajo la dirección de jachqaz._
