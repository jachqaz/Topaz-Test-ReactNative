<!--
  Copyright (c) 2026 Johan Castano (jachqaz). Topaz ReactNative.
  All rights reserved.
-->

# Topaz — App Móvil (React Native · Expo)

Mini-tienda de productos construida con React Native (Expo). Consume el backend
**Topaz Products API** (o DummyJSON directamente) y permite explorar productos,
ver su detalle y guardar favoritos localmente.

## Modelo de trabajo: orquestación humano + agente

Este proyecto no se construyó "tirando prompts". Se desarrolló bajo un modelo de
**orquestación dirigida**, donde un profesional define la ingeniería y un agente de
IA la ejecuta con evidencia y trazabilidad:

- **Director de orquesta — Johan Castano (`jachqaz`).** Dueño de la arquitectura
  y las decisiones técnicas: fija el stack (Expo Prebuild/CNG, Redux Toolkit + RTK Query,
  MMKV con `StorageAdapter`, NativeWind, React Navigation), los límites de calidad
  (TypeScript estricto, tests, cobertura, CI), la política de commits (firmados, con
  preprocesado, sin push automático) y valida cada entrega contra evidencia real. Dirige
  el diagnóstico de los problemas difíciles exigiendo causa raíz, no parches.
- **Agente ejecutor — Kiro (modelo Auto).** Traduce la intención del director en trabajo
  accionable: implementa, instrumenta, mide y verifica (typecheck, tests, builds, logs),
  y reporta con datos. Trabaja guiado, dentro de las decisiones y restricciones del director.

El valor está en la **dirección especializada**: saber qué pedir, cómo acotar el problema,
qué evidencia exigir y cuándo rechazar una solución. El agente acelera la ejecución; el
criterio de ingeniería y la responsabilidad del resultado son del director. La trazabilidad
de cada decisión (qué, por qué y con qué evidencia) vive en `TRACKING.md`.

## Stack y decisiones

| Aspecto | Elección |
|---------|----------|
| Entorno | Expo SDK 57 · Prebuild/CNG + Expo Modules + Development Builds (sin Expo Go) |
| Lenguaje | TypeScript estricto |
| Estado | Redux Toolkit + RTK Query |
| Persistencia | MMKV con `StorageAdapter` (interfaz única) + fallback InMemory + mock Jest |
| Estilos | NativeWind (Tailwind) con dark mode |
| Networking | Axios (base URL por plataforma, default = backend Topaz) |
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

- **Node 22 o superior** (CI usa Node 22 LTS; probado con Node 24). Algunas dependencias de testing requieren Node ≥ 22.13.
- **JDK 21** (Temurin/Zulu) y `JAVA_HOME` apuntando a él.
- **Android Studio** con el Android SDK (Platform 36 / build-tools 36) y un emulador, o un **device físico** con *Depuración USB* activada.
- `adb` en el `PATH` (viene con el Android SDK, en `platform-tools`).
- **NO uses Expo Go**: la app usa MMKV (JSI) y New Architecture, así que requiere un **Development Build** compilado localmente.

## Clonado y ejecución desde cero

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/jachqaz/Topaz-Test-ReactNative.git
   cd Topaz-Test-ReactNative
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Levanta el backend** (en otra terminal; ver el README del back). Debe quedar
   escuchando en `http://localhost:8080`:

   ```bash
   cd ../Topaz-Test-JavaSpringBoot
   ./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
   ```

4. **Conecta el device o abre el emulador** y mapea los puertos del PC al teléfono:

   ```bash
   npm run adb:reverse           # adb reverse tcp:8081 (Metro) + tcp:8080 (backend)
   ```

5. **Compila e instala el Development Build:**

   ```bash
   npx expo prebuild             # genera android/ e ios/ (CNG) — solo la 1ª vez
   npx expo run:android          # compila + instala + abre en el device/emulador
   ```

   A partir de la segunda vez, para cambios solo-JS basta con Metro:

   ```bash
   npm start                     # expo start
   ```

   Si alguna vez los estilos de NativeWind no se aplican tras cambiar la
   configuración de Tailwind/Babel/Metro, limpia la caché y reinicia:

   ```bash
   npm run nw:clean              # borra la caché de react-native-css-interop
   npm run start:clean           # expo start --clear
   ```

## Conexión con el backend Topaz (reproducible)

El backend corre **siempre en el puerto 8080** (`server.port=8080`). El front
resuelve la URL base automáticamente según la plataforma, sin configuración:

| Plataforma | URL base por defecto | Requisito |
|-----------|----------------------|-----------|
| Android (device USB) | `http://localhost:8080/api` | `npm run adb:reverse` |
| Android (emulador) | `http://localhost:8080/api` | `adb reverse` (o usa `10.0.2.2` vía override) |
| iOS simulador / Web | `http://localhost:8080/api` | backend corriendo en el host |

**Paso clave para device físico y emulador** — mapea los puertos del PC al teléfono:

```bash
adb reverse tcp:8081 tcp:8081   # Metro (bundler)
adb reverse tcp:8080 tcp:8080   # Backend Topaz
# atajo: npm run adb:reverse
```

Con esto, `localhost:8080` dentro del teléfono apunta al backend del PC. El flujo
de datos es **DummyJSON → backend (BFF) → frontend**.

### Override con túnel o IP LAN (opcional)

Si no usas USB/`adb reverse` (p. ej. expones el back con un túnel), define
`EXPO_PUBLIC_API_BASE_URL` (ver `.env.example`):

```bash
# Túnel Cloudflare (URL temporal, cámbiala por la tuya):
EXPO_PUBLIC_API_BASE_URL=https://xxxxx.trycloudflare.com/api npm run android

# IP del PC en la LAN (device y PC en la misma Wi-Fi):
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.50:8080/api npm run android

# Contingencia sin backend (DummyJSON directo):
EXPO_PUBLIC_API_BASE_URL=https://dummyjson.com npm run android
```

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

- Expo SDK 57 (RN 0.86 · React 19.2) corre New Architecture; MMKV v4 (Nitro) usa `createMMKV`.
- Estilos con **NativeWind 4.2.7** sobre **Tailwind 3.4.19** (NativeWind 4 no es compatible con Tailwind 4).
- Si tras cambiar la configuración de Tailwind/Babel/Metro los estilos `className` no aplican, limpia la caché del transformer: `npm run nw:clean` y luego `npm run start:clean`.
- Los tests de componente usan `react-test-renderer` directo por compatibilidad con React 19.

## Estado

Ver `TRACKING.md` para el detalle por fases.

---
_Desarrollado con asistencia de Kiro AI (modelo Auto) bajo la dirección de Johan Castano (jachqaz)._
