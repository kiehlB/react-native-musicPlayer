import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/homeScreen';
import MusicFolderScreen from '../screens/musicFolderScreen';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '../components/common/theme';

const Tab = createMaterialTopTabNavigator();

export default function AppTabBar() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: textColor,
        tabBarIndicatorStyle: {
          backgroundColor: '#CCCCCC',
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
          paddingTop: 0,
          marginTop: 0,
          borderBottomColor: 'transparent',
        },
      }}>
      <Tab.Screen name="전체 목록" component={HomeScreen} />
      <Tab.Screen name="좋아요" component={MusicFolderScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
});
