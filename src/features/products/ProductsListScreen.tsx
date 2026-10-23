/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetProductsQuery } from './productsApi';
import { ProductCard } from '../../shared/ui/ProductCard';
import { Loader } from '../../shared/ui/Loader';
import { ErrorView } from '../../shared/ui/ErrorView';
import type { Product } from '../../types/product';
import type { ProductsListScreenProps } from '../../app/navigation/types';

/** Pantalla 1: listado de productos con cabecera y búsqueda local. */
export function ProductsListScreen({ navigation }: ProductsListScreenProps) {
  const { data, isLoading, isError, refetch, isFetching } = useGetProductsQuery();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const goToDetail = useCallback(
    (id: number) => navigation.navigate('ProductDetail', { id }),
    [navigation],
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q),
    );
  }, [data, query]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} onPress={goToDetail} />,
    [goToDetail],
  );

  if (isLoading) {
    return <Loader message="Cargando productos…" />;
  }

  if (isError) {
    return <ErrorView message="No se pudieron cargar los productos." onRetry={refetch} />;
  }

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <View
        className="bg-white px-5 pb-4 dark:bg-slate-900"
        style={{ paddingTop: insets.top + 12 }}
      >
        <Text className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          Productos
        </Text>
        <Text className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
          {filtered.length} {filtered.length === 1 ? 'artículo' : 'artículos'}
        </Text>
        <View className="mt-3 flex-row items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <Text className="text-slate-400">🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nombre o categoría"
            placeholderTextColor="#94a3b8"
            className="flex-1 text-base text-slate-900 dark:text-slate-100"
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        initialNumToRender={8}
        windowSize={10}
        removeClippedSubviews
        onRefresh={refetch}
        refreshing={isFetching}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-center text-slate-500 dark:text-slate-400">
              Sin resultados para “{query}”.
            </Text>
          </View>
        }
      />
    </View>
  );
}
