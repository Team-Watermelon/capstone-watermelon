import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, RNButton, Image } from "react-native";

import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const auth = Firebase.auth();

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View>
        <Image
          source={require("../assets/logo.png")}
          style={styles.smallLogo}
        />
        <IconButton
          style={styles.button}
          name="logout"
          size={100}
          onPress={handleSignOut}
        />
      </View>
      <Text style={styles.text}>Your UID is: {user.uid} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#AF8EC9",
    alignSelf: "center",
    paddingBottom: 24,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    top: 0,
    width: 300,
    height: 400,
    resizeMode: "contain",
    alignSelf: "center",
    padding: 0,
  },
  smallLogo: {
    position: "absolute",
    top: 0,
    left: 10,
    width: 100,
    height: 200,
    resizeMode: "contain",
    padding: 0,
  },
  button: {
    position: "absolute",
    top: 0,
    left: 10,
    color: '#000'
  },
  text:{
    top: 20,
    left: 10,
    padding:0
  },
});
