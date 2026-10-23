/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ProductCard } from '../../shared/ui/ProductCard';
import { useAppSelector } from '../../app/store/hooks';
import { selectFavorites } from './selectors';
import { colors, radius, spacing, shadow } from '../../shared/ui/theme';
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
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.heading}>Favoritos</Text>
        <Text style={styles.sub}>
          {favorites.length} {favorites.length === 1 ? 'guardado' : 'guardados'}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyCircle}>
            <Text style={styles.emptyHeart}>♡</Text>
          </View>
          <Text style={styles.emptyTitle}>Todavía no tienes favoritos</Text>
          <Text style={styles.emptyText}>
            Explora los productos y pulsa el corazón para guardarlos aquí.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ProductsTab', { screen: 'ProductsList' })}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <Text style={styles.ctaText}>Ver productos</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    ...shadow.header,
  },
  heading: { fontSize: 30, fontWeight: '800', color: colors.text },
  sub: { marginTop: 2, fontSize: 13, color: colors.textMuted },
  listContent: { padding: spacing.lg, paddingBottom: spacing.xxl },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyCircle: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  emptyHeart: { fontSize: 36, color: colors.rose },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  emptyText: { marginTop: 4, textAlign: 'center', fontSize: 14, color: colors.textMuted },
  cta: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: { fontWeight: '700', color: colors.white },
});
