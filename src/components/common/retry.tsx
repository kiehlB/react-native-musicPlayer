import { FC } from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

interface TryAgainProps {
  onClick: () => void;
  error: string;
  action: string;
}

export const TryAgain: FC<TryAgainProps> = ({ error, action, onClick }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        zIndex: 0,
        padding: 10,
      }}>
      <Headline style={{ marginVertical: 24 }}>{error}</Headline>
      <Button icon="repeat" mode="contained" onPress={onClick}>
        {action}
      </Button>
    </View>
  );
};
