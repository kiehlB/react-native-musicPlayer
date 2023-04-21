import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {CustomTabBar} from './CustomBottomTabBar';
import {HomeScreenNavigator, SearchScreenNavigator} from './NavStack';
import {SCREENS} from '../lib/routes';
import Test from '../components/test';
import {MyTheme, theme} from '../lib/theme';

type Props = {focused: boolean; color: string; size: number};

const icon = (imageData: ImageSourcePropType) => (props: Props) => {
  const visibility = {opacity: props.focused ? 1.2 : 0.4};

  return <Image source={imageData} style={[styles.icon, visibility]} />;
};

const NavBar = createBottomTabNavigator();
export const BottomBarScreenNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <NavBar.Navigator
        initialRouteName={SCREENS.ROOT}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <NavBar.Screen name={SCREENS.ROOT} component={HomeScreenNavigator} />
        <NavBar.Screen
          name={SCREENS.SEARCH}
          component={SearchScreenNavigator}
        />
        <NavBar.Screen name={SCREENS.PLAYER} component={Test} />
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
