/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { StyleSheet, Text, View } from 'react-native';

interface TabIconProps {
  icon: string;
  label: string;
  color: string;
  focused: boolean;
}

/** Icono de pestaña con glifo + etiqueta y realce cuando está activo. */
export function TabIcon({ icon, label, color, focused }: TabIconProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
        <Text style={{ fontSize: 20, color }}>{icon}</Text>
      </View>
      <Text style={[styles.label, { color }, focused && styles.labelActive]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', width: 72 },
  iconWrap: {
    height: 30,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  iconWrapActive: { backgroundColor: 'rgba(37,99,235,0.12)' },
  label: { marginTop: 2, fontSize: 11 },
  labelActive: { fontWeight: '700' },
});
