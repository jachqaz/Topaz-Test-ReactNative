/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useCallback } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ProductCard } from '../../shared/ui/ProductCard';
import { useAppSelector } from '../../app/store/hooks';
import { selectFavorites } from './selectors';
import type { Product } from '../../types/product';
import type { ProductsStackParamList, RootTabParamList } from '../../app/navigation/types';

type FavoritesNav = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'FavoritesTab'>,
  NativeStackNavigationProp<ProductsStackParamList>
>;

/** Pantalla 3: favoritos persistidos localmente, en tiempo real. */
export function FavoritesScreen() {
  const favorites = useAppSelector(selectFavorites);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<FavoritesNav>();

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={(id) =>
          navigation.navigate('ProductsTab', { screen: 'ProductDetail', params: { id } })
        }
      />
    ),
    [navigation],
  );

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <View
        className="bg-white px-5 pb-4 dark:bg-slate-900"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Text className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          Favoritos
        </Text>
        <Text className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
          {favorites.length} {favorites.length === 1 ? 'guardado' : 'guardados'}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Text className="text-4xl">♡</Text>
          </View>
          <Text className="text-center text-lg font-bold text-slate-700 dark:text-slate-200">
            Todavía no tienes favoritos
          </Text>
          <Text className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
            Explora los productos y pulsa el corazón para guardarlos aquí.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ProductsTab', { screen: 'ProductsList' })}
            className="mt-6 rounded-2xl bg-primary px-6 py-3 active:opacity-80"
          >
            <Text className="font-semibold text-white">Ver productos</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerClassName="p-4 gap-3"
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
