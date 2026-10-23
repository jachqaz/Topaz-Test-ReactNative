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

/** Ítem de producto para la FlatList: thumbnail, título y precio. */
function ProductCardComponent({ product, onPress }: ProductCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(product.id)}
      className="flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-80 dark:bg-slate-800"
    >
      <Image
        source={{ uri: product.thumbnail }}
        className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-700"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text numberOfLines={2} className="font-semibold text-slate-900 dark:text-slate-100">
          {product.title}
        </Text>
        <Text className="mt-1 text-primary dark:text-blue-400">${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);
