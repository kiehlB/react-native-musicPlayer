import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from '../lib/routes';
import HomeScreen from '../screens/homeScreen';
import MusicFolderScreen from '../screens/musicFolderScreen';
import SettingsScreen from '../screens/settingsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppTabBar from './appTabBar';

const Tab = createMaterialTopTabNavigator();

const NavStack = createNativeStackNavigator();

export const HomeScreenNavigator = () => {
  return (
    <NavStack.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={{ headerShown: true, animation: 'fade_from_bottom' }}>
      <NavStack.Screen
        name={SCREENS.HOME}
        component={AppTabBar}
        options={{ headerShown: false }}
      />

      <NavStack.Group>
        <NavStack.Screen name={SCREENS.ARTIST_SCREEN} component={HomeScreen} />
        <NavStack.Screen name={SCREENS.ALBUM_SCREEN} component={MusicFolderScreen} />
        <NavStack.Screen name={SCREENS.PLAYLIST_SCREEN} component={SettingsScreen} />
      </NavStack.Group>
    </NavStack.Navigator>
  );
};

export const MusicFolderScreenNavigator = () => {
  return (
    <NavStack.Navigator
      initialRouteName={SCREENS.SEARCH_SCREEN}
      screenOptions={{ headerShown: true, animation: 'fade_from_bottom' }}>
      <NavStack.Screen
        name={SCREENS.SEARCH_SCREEN}
        component={MusicFolderScreen}
        options={{ headerShown: false }}
      />
      <NavStack.Group>
        <NavStack.Screen name={SCREENS.ARTIST_SCREEN} component={HomeScreen} />
        <NavStack.Screen name={SCREENS.ALBUM_SCREEN} component={MusicFolderScreen} />
        <NavStack.Screen name={SCREENS.PLAYLIST_SCREEN} component={SettingsScreen} />
      </NavStack.Group>
    </NavStack.Navigator>
  );
};
