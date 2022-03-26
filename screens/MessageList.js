// add logic to click on list of messages

/*
things we need to do on this screen:
GET the list of rooms from firebase where the users id appears
Map across this list to display them
create an onpress function that leads to message room WITH roomid passed in */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AudioPlayer, RNActionButton } from "../components";
import Icon from "react-native-vector-icons/Ionicons";

import firebase from "firebase/app";
import "firebase/firestore";
import { collection, query, where, getDocs, docChanges } from "firebase/firestore";
import { roomsRef } from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  export default function MessageList() {
    const { user } = useContext(AuthenticatedUserContext);
    //const getRooms = () => {
      // const q = query(collection(roomsRef), where("usersInRoom", "array-contains", user.uid));
      // console.log(q)
      // const q = roomsRef.where("usersInRoom", "array-contains", user.uid).get()
      // console.log('this is q: ', q)
    //}
    //getRooms()

    const getRooms = async() => {
    const rooms = await firebase.firestore().collection('rooms').get()
    console.log(rooms.docs.map(room => room.data()))
    return rooms.docs.map(room => room.data())
  }
  getRooms()
    return (
      <View style={styles.container}>
        <Text>user is: {user.uid}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e93b81',
      paddingTop: 50,
      paddingHorizontal: 12,
    },
  });