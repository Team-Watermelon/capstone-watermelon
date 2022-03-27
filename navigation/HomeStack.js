import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MessageList from '../screens/MessageList';
import Profile from '../screens/Profile'
import Calendar from '../screens/Calendar'
import AddRoomScreen from '../screens/AddRoomScreen';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


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
        component={MessageList}
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
  );
}

export function ChatApp() {
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}
    >
      <ChatAppStack.Screen name='Home' component={HomeScreen} />
    </ChatAppStack.Navigator>
  );
}

export function HomeStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='ChatApp' component={ChatApp} />
      <ModalStack.Screen name='AddRoomScreen' component={AddRoomScreen} />
      <ModalStack.Screen name='MessageList' component={MessageList} />
    </ModalStack.Navigator>
  );
}
