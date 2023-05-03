import { useCallback, useEffect, useState } from 'react';
import TrackPlayer, { useProgress } from 'react-native-track-player';

export const useTrackData = () => {
  const [trackData, setTrackData] = useState();

  const { position, buffered, duration } = useProgress();

  const trackId = TrackPlayer.getCurrentTrack();

  const onTrackChanged = useCallback(async () => {
    const trackId = await TrackPlayer.getCurrentTrack();
    if (trackId) {
      const data = (await TrackPlayer.getTrack(trackId)) as any;
      setTrackData(data);
    }
  }, []);

  return {
    trackData,
    buffered,
    duration,
  };
};
