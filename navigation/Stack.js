import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../screens/HomeScreen';
import AudioRecord from '../screens/AudioRecord'

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='AudioRecord' component={AudioRecord} />
    </Stack.Navigator>
  );
}