/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { colors, radius, spacing } from '../../shared/ui/theme';

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
        style={[styles.button, { backgroundColor: isFavorite ? colors.rose : colors.primary }, animatedStyle]}
      >
        <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
        <Text style={styles.label}>
          {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  heart: { fontSize: 20, color: colors.white },
  label: { fontSize: 16, fontWeight: '700', color: colors.white },
});
