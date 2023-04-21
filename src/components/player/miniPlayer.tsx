import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTrackPlayerEvents, Event, State } from 'react-native-track-player';

// import LinearGradient from 'react-native-linear-gradient';

import { navigateToPlayer } from '../../navigation/Navigation';

const events = [Event.PlaybackState, Event.PlaybackError];

const TrackInfo = () => {
  const [playerState, setPlayerState] = useState(null) as any;

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });
  const nav = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={navigateToPlayer(nav)}>
      <View style={styles.info}>
        {/* <View style={styles.image}>
          <TrackBarImage
            url={activeTrack?.artwork as string}
            id={activeTrack?.title}
          />
        </View>
        <TrackBarInfo
          artist={activeTrack?.artist}
          name={activeTrack?.title}
        /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const MiniPlayer = () => {
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        colors={[colors.darkContrast, colors.greyTransparent, colors.dark]}
        style={styles.gradient}
      /> */}
      <View style={styles.bar}>
        <TrackInfo />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    maxHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  info: {
    flexDirection: 'row',
    flex: 4 / 5,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'relative',
    marginRight: 10,
  },
});
