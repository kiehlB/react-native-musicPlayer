import { StyleSheet, View } from 'react-native';
import store from './src/store/store';
import { Provider } from 'react-redux';
import SongScreen from './src/screens/songScreen';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SongScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
