/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

/** Botón de favorito con micro-interacción (rebote al pulsar). */
export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(1.2, { damping: 6 }), withSpring(1));
    onToggle();
  };

  return (
    <Pressable accessibilityRole="button" onPress={handlePress}>
      <Animated.View
        style={animatedStyle}
        className={`flex-row items-center justify-center gap-2 rounded-2xl px-6 py-4 ${
          isFavorite ? 'bg-rose-500' : 'bg-primary'
        } active:opacity-90`}
      >
        <Text className="text-xl text-white">{isFavorite ? '♥' : '♡'}</Text>
        <Text className="text-base font-bold text-white">
          {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
