import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import Messages from '../screens/Messages';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#e91e63'
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Messages'
        component={Messages}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='message' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// export default function HomeStack() {
//   return (
//     <Stack.Navigator headerMode='none'>
//       <Stack.Screen name='Home' component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }
