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
import type { ProductsStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<ProductsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const ACTIVE = '#2563eb';
const INACTIVE = '#94a3b8';

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
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#0f172a',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
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
