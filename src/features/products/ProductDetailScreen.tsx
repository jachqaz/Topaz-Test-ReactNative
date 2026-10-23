/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetProductByIdQuery } from './productsApi';
import { Loader } from '../../shared/ui/Loader';
import { ErrorView } from '../../shared/ui/ErrorView';
import { FavoriteButton } from '../favorites/FavoriteButton';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { toggleFavorite } from '../favorites/favoritesSlice';
import { selectIsFavorite } from '../favorites/selectors';
import type { ProductDetailScreenProps } from '../../app/navigation/types';

/** Pantalla 2: detalle de producto con carrusel de imágenes y favorito. */
export function ProductDetailScreen({ route, navigation }: ProductDetailScreenProps) {
  const { id } = route.params;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { data: product, isLoading, isError, refetch } = useGetProductByIdQuery(id);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(id));
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return <Loader message="Cargando detalle…" />;
  }

  if (isError || !product) {
    return <ErrorView message="No se pudo cargar el producto." onRetry={refetch} />;
  }

  const gallery = product.images.length > 0 ? product.images : [product.thumbnail];
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      {/* Botón volver flotante sobre la imagen */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Volver"
        onPress={() => navigation.goBack()}
        className="absolute left-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm dark:bg-slate-800/90"
        style={{ top: insets.top + 8 }}
      >
        <Text className="text-lg text-slate-900 dark:text-slate-100">‹</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Carrusel */}
        <View className="bg-slate-100 dark:bg-slate-900">
          <FlatList
            data={gallery}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(uri, index) => `${uri}-${index}`}
            onMomentumScrollEnd={(e) =>
              setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width))
            }
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width, height: width }} resizeMode="contain" />
            )}
          />
          {gallery.length > 1 ? (
            <View className="absolute bottom-3 w-full flex-row items-center justify-center gap-1.5">
              {gallery.map((_, i) => (
                <View
                  key={i}
                  className={`h-2 rounded-full ${
                    i === activeIndex ? 'w-5 bg-primary' : 'w-2 bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </View>
          ) : null}
        </View>

        {/* Info */}
        <View className="gap-3 p-5">
          {product.category ? (
            <Text className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-blue-400">
              {product.category}
            </Text>
          ) : null}
          <Text className="text-2xl font-extrabold leading-7 text-slate-900 dark:text-slate-50">
            {product.title}
          </Text>

          <View className="flex-row flex-wrap items-center gap-2">
            <View className="flex-row items-end gap-2">
              <Text className="text-3xl font-black text-slate-900 dark:text-slate-50">
                ${finalPrice.toFixed(2)}
              </Text>
              {hasDiscount ? (
                <Text className="pb-1 text-base font-medium text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </Text>
              ) : null}
            </View>
            {hasDiscount ? (
              <View className="rounded-full bg-emerald-50 px-2.5 py-1 dark:bg-emerald-500/15">
                <Text className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  -{product.discountPercentage.toFixed(0)}%
                </Text>
              </View>
            ) : null}
          </View>

          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1 rounded-full bg-amber-50 px-3 py-1 dark:bg-amber-500/15">
              <Text className="text-amber-500">★</Text>
              <Text className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                {product.rating.toFixed(2)}
              </Text>
            </View>
            {product.brand ? (
              <Text className="text-sm text-slate-500 dark:text-slate-400">{product.brand}</Text>
            ) : null}
            <Text className="text-sm text-slate-500 dark:text-slate-400">
              Stock: {product.stock}
            </Text>
          </View>

          <Text className="mt-1 text-base leading-6 text-slate-600 dark:text-slate-300">
            {product.description}
          </Text>

          <View className="mt-4">
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => dispatch(toggleFavorite(product))}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
