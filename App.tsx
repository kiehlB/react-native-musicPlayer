import React, { useEffect, useState } from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomBarScreenNavigator } from './src/navigation/navBar';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import ErrorBoundary from './src/components/common/errorBoundary';

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
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
          <PaperProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />

            <BottomBarScreenNavigator />
          </PaperProvider>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;
