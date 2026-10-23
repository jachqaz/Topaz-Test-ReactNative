/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onPress: (id: number) => void;
}

/**
 * Ítem de producto para la FlatList. Tarjeta moderna: thumbnail, título,
 * categoría, rating y precio destacado. Pensado para toque cómodo y legible.
 */
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
      className="flex-row items-center gap-4 rounded-3xl bg-white p-3 shadow-sm active:scale-[0.98] active:opacity-90 dark:bg-slate-800"
      style={{
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: product.thumbnail }}
        className="h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-700"
        resizeMode="cover"
      />
      <View className="flex-1">
        {product.category ? (
          <Text className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary dark:text-blue-400">
            {product.category}
          </Text>
        ) : null}
        <Text
          numberOfLines={2}
          className="text-base font-bold leading-5 text-slate-900 dark:text-slate-100"
        >
          {product.title}
        </Text>
        <View className="mt-1.5 flex-row items-center gap-2">
          {product.rating ? (
            <View className="flex-row items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 dark:bg-amber-500/15">
              <Text className="text-xs text-amber-500">★</Text>
              <Text className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                {product.rating.toFixed(1)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View className="items-end">
        <Text className="text-lg font-extrabold text-slate-900 dark:text-slate-50">
          ${finalPrice.toFixed(2)}
        </Text>
        {hasDiscount ? (
          <Text className="text-xs font-medium text-slate-400 line-through dark:text-slate-500">
            ${product.price.toFixed(2)}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);
