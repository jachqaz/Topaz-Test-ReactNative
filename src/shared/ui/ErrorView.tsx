/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { Pressable, Text, View } from 'react-native';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

/** Vista de error con acción de reintento. */
export function ErrorView({ message = 'Algo salió mal.', onRetry }: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-slate-900">
      <Text className="mb-4 text-center text-base text-red-600 dark:text-red-400">{message}</Text>
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          className="rounded-xl bg-primary px-5 py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">Reintentar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
