/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import 'react-native-gesture-handler';

import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { colors } from './src/shared/ui/theme';

// Oculta el overlay flotante de avisos de desarrollo (LogBox) que tapaba la UI.
LogBox.ignoreAllLogs(true);

const navTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: colors.primary, background: colors.bg },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
            <StatusBar style="dark" />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
