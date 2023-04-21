import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { SCREENS } from '../lib/routes';
import HomeScreen from '../screens/HomeScreen';

const NavStack = createNativeStackNavigator();

export const HomeScreenNavigator = () => {
  return (
    <NavStack.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={{ headerShown: true, animation: 'fade_from_bottom' }}>
      <NavStack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <NavStack.Group>
        <NavStack.Screen name={SCREENS.ARTIST_SCREEN} component={HomeScreen} />
        <NavStack.Screen name={SCREENS.ALBUM_SCREEN} component={HomeScreen} />
        <NavStack.Screen name={SCREENS.PLAYLIST_SCREEN} component={HomeScreen} />
      </NavStack.Group>
    </NavStack.Navigator>
  );
};

export const SearchScreenNavigator = () => {
  return (
    <NavStack.Navigator
      initialRouteName={SCREENS.SEARCH_SCREEN}
      screenOptions={{ headerShown: true, animation: 'fade_from_bottom' }}>
      <NavStack.Screen
        name={SCREENS.SEARCH_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <NavStack.Group>
        <NavStack.Screen name={SCREENS.ARTIST_SCREEN} component={HomeScreen} />
        <NavStack.Screen name={SCREENS.ALBUM_SCREEN} component={HomeScreen} />
        <NavStack.Screen name={SCREENS.PLAYLIST_SCREEN} component={HomeScreen} />
      </NavStack.Group>
    </NavStack.Navigator>
  );
};
