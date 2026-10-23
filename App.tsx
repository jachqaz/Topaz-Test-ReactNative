/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import 'react-native-gesture-handler';
import './global.css';

import { LogBox, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';
import { RootNavigator } from './src/app/navigation/RootNavigator';

// Oculta el overlay flotante de avisos de desarrollo (LogBox). Las advertencias
// siguen visibles en la consola de Metro; solo se retira la tarjeta flotante
// que tapaba la UI en el dispositivo.
LogBox.ignoreAllLogs(true);

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: '#2563eb', background: '#f8fafc' },
};
const darkTheme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, primary: '#60a5fa', background: '#020617' },
};

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme}>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
