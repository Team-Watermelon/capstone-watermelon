import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MessageList from '../screens/MessageList';
import Profile from '../screens/Profile'
import Calendar from '../screens/Calendar'
import AddRoomScreen from '../screens/AddRoomScreen';
import Message from '../screens/Message';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MessagesStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="MessagesList"
      component={MessageList}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Message"
      component={Message}
      options={{
        headerTitle: 'Messages',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);


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
        component={MessagesStack}
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
      {/* <Tab.Screen
        name='Message'
        component={Message}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

function ChatApp() {
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
      <ChatAppStack.Screen name='Message' component={Message} />
    </ChatAppStack.Navigator>
  );
}

export function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name = 'Message'component={Message}/>
      </Stack.Navigator>
  );
}
