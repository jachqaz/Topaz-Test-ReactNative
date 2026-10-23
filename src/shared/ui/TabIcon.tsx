/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { Text, View } from 'react-native';

interface TabIconProps {
  icon: string;
  label: string;
  color: string;
  focused: boolean;
}

/**
 * Icono de pestaña con glifo + etiqueta y realce cuando está activo.
 * Usa glifos Unicode para no depender de fuentes de iconos externas.
 */
export function TabIcon({ icon, label, color, focused }: TabIconProps) {
  return (
    <View className="items-center justify-center" style={{ width: 72 }}>
      <View
        className={`h-8 w-14 items-center justify-center rounded-full ${
          focused ? 'bg-primary/10 dark:bg-primary/20' : 'bg-transparent'
        }`}
      >
        <Text style={{ fontSize: 20, color }}>{icon}</Text>
      </View>
      <Text
        style={{ color, fontSize: 11 }}
        className={focused ? 'mt-0.5 font-semibold' : 'mt-0.5'}
      >
        {label}
      </Text>
    </View>
  );
}
