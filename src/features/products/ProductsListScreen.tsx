/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetProductsQuery } from './productsApi';
import { ProductCard } from '../../shared/ui/ProductCard';
import { Loader } from '../../shared/ui/Loader';
import { ErrorView } from '../../shared/ui/ErrorView';
import { colors, radius, spacing, shadow } from '../../shared/ui/theme';
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
      (p) => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q),
    );
  }, [data, query]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} onPress={goToDetail} />,
    [goToDetail],
  );

  if (isLoading) return <Loader message="Cargando productos…" />;
  if (isError) return <ErrorView message="No se pudieron cargar los productos." onRetry={refetch} />;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.heading}>Productos</Text>
        <Text style={styles.sub}>
          {filtered.length} {filtered.length === 1 ? 'artículo' : 'artículos'}
        </Text>
        <View style={styles.search}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nombre o categoría"
            placeholderTextColor={colors.textFaint}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        initialNumToRender={8}
        windowSize={10}
        removeClippedSubviews
        onRefresh={refetch}
        refreshing={isFetching}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Sin resultados para “{query}”.</Text>
          </View>
        }
      />
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
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  searchIcon: { color: colors.textFaint },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },
  listContent: { padding: spacing.lg, paddingBottom: spacing.xxl },
  empty: { alignItems: 'center', paddingVertical: 80 },
  emptyText: { textAlign: 'center', color: colors.textMuted },
});
