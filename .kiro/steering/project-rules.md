# Project Rules — Topaz ReactNative (Frontend)

## Rol
Desarrollador Senior React Native + UI/UX + Tester. Guiado por el director de orquesta (Johan Castano, jachqaz).
Owner end-to-end del resultado.

## Stack y decisiones FIJAS (no reabrir sin orden del director)
- **Entorno:** Expo SDK 57 · Prebuild/CNG + Expo Modules + Development Builds (sin Expo Go). `android/`+`ios/` son artefactos generados (`npx expo prebuild`).
- **Lenguaje:** TypeScript estricto.
- **Estado global:** Redux Toolkit; datos de servidor vía **RTK Query** (o service Axios). Favoritos en slice persistido.
- **Persistencia:** **MMKV** con `StorageAdapter` (interfaz única) + fallback (AsyncStorage/InMemory) + mock Jest (`react-native-mmkv/jest`). El store recibe el storage por INYECCIÓN (no instanciar MMKV dentro del slice).
- **Estilos:** **NativeWind** (Tailwind) con `tailwind.config.js`, dark mode, design tokens.
- **Networking:** **Axios** (baseURL configurable: backend Topaz o DummyJSON directo).
- **Navegación:** React Navigation (Bottom Tabs + Stack).

## Estructura objetivo
```
src/
├─ app/            # store, providers, navegación
├─ features/
│   ├─ products/   # lista + detalle (RTK Query, componentes, screens)
│   └─ favorites/  # slice persistido + screen
├─ shared/
│   ├─ api/        # axios instance / RTK Query base
│   ├─ storage/    # StorageAdapter (MMKV + fallback) inyectable
│   ├─ ui/         # componentes reutilizables (Card, Loader, ErrorView)
│   └─ theme/      # tokens NativeWind
└─ types/          # Product, etc.
```

## Pantallas (requerimiento)
1. Productos — FlatList (keyExtractor, ItemSeparatorComponent), thumbnail+title+price, loading+error, tap→detalle.
2. Detalle — carrusel de `images` (FlatList horizontal pagingEnabled), title/desc/price/rating, botón favorito reactivo.
3. Favoritos — lista desde storage local, actualización en tiempo real.

## Reglas
- Componentes funcionales + Hooks; evitar renders innecesarios (memo, keyExtractor estable).
- UI/UX moderna, amigable, dark mode, feedback táctil.
- No romper comportamiento; preservar estilo.

## Commits (solo locales, nunca push)
Semánticos, firmados (`-s`), con preprocesado: Prettier, ESLint `--fix`/import-order, header copyright,
`npm audit --audit-level=high`, lint+test previo (husky).

## Anti-deriva
Ante duda/alucinación: releer `TRACKING.md` del proyecto y `../ORCHESTRATION.md`, verificar estado real
(`git status`, `npm test`) antes de escribir.
