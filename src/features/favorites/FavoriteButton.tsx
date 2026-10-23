/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

/** Botón de favorito con micro-interacción (escala al pulsar). */
export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(1.25), withSpring(1));
    onToggle();
  };

  return (
    <Pressable accessibilityRole="button" onPress={handlePress}>
      <Animated.View
        style={animatedStyle}
        className={`flex-row items-center justify-center gap-2 rounded-2xl px-5 py-3 ${
          isFavorite ? 'bg-red-500' : 'bg-primary'
        }`}
      >
        <Text className="text-lg">{isFavorite ? '♥' : '♡'}</Text>
        <Text className="font-semibold text-white">
          {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
