import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/homeScreen';
import MusicFolderScreen from '../screens/musicFolderScreen';

const Tab = createMaterialTopTabNavigator();

export default function CustomTopTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={HomeScreen} />
      <Tab.Screen name="Tab2" component={MusicFolderScreen} />
    </Tab.Navigator>
  );
}
