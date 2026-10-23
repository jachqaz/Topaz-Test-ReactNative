/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

/** Rutas del stack de productos. */
export type ProductsStackParamList = {
  ProductsList: undefined;
  ProductDetail: { id: number };
};

/** Rutas del bottom tab. El tab de productos anida el stack. */
export type RootTabParamList = {
  ProductsTab: NavigatorScreenParams<ProductsStackParamList> | undefined;
  FavoritesTab: undefined;
};

export type ProductDetailScreenProps = NativeStackScreenProps<
  ProductsStackParamList,
  'ProductDetail'
>;

export type ProductsListScreenProps = NativeStackScreenProps<
  ProductsStackParamList,
  'ProductsList'
>;
