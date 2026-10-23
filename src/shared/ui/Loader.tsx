/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { ActivityIndicator, Text, View } from 'react-native';

interface LoaderProps {
  message?: string;
}

/** Indicador de carga centrado. */
export function Loader({ message = 'Cargando…' }: LoaderProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className="mt-3 text-slate-600 dark:text-slate-300">{message}</Text>
    </View>
  );
}
