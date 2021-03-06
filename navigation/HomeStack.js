import React, { userEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MessageList from "../screens/MessageList";
import Profile from "../screens/Profile";
import AddRoomScreen from "../screens/AddRoomScreen";
import Message from "../screens/Message";
import Map from "../screens/Map";
import AudioRecord from "../screens/AudioRecord";
import EditProfileScreen from "../screens/EditProfileScreen";
import { LinearGradient } from "expo-linear-gradient";
// import Decide from "../screens/Decide"
 import Welcome from "../screens/Welcome";
// import AppIntro from "../screens/AppIntro";
// import CheckLoad from "../screens/CheckLoad";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MessagesStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="MessagesList"
      component={MessageList}
      options={{
        headerLeft: () => (
          <Image
            style={{ width: 80, height: 40, margin: 20 }}
            source={require("../assets/logo.png")}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Message"
      component={Message}
      options={({ route }) => ({
        title: route.params.receiver
            })
      
    }
      
        
    
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerLeft: () => (
          <Image
            style={{ width: 80, height: 40, margin: 20 }}
            source={require("../assets/logo.png")}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  console.log('navigation in profile stack===========',navigation.getState())
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <Image
              style={{ width: 80, height: 40, margin: 20 }}
              source={require("../assets/logo.png")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={({ route }) => ({
          title: "Jessica"
        })}
      />
      <Stack.Screen name="AudioRecord" component={AudioRecord} 
      options={{
        headerLeft: () => (
          <Image
            style={{ width: 80, height: 40, margin: 20 }}
            source={require("../assets/logo.png")}
          />
        ),

      }}/>
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={
          {
            headerLeft: () => (
              <Image
                style={{ width: 80, height: 40, margin: 20 }}
                source={require("../assets/logo.png")}
              />
            ),
          }
        }
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerLeft: () => (
            <Image
              style={{ width: 80, height: 40, margin: 20 }}
              source={require("../assets/logo.png")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}


const HomeStackScreen = ({ navigation }) => {
  return ( 
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <Image
            style={{ width: 80, height: 40, margin: 20 }}
            source={require("../assets/logo.png")}
          />
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={Profile}
      options={{
        headerLeft: () => (
          <Image
            style={{ width: 80, height: 40, margin: 20 }}
            source={require("../assets/logo.png")}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Message"
      component={Message}
      options={({ route }) => ({
        title: route.params.receiver
      })}
    />

  </Stack.Navigator>
  )
};

export default function HomeTabs() {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 1, y: 1.0 }}
      colors={["#E8A196", "#E8A196", "#AF8EC9"]}
      style={{ flex: 1 }}
    >
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{ backgroundColor: "transparent" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            headerLeft: () => (
              <Image
                style={{ width: 80, height: 40, margin: 20 }}
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesStack}
          options={{
            tabBarLabel: "Messages",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="message" color={color} size={26} />
            ),
            headerTitle: "Edit Profile",
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#fff",
              shadowColor: "#fff",
              elevation: 0,
            },
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map" color={color} size={26} />
            ),
            headerLeft: () => (
              <Image
                style={{ width: 80, height: 40, margin: 20 }}
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            headerLeft: () => (
              <Image
                style={{ width: 80, height: 40, margin: 20 }}
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </LinearGradient>
  );
}
