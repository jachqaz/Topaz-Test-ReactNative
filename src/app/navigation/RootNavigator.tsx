/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { ProductsListScreen } from '../../features/products/ProductsListScreen';
import { ProductDetailScreen } from '../../features/products/ProductDetailScreen';
import { FavoritesScreen } from '../../features/favorites/FavoritesScreen';
import type { ProductsStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<ProductsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsList"
        component={ProductsListScreen}
        options={{ title: 'Productos' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Detalle' }}
      />
    </Stack.Navigator>
  );
}

/** Navegación raíz: tabs Productos y Favoritos. */
export function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ProductsTab"
        component={ProductsStack}
        options={{
          title: 'Productos',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛍️</Text>,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>♥</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
