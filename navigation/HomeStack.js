import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile'

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  );
}
