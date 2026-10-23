/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductCard } from '../../shared/ui/ProductCard';
import { useAppSelector } from '../../app/store/hooks';
import { selectFavorites } from './selectors';
import type { Product } from '../../types/product';
import type { ProductsStackParamList } from '../../app/navigation/types';

/** Pantalla 3: favoritos persistidos localmente. */
export function FavoritesScreen() {
  const favorites = useAppSelector(selectFavorites);
  const navigation = useNavigation<NativeStackNavigationProp<ProductsStackParamList>>();

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={(id) => navigation.navigate('ProductDetail', { id })}
      />
    ),
    [navigation],
  );

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-6 dark:bg-slate-900">
        <Text className="text-center text-slate-500 dark:text-slate-400">
          Aún no tienes favoritos. Añade productos desde su detalle.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerClassName="p-4 gap-3"
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
}
