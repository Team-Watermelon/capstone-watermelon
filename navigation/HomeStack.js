import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile'
import Calendar from '../screens/Calendar'
import AudioRecord from '../screens/AudioRecord'

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// export function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator headerMode='none'>
//       <HomeStack.Screen name='Home' component={HomeScreen} />
//       <HomeStack.Screen name='AudioRecord' component={AudioRecord} />
//     </HomeStack.Navigator>
//   );
// }
function StackScreen(){
  return ( 
  <Stack.Navigator>
    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name = 'AudioRecord'component={AudioRecord} />
  </Stack.Navigator>
  )
}
export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#e91e63'
      barStyle={{ backgroundColor: 'aqua' }}
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
      <Tab.Screen
        name='Calendar'
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='calendar' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={StackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name='AudioRecord'
        component={StackScreen}
      /> */}
    </Tab.Navigator>
  );
}


