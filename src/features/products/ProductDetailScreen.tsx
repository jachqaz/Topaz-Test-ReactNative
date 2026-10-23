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
  StyleSheet,
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
import { colors, radius, spacing } from '../../shared/ui/theme';
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

  if (isLoading) return <Loader message="Cargando detalle…" />;
  if (isError || !product) return <ErrorView message="No se pudo cargar el producto." onRetry={refetch} />;

  const gallery = product.images.length > 0 ? product.images : [product.thumbnail];
  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Volver"
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { top: insets.top + spacing.sm }]}
      >
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.gallery}>
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
            <View style={styles.dots}>
              {gallery.map((_, i) => (
                <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.body}>
          {product.category ? (
            <Text style={styles.category}>{product.category.toUpperCase()}</Text>
          ) : null}
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>
            {hasDiscount ? <Text style={styles.priceOld}>${product.price.toFixed(2)}</Text> : null}
            {hasDiscount ? (
              <View style={styles.discountPill}>
                <Text style={styles.discountText}>-{product.discountPercentage.toFixed(0)}%</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.metaRow}>
            <View style={styles.ratingPill}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingText}>{product.rating.toFixed(2)}</Text>
            </View>
            {product.brand ? <Text style={styles.meta}>{product.brand}</Text> : null}
            <Text style={styles.meta}>Stock: {product.stock}</Text>
          </View>

          <Text style={styles.desc}>{product.description}</Text>

          <View style={{ marginTop: spacing.lg }}>
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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  backBtn: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  backIcon: { fontSize: 24, lineHeight: 26, color: colors.text },
  gallery: { backgroundColor: colors.surfaceAlt },
  dots: {
    position: 'absolute',
    bottom: spacing.md,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: { height: 8, width: 8, borderRadius: 999, backgroundColor: '#cbd5e1' },
  dotActive: { width: 20, backgroundColor: colors.primary },
  body: { padding: spacing.xl, gap: spacing.md },
  category: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, color: colors.primary },
  title: { fontSize: 24, fontWeight: '800', lineHeight: 30, color: colors.text },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: spacing.sm },
  price: { fontSize: 30, fontWeight: '900', color: colors.text },
  priceOld: {
    fontSize: 16,
    color: colors.textFaint,
    textDecorationLine: 'line-through',
    paddingBottom: 4,
  },
  discountPill: {
    backgroundColor: colors.emeraldBg,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  discountText: { fontSize: 12, fontWeight: '700', color: colors.emerald },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.amberBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  star: { color: colors.amber },
  ratingText: { fontSize: 13, fontWeight: '600', color: '#b45309' },
  meta: { fontSize: 13, color: colors.textMuted },
  desc: { marginTop: spacing.xs, fontSize: 15, lineHeight: 22, color: colors.textMuted },
});
