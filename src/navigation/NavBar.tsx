import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomTabBar } from './customBottomTabBar';
import { HomeScreenNavigator, MusicFolderScreenNavigator } from './navStack';
import { SCREENS } from '../lib/routes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from '../screens/settingsScreen';
import { Text, View } from '../components/common/theme';
import Menu from '../components/common/menu';

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
        initialRouteName={SCREENS.Music}
        screenOptions={{
          headerStyle: {
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerShown: true,
          headerRight: () => (
            <View style={styles.headerIcon}>
              <MaterialIcons
                name="search"
                size={24}
                color="black"
                style={[styles.search]}
              />

              <Menu>
                <MaterialIcons
                  name="sort"
                  size={24}
                  color="black"
                  style={[styles.search]}
                />
              </Menu>
            </View>
          ),
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: true,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <NavBar.Screen
          name={SCREENS.Music}
          component={HomeScreenNavigator}
          options={{ tabBarIcon: icon('music-note') }}
        />
        <NavBar.Screen
          name={SCREENS.Folder}
          component={MusicFolderScreenNavigator}
          options={{ tabBarIcon: icon('library-music') }}
        />
        <NavBar.Screen
          name={SCREENS.Settings}
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
  search: {
    paddingRight: 16,
  },
  headerIcon: {
    flexDirection: 'row',
    marginRight: 24,
  },
});
