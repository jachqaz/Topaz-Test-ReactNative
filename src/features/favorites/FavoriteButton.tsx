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
        style={[
          animatedStyle,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderRadius: 16,
            paddingHorizontal: 24,
            paddingVertical: 16,
            backgroundColor: isFavorite ? '#f43f5e' : '#2563eb',
          },
        ]}
      >
        <Text className="text-xl text-white">{isFavorite ? '♥' : '♡'}</Text>
        <Text className="text-base font-bold text-white">
          {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
