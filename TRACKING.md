<!--
  Copyright (c) 2026 Johan Castano (jachqaz). Topaz ReactNative.
  All rights reserved.
-->

# TRACKING.md — Topaz ReactNative (Frontend)

**Director de orquesta:** Johan Castano (jachqaz) (`jach_1997@hotmail.com`) · **Agente:** Kiro (Auto), guiado por el director.
**Repo:** https://github.com/jachqaz/Topaz-Test-ReactNative.git · **Rama de trabajo:** `develop`
**Stack:** Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript estricto.

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
| C6 | **UI plana — causa raíz: CACHÉ DE METRO del transformer de NativeWind** (no incompatibilidad). `expo run:android` recompila lo nativo pero reutiliza el caché de Metro, así que el transform viejo (de cuando había Tailwind v4) seguía activo. **Se mantiene NativeWind (Tailwind)** según directriz del director. Fix: arrancar Metro con `--clear`. | FINISH |
| C7 | **UI plana — caché del transformer de estilos de NativeWind** (`react-native-css-interop/.cache`). Config del repo estándar; se resuelve con `npm run nw:clean` + `npm run start:clean`. (Una particularidad local del equipo del autor la disparaba, no afecta a quien clone.) | FINISH |
| C8 | **Correcciones UI (feedback director):** espaciado de lista, Bottom Navigation respeta safe-area inferior, botón favorito reacciona (color por `style`, no `className` dinámico en `Animated.View`). | FINISH |
| C9 | **Limpieza + docs:** retirados logs de diagnóstico temporales; `metro.config`/scripts en forma estándar; READMEs con clonado desde cero; conexión front→back verificada. | FINISH |

## Diagnóstico UI 2026-10-22 (por qué los rediseños previos no se veían)
- **Síntoma:** tras `expo run:android` (BUILD SUCCESSFUL, bundle nuevo), la UI seguía mostrando texto plano sin tarjetas/sombras/espaciado, pese a que los `className` estaban en el código.
- **Config verificada OK (no-negociables de NativeWind v4):** Tailwind v3 + `nativewind/preset`; `global.css` con directivas importado en `App.tsx`; `babel` con `jsxImportSource: nativewind` + `nativewind/babel`; `metro` con `withNativeWind({ input: './global.css' })`; `nativewind-env.d.ts` presente. Tailwind CLI compila las utilidades (18.9 KB).
- **Causa raíz REAL:** **caché del transformer de Metro.** `npx expo run:android` recompila el binario nativo, pero Metro reutiliza su caché de transform salvo que se arranque con `--clear`. Tras cambiar `tailwindcss` v4→v3, Metro siguió sirviendo el bundle transformado con la config vieja, por eso los `className` no aplicaban. NO era incompatibilidad de NativeWind.
- **Solución (correcta, según directriz):** se MANTIENE NativeWind (Tailwind) como capa de estilos. Un intento intermedio de migrar a StyleSheet se revirtió porque contradecía la decisión del director. El fix operativo es arrancar Metro limpio: `npx expo start --clear` (o `npm run android` con Metro ya limpio).
- **Verificación:** `tsc --noEmit` exit 0; `jest` 4 suites / 10 tests verdes. Validación visual en device tras `--clear` (pendiente de confirmación del director).

### Diagnóstico UI 2026-10-23 — NativeWind no aplicaba `className`
- Tras el downgrade a SDK 57 la UI seguía plana. Instrumentando el pipeline capa por capa
  (Tailwind CLI, Babel, runtime css-interop, transform de Metro) se descartó versión, config y
  el código de la app: Tailwind compilaba el CSS correctamente y el JSX se transformaba con el
  runtime de NativeWind. El punto de corte era la **caché del transformer de estilos**
  (`react-native-css-interop/.cache`), que en el entorno de desarrollo del autor quedaba vacía.
- **Nota de entorno (solo del equipo del autor):** la causa resultó ser una particularidad LOCAL
  del equipo de desarrollo (una carpeta de trabajo accedida por dos rutas distintas), que partía la
  caché del transformer. **No es un problema del proyecto ni afecta a quien lo clone en un equipo
  normal.** Por eso la configuración del repo es la estándar de NativeWind, sin anclajes ni rutas
  especiales.
- **Resultado:** `metro.config.js` es el estándar oficial (`withNativeWind(getDefaultConfig(__dirname),
  { input: './global.css' })`). Si alguna vez la caché del transformer quedara obsoleta tras cambiar
  config de Tailwind/Babel/Metro, se limpia con `npm run nw:clean` + `npm run start:clean` — práctica
  de mantenimiento normal en cualquier proyecto NativeWind.
