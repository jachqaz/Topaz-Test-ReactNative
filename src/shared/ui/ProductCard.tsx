/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../../types/product';
import { colors, radius, spacing, shadow } from './theme';

interface ProductCardProps {
  product: Product;
  onPress: (id: number) => void;
}

/** Ítem de producto: thumbnail, categoría, título, rating y precio destacado. */
function ProductCardComponent({ product, onPress }: ProductCardProps) {
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver ${product.title}`}
      onPress={() => onPress(product.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.info}>
        {product.category ? (
          <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        ) : null}
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        {product.rating ? (
          <View style={styles.ratingPill}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.priceCol}>
        <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>
        {hasDiscount ? (
          <Text style={styles.priceOld}>${product.price.toFixed(2)}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.md,
    ...shadow.card,
  },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
  },
  info: { flex: 1 },
  category: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.primary,
    marginBottom: 2,
  },
  title: { fontSize: 15, fontWeight: '700', lineHeight: 20, color: colors.text },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    backgroundColor: colors.amberBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginTop: 6,
  },
  star: { fontSize: 12, color: colors.amber },
  ratingText: { fontSize: 12, fontWeight: '600', color: '#b45309' },
  priceCol: { alignItems: 'flex-end' },
  price: { fontSize: 18, fontWeight: '800', color: colors.text },
  priceOld: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textFaint,
    textDecorationLine: 'line-through',
  },
});

export const ProductCard = memo(ProductCardComponent);
