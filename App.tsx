import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { BottomBarScreenNavigator } from './src/navigation/navBar';
import store, { persistor } from './src/store/store';
import ErrorBoundary from './src/components/common/errorBoundary';
import { theme } from './src/lib/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ColorSchemeProvider } from './src/context/colorSchemeContext';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from './src/components/common/theme';

const playerCapabilities = [
  Capability.Play,
  Capability.Pause,
  Capability.SkipToNext,
  Capability.SkipToPrevious,
];

function App(): JSX.Element {
  const [playerInit, setPlayerInit] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? theme.dark.background : theme.light.background,
  };

  useEffect(() => {
    async function setupTrackPlayer() {
      if (!playerInit) {
        setPlayerInit(true);

        await TrackPlayer.setupPlayer({
          backBuffer: 1.5,
        });
        TrackPlayer.updateOptions({
          alwaysPauseOnInterruption: true,
          android: {
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback,
          },
          capabilities: playerCapabilities,
          compactCapabilities: playerCapabilities,
          notificationCapabilities: playerCapabilities,
          backwardJumpInterval: 1000,
          forwardJumpInterval: 1000,
        });
      }
    }

    setupTrackPlayer();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Provider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <ColorSchemeProvider>
              <PaperProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                />

                <GestureHandlerRootView style={{ flex: 1 }}>
                  <BottomBarScreenNavigator />
                </GestureHandlerRootView>
              </PaperProvider>
            </ColorSchemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
