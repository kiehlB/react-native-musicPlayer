import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { State, usePlaybackState } from 'react-native-track-player';
import { SCREENS } from '../lib/routes';
import { Player } from '../components/player/miniPlayer';

export const CustomTabBar = (props: BottomTabBarProps): JSX.Element => {
  const [showMusicBar, setShowMusicBar] = useState(false);
  const playbackState = usePlaybackState() as any;
  const currentTabScreen = props.state.routeNames[props.state.index];

  useEffect(() => {
    if (
      playbackState.state &&
      [State.Playing, State.Ready, State.Paused, State.Buffering].includes(
        playbackState.state,
      )
    ) {
      setShowMusicBar(true);
      return;
    }
    setShowMusicBar(false);
  }, []);

  // if (
  //   showMusicBar &&
  //   [SCREENS.SEARCH, SCREENS.HOME].includes(currentTabScreen as SCREENS)
  // ) {
  //   return (
  //     <>
  //       <Player />
  //       <BottomTabBar {...props} />
  //     </>
  //   );
  // }

  return (
    <>
      <Player />
      <BottomTabBar {...props} />
    </>
  );
};
