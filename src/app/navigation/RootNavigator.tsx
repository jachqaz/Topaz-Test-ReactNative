/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductsListScreen } from '../../features/products/ProductsListScreen';
import { ProductDetailScreen } from '../../features/products/ProductDetailScreen';
import { FavoritesScreen } from '../../features/favorites/FavoritesScreen';
import { TabIcon } from '../../shared/ui/TabIcon';
import { colors } from '../../shared/ui/theme';
import type { ProductsStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<ProductsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const INACTIVE = colors.textFaint;

/** Stack de productos. Cada pantalla pinta su propia cabecera. */
function ProductsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductsList" component={ProductsListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

/** Navegación raíz: bottom tabs Productos y Favoritos, claramente visibles. */
export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 12,
        },
      }}
    >
      <Tab.Screen
        name="ProductsTab"
        component={ProductsStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🛍" label="Productos" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="♥" label="Favoritos" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
