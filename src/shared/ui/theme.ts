/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */

/**
 * Tokens de diseño centralizados. Usamos StyleSheet nativo (opción válida del
 * documento) para no depender del runtime de NativeWind, que no aplicaba estilos
 * en este stack (Expo SDK 58 / RN 0.88 / New Architecture).
 */
export const colors = {
  bg: '#f1f5f9',
  surface: '#ffffff',
  surfaceAlt: '#f8fafc',
  border: '#e2e8f0',
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  rose: '#f43f5e',
  amber: '#f59e0b',
  amberBg: '#fef3c7',
  emerald: '#059669',
  emeraldBg: '#d1fae5',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  white: '#ffffff',
  shadow: '#0f172a',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;
