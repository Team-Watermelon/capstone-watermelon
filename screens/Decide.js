
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Welcome from "./Welcome";
import HomeScreen from "./HomeScreen";
import { UserInfo } from "../styles/FeedStyle";
const auth = firebase.auth();

export default function Decide({ navigation }) {

  const { user } = useContext(AuthenticatedUserContext);
console.log('user in decide',user)
//   useEffect(() => {
//     fetchUsers();
//   }, []);

  return (
    <View style={styles.container}>
      {user.uid? (<Welcome/>): (<HomeScreen/>)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#AC9292",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#AC9292",
  },
  stories: {
    fontSize: 28,
    fontWeight: "normal",
    color: "#AC9292",
    padding: 10,
  },
});
