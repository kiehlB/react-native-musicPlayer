import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomTabBar } from './customBottomTabBar';
import { HomeScreenNavigator, MusicFolderScreenNavigator } from './navStack';
import { SCREENS } from '../lib/routes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from '../screens/settingsScreen';

type Props = { focused: boolean; color: string; size: number };

const icon = (iconName: string) => (props: Props) => {
  const visibility = { opacity: props.focused ? 1.2 : 0.4 };

  return (
    <MaterialIcons
      name={iconName}
      size={24}
      color="black"
      style={[styles.icon, visibility]}
    />
  );
};

const NavBar = createBottomTabNavigator();

export const BottomBarScreenNavigator = () => {
  return (
    <NavigationContainer>
      <NavBar.Navigator
        initialRouteName={SCREENS.ROOT}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <NavBar.Screen
          name={SCREENS.ROOT}
          component={HomeScreenNavigator}
          options={{ tabBarIcon: icon('music-note') }}
        />
        <NavBar.Screen
          name={SCREENS.SEARCH}
          component={MusicFolderScreenNavigator}
          options={{ tabBarIcon: icon('library-music') }}
        />
        <NavBar.Screen
          name={SCREENS.PLAYER}
          component={SettingsScreen}
          options={{ tabBarIcon: icon('settings') }}
        />
      </NavBar.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 25,
    aspectRatio: 1,
  },
});