- UI NativeWind confirmada visualmente por el director (tarjetas, header con búsqueda, tab bar,
  carrusel y badges del detalle).

### Correcciones UI 2026-10-23 (feedback del director)
- **Espaciado lista (30 productos):** `FlatList` con `contentContainerStyle={{ padding:16, paddingBottom:32 }}`
  + separador `h-3` (se dejó de depender de `contentContainerClassName`, que no siempre aplica).
- **Bottom Navigation cortado:** el tab bar ahora suma `useSafeAreaInsets().bottom` a su altura y padding
  (barra de gestos de Android).
- **Añadir a favoritos no reaccionaba:** el color del botón iba por `className` dinámico dentro de un
  `Animated.View` de Reanimated, que no lo re-aplicaba; se movió a `style` nativo
  (`backgroundColor` condicional). La lógica Redux (toggle, selector, MMKV) ya era correcta.

### Limpieza y documentación 2026-10-23
- Retirados los logs de diagnóstico temporales: interceptores `[NET-LOG]` de Axios en `shared/api/http.ts`
  (front) y `logging.level...DispatcherServlet=DEBUG` + `spring.mvc.log-request-details` en
  `application.properties` (back). No se tocó logging funcional del producto.
- `metro.config.js` y los scripts se dejaron en su forma ESTÁNDAR (sin anclajes a rutas ni mitigaciones
  específicas del equipo del autor), para que el proyecto se vea y se comporte como uno normal en
  cualquier máquina.
- README de ambos proyectos con **clonado desde cero** (prerrequisitos, pasos exactos, `adb reverse`,
  cómo levantar el back en 8080).
- Diagnóstico de conexión front→back: la cadena NUNCA estuvo rota (back vivo en 8080, `adb reverse`
  activo, base URL = `localhost:8080/api`, sin mocks que enmascaren). El "no veo consultas" era falta de
  observabilidad, no de conectividad; confirmado dummyjson→back→front.

### Documentación 2026-10-23 — nombre del director
- Reemplazo en la documentación: `Johan A. Hernández (jachqaz)` → `Johan Castano (jachqaz)`;
  menciones de `jachqaz` como autoría → `Johan Castano (jachqaz)`. **No** se tocaron las URLs de
  GitHub (`github.com/jachqaz/...`) ni la config `user.name = jachqaz` (identidad real de git).
  Archivos del repo: `README.md` (3), `TRACKING.md` (2), `.kiro/steering/project-rules.md` (1).
- **Rutina adoptada:** tras cada cambio → commit firmado (`-s`, sin push) con preproceso +
  actualización de este `.md` de seguimiento.

### READMEs, CI y preproceso 2026-10-23
- **READMEs** de ambos proyectos: nueva sección "Modelo de trabajo: orquestación humano + agente"
  que explica el valor del perfil del director (arquitectura, decisiones, calidad, validación por
  evidencia) frente al agente ejecutor. Instrucciones de instalación/ejecución iOS/Android con versiones.
- **CI/CD revisado:**
  - Back `ci.yml`: correcto, **se deja como está** (refleja el build real `mvnw clean verify -B`,
    Java 21 Temurin, gate JaCoCo ≥80%, sube `.jar` + jacoco + surefire).
  - Front `ci.yml`: estructuralmente correcto (quality_gate + build_android `.apk` + build_ios archive
    vía Expo Prebuild). Único ajuste: `NODE_VERSION` 24 → **20 LTS** para alinear con el README y usar
    una versión estable en CI. `npm ci` validado contra el lock (clonado limpio no falla).
- **Preproceso de commit:** copyright headers ya presentes en todos los archivos; `npm audit` ejecutado.
  Las 59 vulnerabilidades (57 high + 2 moderate) son transitivas del **toolchain de build/test**
  (`braces`←jest, `node-forge`←expo, `postcss-selector-parser`←tailwind); sus "fix" exigen breaking
  changes que romperían el stack (jest 30 / expo 44 / tailwind 4) y NO afectan al bundle de producción.
  Decisión: **no aplicar `audit fix --force`**; se aceptan por ser dev-only sin fix no disruptivo.
  Prettier/ESLint (front) y Spotless (back) siguen como F14/B11 pendientes (no instalados aún).
- Verificación pre-commit: front `tsc` 0 + Jest 4/10 verde; back `mvnw verify` BUILD SUCCESS 13 tests.

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
