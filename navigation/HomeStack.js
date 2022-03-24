import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile'
import Calendar from '../screens/Calendar'
import { LinearGradient } from 'expo-linear-gradient';


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  return (
    <LinearGradient 
    start={{x: 0.0, y: 0.25}} end={{x: 1, y: 1.0}}
colors={['#E8A196', '#E8A196', '#AF8EC9']}
style={{ flex: 1 }}
>
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#fff'
      barStyle={{ backgroundColor: 'transparent' }}
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
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </LinearGradient>
  );
}

// export default function HomeStack() {
//   return (
//     <Stack.Navigator headerMode='none'>
//       <Stack.Screen name='Home' component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }
