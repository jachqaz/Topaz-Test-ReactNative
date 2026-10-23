/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useGetProductsQuery } from './productsApi';
import { ProductCard } from '../../shared/ui/ProductCard';
import { Loader } from '../../shared/ui/Loader';
import { ErrorView } from '../../shared/ui/ErrorView';
import type { Product } from '../../types/product';
import type { ProductsListScreenProps } from '../../app/navigation/types';

/** Pantalla 1: listado de productos. */
export function ProductsListScreen({ navigation }: ProductsListScreenProps) {
  const { data, isLoading, isError, refetch } = useGetProductsQuery();

  const goToDetail = useCallback(
    (id: number) => navigation.navigate('ProductDetail', { id }),
    [navigation],
  );

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
    <View className="flex-1 bg-slate-50 dark:bg-slate-900">
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerClassName="p-4 gap-3"
        ItemSeparatorComponent={() => <View className="h-2" />}
        initialNumToRender={10}
        windowSize={10}
      />
    </View>
  );
}
