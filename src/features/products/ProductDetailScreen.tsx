/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useWindowDimensions } from 'react-native';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { useGetProductByIdQuery } from './productsApi';
import { Loader } from '../../shared/ui/Loader';
import { ErrorView } from '../../shared/ui/ErrorView';
import { FavoriteButton } from '../favorites/FavoriteButton';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { toggleFavorite } from '../favorites/favoritesSlice';
import { selectIsFavorite } from '../favorites/selectors';
import type { ProductDetailScreenProps } from '../../app/navigation/types';

/** Pantalla 2: detalle de producto con carrusel y favorito. */
export function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  const { id } = route.params;
  const { width } = useWindowDimensions();
  const { data: product, isLoading, isError, refetch } = useGetProductByIdQuery(id);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(id));

  if (isLoading) {
    return <Loader message="Cargando detalle…" />;
  }

  if (isError || !product) {
    return <ErrorView message="No se pudo cargar el producto." onRetry={refetch} />;
  }

  const gallery = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <ScrollView className="flex-1 bg-white dark:bg-slate-900">
      <FlatList
        data={gallery}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri, index) => `${uri}-${index}`}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, height: width }} resizeMode="cover" />
        )}
      />
      <View className="gap-2 p-5">
        <Text className="text-2xl font-bold text-slate-900 dark:text-slate-100">{product.title}</Text>
        <View className="flex-row items-center gap-3">
          <Text className="text-xl font-semibold text-primary dark:text-blue-400">
            ${product.price.toFixed(2)}
          </Text>
          <Text className="text-amber-500">★ {product.rating.toFixed(2)}</Text>
        </View>
        <Text className="mt-2 leading-6 text-slate-600 dark:text-slate-300">{product.description}</Text>
        <View className="mt-4">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => dispatch(toggleFavorite(product))}
          />
        </View>
      </View>
    </ScrollView>
  );
}
