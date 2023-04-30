import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { CustomTabBar } from './customBottomTabBar';
import {
  HomeScreenNavigator,
  MusicFolderScreenNavigator,
  SearchScreenNavigator,
} from './navStack';
import { SCREENS } from '../lib/routes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from '../screens/settingsScreen';
import LodingScreen from '../screens/loadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { InitializeApp } from '../store/toolkit';
import { View } from '../components/common/theme';

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
  const { isLoading } = useSelector((state: RootState) => state.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(InitializeApp());
  }, []);

  return (
    <NavigationContainer>
      {isLoading == 'resovle' ? (
        <NavBar.Navigator
          initialRouteName={SCREENS.MUSIC}
          screenOptions={{
            tabBarStyle: { height: 50 },
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
              </View>
            ),
            tabBarShowLabel: true,
            tabBarHideOnKeyboard: true,
          }}
          tabBar={props => <CustomTabBar {...props} />}>
          <NavBar.Screen
            name={SCREENS.MUSIC}
            component={HomeScreenNavigator}
            options={{ tabBarIcon: icon('music-note') }}
          />
          <NavBar.Screen
            name={SCREENS.FOLDER}
            component={MusicFolderScreenNavigator}
            options={{ tabBarIcon: icon('library-music') }}
          />
          <NavBar.Screen
            name={SCREENS.SEARCH}
            component={SearchScreenNavigator}
            options={{ tabBarIcon: icon('search') }}
          />
          <NavBar.Screen
            name={SCREENS.SETTINGS}
            component={SettingsScreen}
            options={{ tabBarIcon: icon('settings') }}
          />
        </NavBar.Navigator>
      ) : (
        <LodingScreen />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 25,
    aspectRatio: 1,
  },
  search: {
    paddingRight: 0,
  },
  headerIcon: {
    flexDirection: 'row',
    marginRight: 16,
  },
});
