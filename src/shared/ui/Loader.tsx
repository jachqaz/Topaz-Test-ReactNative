/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from './theme';

interface LoaderProps {
  message?: string;
}

/** Indicador de carga centrado. */
export function Loader({ message = 'Cargando…' }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  text: { marginTop: spacing.md, color: colors.textMuted },
});
